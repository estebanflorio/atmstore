// Datos de ejemplo para desarrollar la UI sin depender de Firestore todavía.
// Cuando conectemos el catálogo real, useProducts.js reemplaza esto por una
// query a la colección `products`. `images[0]` es la que se usa como
// miniatura en el catálogo y en el carrito.
export const mockProducts = [
  {
    id: 'demo-01',
    name: 'Pack Frases Mates — 12 diseños',
    price: 3500,
    category: 'frases',
    tags: ['mate', 'texto', 'pack'],
    images: ['/mock/preview-01.jpg', '/mock/preview-01b.jpg', '/mock/preview-01c.jpg'],
    specs: ['12 diseños', 'Formato PNG', 'Tamaño 6,5cm x 20cm', 'Vienen sin texto — incluye la fuente'],
    description: 'Set de 12 plantillas de frases para sublimar en tazas y mates, pensadas para producción real: alta resolución, fondo transparente y fuente incluida para que puedas personalizar el texto de cada diseño. Incluye las imágenes de muestra para promocionar en tus redes.'
  },
  {
    id: 'demo-02',
    name: 'Patrón Floral Boho',
    price: 1800,
    category: 'patrones',
    tags: ['floral', 'remera', 'boho'],
    images: ['/mock/preview-02.jpg', '/mock/preview-02b.jpg', '/mock/preview-02c.jpg'],
    specs: ['Patrón continuo (seamless)', 'Formato PNG', 'Versión clara y oscura', 'Tamaño A4 escalable'],
    description: 'Patrón floral continuo estilo boho, ideal para remeras, almohadones y textil en general. Pensado para repetirse sin costuras visibles a cualquier tamaño. Incluye versión clara y oscura en el mismo pack.'
  },
  {
    id: 'demo-03',
    name: 'Kit Cumpleaños Infantil',
    price: 2900,
    category: 'kits',
    tags: ['cumple', 'infantil', 'kit'],
    images: ['/mock/preview-03.jpg', '/mock/preview-03b.jpg', '/mock/preview-03c.jpg'],
    specs: ['8 archivos editables', 'Formato PNG', 'Incluye tazas, cuadernos y llaveros', 'Fotos de muestra incluidas'],
    description: 'Kit completo para remeras y accesorios de cumpleaños temático: 8 archivos editables que cubren taza, cuaderno, llavero y cajita. Incluye las fotos de muestra listas para mostrar en redes.'
  }
]
