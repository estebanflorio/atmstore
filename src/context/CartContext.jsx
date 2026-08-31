import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'tienda-plantillas.cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product) {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev // plantilla digital: no tiene sentido "cantidad" > 1
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.images?.[0] }]
    })
    setIsOpen(true)
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items])

  const value = { items, addItem, removeItem, clearCart, total, isOpen, setIsOpen }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
