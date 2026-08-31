import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar plantillas — mate, cumpleaños, floral…"
        className="w-full pl-10 pr-9 py-2.5 border border-line bg-surface text-paper text-sm
          placeholder:text-violet focus:outline-none focus:border-lime transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-violet hover:text-lime"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
