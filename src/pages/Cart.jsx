import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CartItem } from '../components/cart/CartItem'
import { Button } from '../components/ui/Button'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function Cart() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-paper/60 mb-4">Tu carrito está vacío.</p>
        <Link to="/" className="text-lime text-sm underline">Ver catálogo</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-display text-2xl mb-6">Tu carrito</h1>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="flex justify-between py-4 text-sm">
        <span className="text-paper/60">Total</span>
        <span className="text-lime">{formatPrice(total)}</span>
      </div>
      <Link to="/checkout">
        <Button className="w-full">Ir a pagar</Button>
      </Link>
    </div>
  )
}
