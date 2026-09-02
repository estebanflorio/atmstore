import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [productsSnap, ordersSnap] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'orders'))
        ])

        const products = productsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
        const orders = ordersSnap.docs.map((d) => d.data())
        const paidOrders = orders.filter((o) => o.status === 'paid')
        const revenue = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0)

        const byProduct = {}
        for (const order of paidOrders) {
          for (const item of order.items || []) {
            if (!byProduct[item.id]) byProduct[item.id] = { name: item.name, sales: 0, revenue: 0 }
            byProduct[item.id].sales += 1
            byProduct[item.id].revenue += item.price
          }
        }

        setStats({
          totalProducts: products.length,
          totalOrders: paidOrders.length,
          revenue,
          byProduct: Object.values(byProduct).sort((a, b) => b.revenue - a.revenue)
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-paper/40 text-sm">Cargando métricas…</p>
  if (error) return <p className="text-paper/50 text-sm">No se pudieron cargar las métricas: {error}</p>

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-line p-4">
          <p className="text-paper/50 text-xs mb-1">Productos</p>
          <p className="font-display text-2xl">{stats.totalProducts}</p>
        </div>
        <div className="border border-line p-4">
          <p className="text-paper/50 text-xs mb-1">Pedidos pagados</p>
          <p className="font-display text-2xl">{stats.totalOrders}</p>
        </div>
        <div className="border border-line p-4">
          <p className="text-paper/50 text-xs mb-1">Ingresos totales</p>
          <p className="font-display text-2xl text-lime">{formatPrice(stats.revenue)}</p>
        </div>
      </div>

      <h2 className="font-display text-lg mb-4">Ventas por producto</h2>
      {stats.byProduct.length === 0 ? (
        <p className="text-paper/50 text-sm py-8">
          Todavía no hay ventas registradas — esto se llena solo una vez que Mercado Pago esté conectado.
        </p>
      ) : (
        <div className="divide-y divide-line border-t border-b border-line">
          {stats.byProduct.map((p) => (
            <div key={p.name} className="flex justify-between py-3 text-sm">
              <span>{p.name}</span>
              <span className="text-paper/60">{p.sales} vendidos</span>
              <span className="text-lime">{formatPrice(p.revenue)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
