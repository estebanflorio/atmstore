import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '../cart/CartDrawer'
import { FloatingWhatsApp } from './FloatingWhatsApp'

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-10">{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  )
}
