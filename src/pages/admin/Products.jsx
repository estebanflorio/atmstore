import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Button } from '../../components/ui/Button'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const snap = await getDocs(collection(db, 'products'))
    setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(product) {
    const ok = confirm(
      `¿Eliminar "${product.name}"? Esto lo saca del catálogo — no borra los archivos de Storage, esos se borran aparte si hace falta.`
    )
    if (!ok) return
    await deleteDoc(doc(db, 'products', product.id))
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl">Productos</h1>
        <Link to="/admin/productos/nuevo">
          <Button>+ Nuevo producto</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-paper/40 text-sm">Cargando…</p>
      ) : products.length === 0 ? (
        <p className="text-paper/50 text-sm py-12 text-center">No hay productos cargados todavía.</p>
      ) : (
        <div className="divide-y divide-line border-t border-b border-line">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-3">
              <div className="w-14 h-14 bg-surface shrink-0 overflow-hidden">
                {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{p.name}</p>
                <p className="text-paper/50 text-xs">{p.category}</p>
              </div>
              <span className="text-lime text-sm shrink-0">{formatPrice(p.price)}</span>
              <Link to={`/admin/productos/${p.id}/editar`} className="text-paper/60 text-xs hover:text-lime underline shrink-0">
                Editar
              </Link>
              <button onClick={() => handleDelete(p)} className="text-paper/60 text-xs hover:text-lime underline shrink-0">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
