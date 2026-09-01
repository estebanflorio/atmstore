// Slides del carrusel hero. Cada uno enlaza a una categoría o producto
// destacado — cuando el catálogo sea real, `href` puede apuntar a
// `/producto/<id>` o a una futura vista filtrada por categoría.
export const heroSlides = [
  {
    id: 'novedades',
    eyebrow: 'Recién llegadas',
    title: 'Las plantillas más nuevas del catálogo',
    subtitle: 'Diseños agregados esta semana, listos para descargar.',
    cta: 'Ver novedades',
    href: '/',
    image: '/mock/hero-01.jpg'
  },
  {
    id: 'packs',
    eyebrow: 'Packs por categoría',
    title: 'Todo tu rubro en un solo pack',
    subtitle: 'Sets temáticos pensados para no comprar de a una.',
    cta: 'Ver packs',
    href: '/',
    image: '/mock/hero-02.jpg'
  },
  {
    id: 'kits',
    eyebrow: 'Fechas especiales',
    title: 'Kits para cumpleaños y celebraciones',
    subtitle: 'Todo lo que necesitás para una fecha puntual, en un solo lugar.',
    cta: 'Ver kits',
    href: '/',
    image: '/mock/hero-03.jpg'
  }
]
