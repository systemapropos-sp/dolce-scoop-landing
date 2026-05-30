import { useApp } from '@/context/AppContext'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import type { MenuItem } from '@/context/AppContext'
interface Props { item: MenuItem; index: number }
export default function MenuCard({ item, index }: Props) {
  const { dispatch } = useApp()
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Bestseller': return 'bg-ds-rose text-white'
      case 'Popular': return 'bg-ds-caramel text-white'
      case 'Signature': return 'bg-ds-chocolate text-white'
      case 'New': return 'bg-ds-mint text-ds-chocolate'
      case 'Vegan': return 'bg-green-500 text-white'
      case 'Chef Favorite': return 'bg-ds-lavender text-white'
      default: return 'bg-ds-rose-light text-ds-rose'
    }
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.4 }} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-ds-caramel/10 active:scale-[0.97] transition-transform" onClick={() => dispatch({ type: 'SELECT_ITEM', item })}>
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        {item.badge && <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(item.badge)}`}>{item.badge}</span>}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-ds-chocolate font-display font-semibold text-sm leading-tight">{item.name}</h3>
        <p className="text-ds-caramel text-xs mt-1 line-clamp-1">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div><span className="text-ds-rose font-display font-bold text-lg">${item.price.toFixed(2)}</span><span className="text-ds-caramel text-xs ml-2">{item.calories} cal</span></div>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'ADD_TO_CART', item: { id: `${item.id}-${Date.now()}`, menuItem: item, quantity: 1, selectedModifiers: {}, totalPrice: item.price } }) }} className="w-9 h-9 rounded-full bg-ds-rose flex items-center justify-center active:scale-75 transition-transform shadow-lg shadow-ds-rose/30">
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}