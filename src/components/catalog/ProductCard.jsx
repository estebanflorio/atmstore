import { Link } from 'react-router-dom'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function ProductCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="reg-mark aspect-square bg-surface overflow-hidden mb-3">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <h3 className="font-display text-sm leading-snug">{product.name}</h3>
      <p className="text-lime text-sm mt-1">{formatPrice(product.price)}</p>
    </Link>
  )
}
