import { useApp } from '@/context/AppContext'
import { LayoutDashboard, Package, ShoppingCart, LogOut, IceCream, Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { Screen } from '@/context/AppContext'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', screen: 'admin' as Screen, icon: LayoutDashboard },
  { id: 'products', label: 'Products', screen: 'admin-products' as Screen, icon: Package },
  { id: 'orders', label: 'Orders', screen: 'admin-orders' as Screen, icon: ShoppingCart },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { state, navigate, dispatch } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeTab = state.adminTab
  const handleTab = (tab: typeof tabs[0]) => { dispatch({ type: 'SET_ADMIN_TAB', tab: tab.id }); navigate(tab.screen); setMobileOpen(false) }

  return (
    <div className="min-h-screen bg-ds-cream flex">
      <aside className="hidden lg:flex flex-col w-64 bg-ds-chocolate border-r border-white/5 fixed h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ds-rose flex items-center justify-center"><IceCream size={20} className="text-white" /></div>
          <div><h2 className="font-display text-lg font-bold text-white">Dolce Scoop</h2><p className="text-white/40 text-xs">Admin Panel</p></div>
        </div>
        <nav className="flex-1 px-4 pt-4 space-y-1">
          {tabs.map((tab) => { const active = activeTab === tab.id; const Icon = tab.icon; return (
            <button key={tab.id} onClick={() => handleTab(tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${active ? 'bg-ds-rose text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}><Icon size={20} /><span className="font-medium text-sm">{tab.label}</span></button>
          )})}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => navigate('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-left"><LogOut size={20} /><span className="font-medium text-sm">Exit Admin</span></button>
        </div>
      </aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-ds-chocolate border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-ds-rose flex items-center justify-center"><IceCream size={16} className="text-white" /></div><span className="font-display font-bold text-white">Dolce Scoop Admin</span></div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">{mobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}</button>
        </div>
        {mobileOpen && <div className="bg-ds-chocolate border-t border-white/5 px-4 pb-4 space-y-1">
          {tabs.map((tab) => { const active = activeTab === tab.id; const Icon = tab.icon; return <button key={tab.id} onClick={() => handleTab(tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${active ? 'bg-ds-rose text-white' : 'text-white/60'}`}><Icon size={20} /><span className="font-medium text-sm">{tab.label}</span></button> })}
          <button onClick={() => navigate('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 text-left"><LogOut size={20} /><span className="font-medium text-sm">Exit Admin</span></button>
        </div>}
      </div>
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0"><div className="p-4 lg:p-8 max-w-6xl">{children}</div></main>
    </div>
  )
}