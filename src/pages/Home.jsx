import { useProducts } from '../hooks/useProducts'
import { ProductGrid } from '../components/catalog/ProductGrid'

export function Home() {
  const { products, loading } = useProducts()

  return (
    <div>
      <div className="mb-10 max-w-xl">
        <h1 className="font-display text-3xl md:text-4xl leading-tight">
          Plantillas listas para <span className="text-lime">sublimar</span> y estampar
        </h1>
        <p className="text-paper/60 mt-3 text-sm">
          Descarga digital inmediata. Alta resolución. Pensadas para producción real.
        </p>
      </div>

      {loading ? (
        <p className="text-paper/40 text-sm">Cargando catálogo…</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}
