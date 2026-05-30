import { useApp } from './context/AppContext'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import TVMenu from './pages/TVMenu'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'

export default function AppRouter() {
  const { state } = useApp()
  if (state.screen === 'admin' || state.screen === 'admin-products' || state.screen === 'admin-orders') {
    return (
      <AdminLayout>
        {state.screen === 'admin' && <AdminDashboard />}
        {state.screen === 'admin-products' && <AdminProducts />}
        {state.screen === 'admin-orders' && <AdminOrders />}
      </AdminLayout>
    )
  }
  switch (state.screen) {
    case 'home': return <Home />
    case 'item-detail': return <ItemDetail />
    case 'cart': return <Cart />
    case 'checkout': return <Checkout />
    case 'order-tracking': return <OrderTracking />
    case 'tv-menu': return <TVMenu />
    default: return <Home />
  }
}