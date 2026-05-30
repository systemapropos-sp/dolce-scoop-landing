import { useApp } from '@/context/AppContext'
import { menuItems } from '@/data/menu'
import { DollarSign, ShoppingBag, TrendingUp, Package, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { state } = useApp()
  const orders = state.orders
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const totalOrders = orders.length
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, change: '+15.3%', up: true, icon: DollarSign, color: 'bg-ds-rose/10 text-ds-rose' },
    { label: 'Total Orders', value: totalOrders.toString(), change: '+10.1%', up: true, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Avg Order', value: `$${avgOrder.toFixed(2)}`, change: '+4.7%', up: true, icon: TrendingUp, color: 'bg-ds-caramel/10 text-ds-caramel' },
    { label: 'Products', value: menuItems.length.toString(), change: '+3', up: true, icon: Package, color: 'bg-ds-mint/20 text-teal-600' },
  ]

  const topProducts = [
    { name: 'Strawberry Fields', sales: 198, revenue: 1087.02 },
    { name: 'Salted Caramel Sundae', sales: 156, revenue: 1558.44 },
    { name: 'Sicilian Pistachio Gelato', sales: 134, revenue: 837.50 },
    { name: 'Cookies & Cream Dream', sales: 122, revenue: 669.78 },
    { name: 'Belgian Waffle & Scoop', sales: 98, revenue: 1077.02 },
  ]

  const getStatusColor = (s: string) => { if (s === 'completed') return 'bg-green-100 text-green-700'; if (s === 'ready') return 'bg-blue-100 text-blue-700'; if (s === 'preparing') return 'bg-yellow-100 text-yellow-700'; return 'bg-red-100 text-red-700' }
  const getStatusLabel = (s: string) => { if (s === 'completed') return 'Completed'; if (s === 'ready') return 'Ready'; if (s === 'preparing') return 'Preparing'; return 'Cancelled' }

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-ds-chocolate">Dashboard</h1><p className="text-ds-caramel text-sm mt-1">Overview of your Dolce Scoop business</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => { const Icon = s.icon; return (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-ds-caramel/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}><Icon size={20} /></div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>{s.up ? <ArrowUpRight size={14} /> : null}{s.change}</span>
            </div>
            <p className="font-display text-2xl font-bold text-ds-chocolate mt-3">{s.value}</p>
            <p className="text-ds-caramel text-xs mt-1">{s.label}</p>
          </motion.div>
        )})}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-5 border border-ds-caramel/10 shadow-sm">
          <h2 className="font-display text-lg font-bold text-ds-chocolate mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-ds-caramel/10 last:border-0">
                <div><p className="text-ds-chocolate text-sm font-medium">{o.id}</p><p className="text-ds-caramel text-xs">{new Date(o.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div>
                <div className="flex items-center gap-3"><span className="text-ds-chocolate font-medium text-sm">${o.total.toFixed(2)}</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(o.status)}`}>{getStatusLabel(o.status)}</span></div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-5 border border-ds-caramel/10 shadow-sm">
          <h2 className="font-display text-lg font-bold text-ds-chocolate mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-2 border-b border-ds-caramel/10 last:border-0">
                <span className="w-6 h-6 rounded-full bg-ds-rose/10 text-ds-rose flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <div className="flex-1"><p className="text-ds-chocolate text-sm font-medium">{p.name}</p><p className="text-ds-caramel text-xs">{p.sales} sold</p></div>
                <span className="text-ds-rose font-medium text-sm">${p.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}