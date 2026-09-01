import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function MisCompras() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoadingOrders(false)
      return
    }
    const q = query(
      collection(db, 'orders'),
      where('email', '==', user.email),
      orderBy('createdAt', 'desc')
      // Nota: esta combinación (where + orderBy en campos distintos) pide un
      // índice compuesto en Firestore. La primera vez que corra en serio,
      // la consola del navegador va a tirar un error con un link directo
      // para crear ese índice con un click — no hay que armarlo a mano.
    )
    getDocs(q)
      .then((snap) => setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => setOrders([])) // ver nota abajo sobre el índice compuesto
      .finally(() => setLoadingOrders(false))
  }, [user])

  if (authLoading) return null

  if (!user) {
    return (
      <div className="max-w-sm mx-auto text-center py-12">
        <h1 className="font-display text-2xl mb-3">Mis compras</h1>
        <p className="text-paper/60 text-sm mb-6">
          Iniciá sesión para ver el historial de tus plantillas compradas.
        </p>
        <Link to="/login">
          <Button>Ingresar</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl">Mis compras</h1>
          <p className="text-paper/50 text-sm mt-1">{user.email}</p>
        </div>
        <button onClick={signOut} className="text-paper/50 text-xs hover:text-lime underline">
          Cerrar sesión
        </button>
      </div>

      {loadingOrders ? (
        <p className="text-paper/40 text-sm">Cargando…</p>
      ) : orders.length === 0 ? (
        <p className="text-paper/50 text-sm py-12 text-center">
          Todavía no hay compras asociadas a este email.
        </p>
      ) : (
        <div className="divide-y divide-line border-t border-b border-line">
          {orders.map((order) => (
            <div key={order.id} className="py-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-paper/50">{order.id}</span>
                <span className="text-lime">{formatPrice(order.total)}</span>
              </div>
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span>{item.name}</span>
                  {item.downloadUrl ? (
                    <a href={item.downloadUrl} className="text-lime hover:underline">Descargar</a>
                  ) : (
                    <span className="text-paper/30">Procesando…</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
