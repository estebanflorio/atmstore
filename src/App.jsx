import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { ThankYou } from './pages/ThankYou'
import { Login } from './pages/Login'
import { MisCompras } from './pages/MisCompras'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-compras" element={<MisCompras />} />
      </Routes>
    </Layout>
  )
}
