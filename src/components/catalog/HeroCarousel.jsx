import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_ADVANCE_MS = 6000

export function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [slides.length])

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }

  if (!slides?.length) return null

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-surface">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-lime/95 via-lime/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto w-full px-12 sm:px-14 md:px-12">
              <div className="max-w-xs sm:max-w-sm text-white">
                <p className="text-xs tracking-widest uppercase mb-2 opacity-80">{slide.eyebrow}</p>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight mb-2 md:mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm opacity-90 mb-4 md:mb-5 hidden sm:block">{slide.subtitle}</p>
                <Link
                  to={slide.href}
                  className="inline-block bg-white text-paper px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/85 hover:bg-white text-paper transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Slide siguiente"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/85 hover:bg-white text-paper transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index}
                className={`w-2 h-2 transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
