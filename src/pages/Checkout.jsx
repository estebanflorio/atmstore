import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

// TODO (integración Mercado Pago):
// 1. Crear una Firebase Function `createPreference` que reciba { items, email }.
//    Adentro: crear el doc en `orders` (status: "pending", email, items, total,
//    createdAt) ANTES de llamar a Mercado Pago, y usar ese orderId como
//    `external_reference` de la preferencia — así el webhook puede encontrarlo.
// 2. Acá abajo, reemplazar `simulatePayment` por un fetch a esa Function
//    y un `window.location.href = init_point` con la URL que devuelva.
// 3. Mercado Pago vuelve a /gracias?payment_id=... — ese id se verifica
//    server-side (webhook) antes de habilitar la descarga real.
async function simulatePayment(items, email) {
  await new Promise((r) => setTimeout(r, 800))
  return { ok: true, orderId: `demo-${Date.now()}` }
}

export function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handlePay() {
    setLoading(true)
    const result = await simulatePayment(items, email)
    setLoading(false)
    if (result.ok) {
      clearCart()
      navigate(`/gracias?order=${result.orderId}`)
    }
  }

  if (items.length === 0) {
    return <p className="text-paper/60 text-center py-16">No hay nada para pagar todavía.</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-2xl mb-6">Confirmar compra</h1>

      <div className="border border-line divide-y divide-line mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between px-4 py-3 text-sm">
            <span>{item.name}</span>
            <span className="text-lime">{formatPrice(item.price)}</span>
          </div>
        ))}
        <div className="flex justify-between px-4 py-3 text-sm font-medium">
          <span>Total</span>
          <span className="text-lime">{formatPrice(total)}</span>
        </div>
      </div>

      <label className="block text-sm text-paper/70 mb-1.5">
        Email (a donde llega la descarga)
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="w-full px-3 py-2.5 border border-line bg-surface text-paper text-sm placeholder:text-violet focus:outline-none focus:border-lime mb-6"
      />

      <Button className="w-full" onClick={handlePay} disabled={loading || !email}>
        {loading ? 'Redirigiendo a Mercado Pago…' : 'Pagar con Mercado Pago'}
      </Button>
      <p className="text-paper/40 text-xs mt-3 text-center">
        Placeholder de desarrollo — todavía no está conectado a Mercado Pago (ver functions/index.js).
      </p>
    </div>
  )
}
