import { NavLink, Outlet } from 'react-router-dom'

const tabClass = ({ isActive }) =>
  `pb-3 border-b-2 transition-colors ${
    isActive ? 'border-lime text-paper' : 'border-transparent text-paper/50 hover:text-paper'
  }`

export function AdminLayout() {
  return (
    <div>
      <div className="flex gap-6 border-b border-line mb-8 text-sm">
        <NavLink to="/admin" end className={tabClass}>Dashboard</NavLink>
        <NavLink to="/admin/productos" className={tabClass}>Productos</NavLink>
      </div>
      <Outlet />
    </div>
  )
}
