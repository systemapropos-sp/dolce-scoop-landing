import { useApp } from '@/context/AppContext'
import { Home, Heart, ShoppingBag, User, Settings } from 'lucide-react'
const navItems = [
  { icon: Home, label: 'Home', screen: 'home' as const },
  { icon: Heart, label: 'Faves', screen: 'home' as const },
  { icon: ShoppingBag, label: 'Order', screen: 'cart' as const, badge: true },
  { icon: User, label: 'Profile', screen: 'home' as const },
]
export default function BottomNav() {
  const { state, navigate, cartCount } = useApp()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-ds-caramel/20 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = state.screen === item.screen && item.label === 'Home'
          const Icon = item.icon
          return (
            <button key={item.label} onClick={() => item.label === 'Order' ? navigate('cart') : navigate(item.screen)} className="flex flex-col items-center justify-center gap-1 w-16 h-14 relative active:scale-90 transition-transform">
              <div className="relative">
                <Icon size={22} className={isActive ? 'text-ds-rose' : 'text-ds-caramel'} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.badge && cartCount > 0 && <span className="absolute -top-2 -right-3 bg-ds-rose text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{cartCount}</span>}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-ds-rose' : 'text-ds-caramel'}`}>{item.label}</span>
            </button>
          )
        })}
        <button onClick={() => navigate('admin')} className="flex flex-col items-center justify-center gap-1 w-16 h-14 relative active:scale-90 transition-transform">
          <Settings size={22} className="text-ds-caramel" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-ds-caramel">Admin</span>
        </button>
      </div>
    </nav>
  )
}