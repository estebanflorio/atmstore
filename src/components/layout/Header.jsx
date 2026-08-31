import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export function Header() {
  const { items, setIsOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-lime">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg tracking-tight text-white">
          Plantillas.
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link to="/" className="hover:text-white transition-colors">Catálogo</Link>
          <a href="#faq" className="hover:text-white transition-colors">Licencias</a>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white border border-white/50 hover:border-white hover:bg-white/10 transition-colors"
          aria-label="Abrir carrito"
        >
          <ShoppingBag size={16} />
          Carrito ({items.length})
        </button>
      </div>
    </header>
  )
}
