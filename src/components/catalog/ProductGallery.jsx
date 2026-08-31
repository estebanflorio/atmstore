import { useState } from 'react'

export function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)

  if (!images?.length) {
    return <div className="reg-mark aspect-square bg-surface" />
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Miniaturas: fila horizontal en mobile (debajo), columna a la izquierda en desktop */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`Ver imagen ${i + 1} de ${name}`}
            aria-current={i === active}
            className={`w-16 h-16 shrink-0 overflow-hidden border transition-colors
              ${i === active ? 'border-lime' : 'border-line hover:border-paper/40'}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="reg-mark flex-1 aspect-square bg-surface overflow-hidden">
        <img src={images[active]} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
