import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { ThankYou } from './pages/ThankYou'
import { Login } from './pages/Login'
import { MisCompras } from './pages/MisCompras'
import { RequireAdmin } from './components/admin/RequireAdmin'
import { AdminLayout } from './pages/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import { Products } from './pages/admin/Products'
import { ProductForm } from './pages/admin/ProductForm'

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

        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="productos/nuevo" element={<ProductForm />} />
          <Route path="productos/:id/editar" element={<ProductForm />} />
        </Route>
      </Routes>
    </Layout>
  )
}
