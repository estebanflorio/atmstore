import { useCart } from '../../context/CartContext'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function CartItem({ item }) {
  const { removeItem } = useCart()
  return (
    <div className="flex gap-3 items-center py-3 border-b border-line">
      <div className="w-14 h-14 bg-surface shrink-0 overflow-hidden">
        <img src={item.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{item.name}</p>
        <p className="text-lime text-sm">{formatPrice(item.price)}</p>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-paper/40 hover:text-acid text-xs"
        aria-label={`Quitar ${item.name} del carrito`}
      >
        Quitar
      </button>
    </div>
  )
}
