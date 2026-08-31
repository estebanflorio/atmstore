import { ProductCard } from './ProductCard'

export function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="text-paper/50 text-sm py-16 text-center">
        Todavía no hay plantillas cargadas en esta categoría.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
