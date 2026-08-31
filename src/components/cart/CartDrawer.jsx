import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { CartItem } from './CartItem'
import { Button } from '../ui/Button'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function CartDrawer() {
  const { items, total, isOpen, setIsOpen } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 bg-paper/50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 border-l border-line
          flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <h2 className="font-display">Tu carrito</h2>
          <button onClick={() => setIsOpen(false)} className="text-paper/50 hover:text-lime" aria-label="Cerrar carrito">
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <p className="text-paper/50 text-sm py-10">Todavía no agregaste plantillas.</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-line space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-paper/60">Total</span>
              <span className="text-lime">{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Ir a pagar</Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
