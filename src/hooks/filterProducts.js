// Quita tildes/diacríticos para que la búsqueda no dependa de que el usuario
// escriba los acentos correctos ("sublimacion" debe encontrar "sublimación").
function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function filterProducts(products, query) {
  const q = normalize(query.trim())
  if (!q) return products

  return products.filter((p) => {
    const haystack = normalize(
      [p.name, p.category, ...(p.tags || [])].join(' ')
    )
    return haystack.includes(q)
  })
}
