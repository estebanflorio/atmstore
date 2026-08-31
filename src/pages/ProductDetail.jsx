import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { Button } from '../components/ui/Button'
import { ProductGallery } from '../components/catalog/ProductGallery'
import { ProductGrid } from '../components/catalog/ProductGrid'

const formatPrice = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

export function ProductDetail() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addItem, items } = useCart()

  if (loading) return <p className="text-paper/40 text-sm">Cargando…</p>

  const product = products.find((p) => p.id === id)
  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-paper/60">No encontramos esa plantilla.</p>
        <Link to="/" className="text-lime text-sm underline mt-2 inline-block">Volver al catálogo</Link>
      </div>
    )
  }

  const inCart = items.some((i) => i.id === product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <h1 className="font-display text-2xl mb-2">{product.name}</h1>
          <p className="text-lime text-xl mb-5">{formatPrice(product.price)}</p>

          {product.specs?.length > 0 && (
            <ul className="text-sm text-paper/70 space-y-1.5 mb-6">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-2">
                  <span className="text-lime">·</span>
                  {spec}
                </li>
              ))}
            </ul>
          )}

          <Button onClick={() => addItem(product)} disabled={inCart}>
            {inCart ? 'Ya está en el carrito' : 'Agregar al carrito'}
          </Button>
          <p className="text-paper/40 text-xs mt-4">
            Licencia de uso personal. Consultá por licencia comercial antes de comprar si vas a revender el producto sublimado.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <h2 className="font-display text-lg mb-3 pb-3 border-b border-line">Descripción</h2>
        <p className="text-paper/70 text-sm leading-relaxed">{product.description}</p>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-lg mb-6 pb-3 border-b border-line">También te puede interesar</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  )
}
