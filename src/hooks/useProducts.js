import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { mockProducts } from '../data/mockProducts'

// TODO: sacar el fallback a mockProducts cuando el catálogo real
// tenga al menos un producto cargado en Firestore.
export function useProducts() {
  const [products, setProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    getDocs(collection(db, 'products'))
      .then((snap) => {
        if (!active) return
        if (snap.empty) return // se queda con mockProducts
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return { products, loading, error }
}
