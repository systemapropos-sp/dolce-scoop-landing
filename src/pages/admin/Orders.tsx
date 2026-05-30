import { useApp } from '@/context/AppContext'
import { ShoppingCart, Clock, CheckCircle, Package, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminOrders() {
  const { state, dispatch } = useApp()
  const orders = state.orders

  const getStatusIcon = (s: string) => { if (s === 'completed') return <CheckCircle size={16} className="text-green-600" />; if (s === 'ready') return <Package size={16} className="text-blue-600" />; if (s === 'preparing') return <Clock size={16} className="text-yellow-600" />; return <XCircle size={16} className="text-red-500" /> }
  const getStatusClass = (s: string) => { if (s === 'completed') return 'bg-green-50 text-green-700 border-green-200'; if (s === 'ready') return 'bg-blue-50 text-blue-700 border-blue-200'; if (s === 'preparing') return 'bg-yellow-50 text-yellow-700 border-yellow-200'; return 'bg-red-50 text-red-700 border-red-200' }
  const getStatusLabel = (s: string) => { if (s === 'completed') return 'Completed'; if (s === 'ready') return 'Ready'; if (s === 'preparing') return 'Preparing'; return 'Cancelled' }

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Preparing', value: orders.filter((o) => o.status === 'preparing').length, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Ready', value: orders.filter((o) => o.status === 'ready').length, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Completed', value: orders.filter((o) => o.status === 'completed').length, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  ]

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-ds-chocolate">Orders</h1><p className="text-ds-caramel text-sm mt-1">Manage and track all customer orders</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => { const Icon = s.icon; return (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-ds-caramel/10 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}><Icon size={20} /></div>
            <p className="font-display text-2xl font-bold text-ds-chocolate mt-3">{s.value}</p>
            <p className="text-ds-caramel text-xs">{s.label}</p>
          </motion.div>
        )})}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-ds-caramel/10 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-ds-caramel/10"><h2 className="font-display text-lg font-bold text-ds-chocolate">All Orders</h2></div>
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ds-caramel/10">
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Order ID</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Time</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Total</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Payment</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-ds-caramel uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-ds-caramel/5 hover:bg-ds-cream/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-ds-chocolate">{o.id}</td>
                  <td className="px-5 py-4 text-sm text-ds-caramel">{new Date(o.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-5 py-4 text-sm font-medium text-ds-rose">${o.total.toFixed(2)}</td>
                  <td className="px-5 py-4 text-sm text-ds-chocolate/70 capitalize">{o.paymentMethod}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(o.status)}`}>{getStatusIcon(o.status)} {getStatusLabel(o.status)}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {o.status === 'preparing' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'ready' })} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">Mark Ready</button>}
                      {o.status === 'ready' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'completed' })} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">Complete</button>}
                      {o.status !== 'cancelled' && o.status !== 'completed' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'cancelled' })} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">Cancel</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden divide-y divide-ds-caramel/10">
          {orders.map((o) => (
            <div key={o.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-ds-chocolate">{o.id}</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(o.status)}`}>{getStatusIcon(o.status)} {getStatusLabel(o.status)}</span>
              </div>
              <div className="flex items-center justify-between text-sm"><span className="text-ds-caramel">{new Date(o.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span><span className="text-ds-rose font-medium">${o.total.toFixed(2)}</span></div>
              <div className="flex items-center gap-2">
                {o.status === 'preparing' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'ready' })} className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">Mark Ready</button>}
                {o.status === 'ready' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'completed' })} className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium">Complete</button>}
                {o.status !== 'cancelled' && o.status !== 'completed' && <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId: o.id, status: 'cancelled' })} className="flex-1 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium">Cancel</button>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}