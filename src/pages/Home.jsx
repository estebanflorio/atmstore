import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { filterProducts } from '../hooks/filterProducts'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { SearchBar } from '../components/catalog/SearchBar'

export function Home() {
  const { products, loading } = useProducts()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => filterProducts(products, query), [products, query])

  return (
    <div>
      <div className="mb-8 max-w-xl">
        <h1 className="font-display text-3xl md:text-4xl leading-tight">
          Plantillas listas para <span className="text-lime">sublimar</span> y estampar
        </h1>
        <p className="text-paper/60 mt-3 text-sm">
          Descarga digital inmediata. Alta resolución. Pensadas para producción real.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <p className="text-paper/40 text-sm">Cargando catálogo…</p>
      ) : query && filtered.length === 0 ? (
        <p className="text-paper/50 text-sm py-16 text-center">
          Nada coincide con "{query}" — probá con otra palabra.
        </p>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  )
}
