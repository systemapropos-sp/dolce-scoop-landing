import { useState, useCallback } from 'react'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, Minus, Plus, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ItemDetail() {
  const { state, goBack, dispatch } = useApp()
  const item = state.selectedItem
  const [qty, setQty] = useState(1)
  const [modifiers, setModifiers] = useState<Record<string, string>>({})
  const [expanded, setExpanded] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const selectMod = useCallback((modId: string, optId: string) => { setModifiers((p) => ({ ...p, [modId]: optId })) }, [])
  const total = useCallback(() => { if (!item) return 0; let t = item.price * qty; item.modifiers?.forEach((m) => { const sel = modifiers[m.id]; if (sel) { const opt = m.options.find((o) => o.id === sel); if (opt) t += opt.price * qty } }); return t }, [item, qty, modifiers])
  const handleAdd = useCallback(() => { if (!item) return; setAdded(true); dispatch({ type: 'ADD_TO_CART', item: { id: `${item.id}-${Date.now()}`, menuItem: item, quantity: qty, selectedModifiers: modifiers, totalPrice: total() } }); setTimeout(() => { setAdded(false); goBack() }, 600) }, [item, qty, modifiers, total, dispatch, goBack])
  if (!item) return null
  const badgeColor = (b?: string) => { if (b === 'Bestseller') return 'bg-ds-rose'; if (b === 'New') return 'bg-ds-mint'; if (b === 'Popular') return 'bg-ds-caramel'; if (b === 'Signature') return 'bg-ds-chocolate'; if (b === 'Vegan') return 'bg-green-500'; return 'bg-ds-lavender' }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-ds-cream relative">
      <div className="relative h-[45vh] min-h-[300px]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ds-chocolate/70 via-transparent to-transparent" />
        <button onClick={goBack} className="absolute top-12 left-5 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform z-10"><ArrowLeft size={20} className="text-white" /></button>
        {item.badge && <span className={`absolute top-12 right-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${badgeColor(item.badge)}`}>{item.badge}</span>}
      </div>
      <div className="relative -mt-6 bg-ds-cream rounded-t-3xl px-5 pt-6 pb-36">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl font-bold text-ds-chocolate leading-tight">{item.name}</h1>
            <span className="text-ds-rose font-display font-bold text-2xl shrink-0">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-ds-caramel text-sm mt-1">{item.calories} calories</p>
        </motion.div>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="text-ds-chocolate/70 text-sm mt-4 leading-relaxed">{item.description}</motion.p>
        {item.modifiers && item.modifiers.length > 0 && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 space-y-3">
            <h3 className="font-display font-semibold text-ds-chocolate text-sm uppercase tracking-wider">Customize</h3>
            {item.modifiers.map((mod) => (
              <div key={mod.id} className="bg-white rounded-2xl overflow-hidden border border-ds-caramel/10 shadow-sm">
                <button onClick={() => setExpanded(expanded === mod.id ? null : mod.id)} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                  <div className="flex items-center gap-2"><span className="text-ds-chocolate font-medium text-sm">{mod.name}</span>{mod.required && <span className="text-ds-rose text-[10px] font-bold">REQUIRED</span>}</div>
                  <ChevronDown size={18} className={`text-ds-caramel transition-transform ${expanded === mod.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expanded === mod.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-3 space-y-1">
                        {mod.options.map((opt) => { const sel = modifiers[mod.id] === opt.id; return (
                          <button key={opt.id} onClick={() => selectMod(mod.id, opt.id)} className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left transition-all ${sel ? 'bg-ds-rose/10 border border-ds-rose/30' : 'hover:bg-ds-cream'}`}>
                            <div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${sel ? 'bg-ds-rose border-ds-rose' : 'border-ds-caramel/40'}`}>{sel && <Check size={12} className="text-white" />}</div><span className={`text-sm ${sel ? 'text-ds-chocolate font-medium' : 'text-ds-chocolate/70'}`}>{opt.name}</span></div>
                            {opt.price > 0 && <span className="text-ds-rose text-sm font-medium">+${opt.price.toFixed(2)}</span>}
                          </button>
                        )})}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} className="mt-6">
          <h3 className="font-display font-semibold text-ds-chocolate text-sm uppercase tracking-wider mb-3">Quantity</h3>
          <div className="flex items-center gap-4 bg-white rounded-2xl w-fit px-4 py-3 border border-ds-caramel/10 shadow-sm">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full bg-ds-cream flex items-center justify-center active:scale-75 transition-transform"><Minus size={16} className="text-ds-chocolate" /></button>
            <span className="text-ds-chocolate font-display font-bold text-lg w-6 text-center">{qty}</span>
            <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-8 h-8 rounded-full bg-ds-rose flex items-center justify-center active:scale-75 transition-transform"><Plus size={16} className="text-white" /></button>
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ds-caramel/10 p-4 z-50">
        <button onClick={handleAdd} disabled={added} className={`w-full h-14 rounded-full font-display font-semibold text-base transition-all active:scale-[0.97] flex items-center justify-center gap-2 ${added ? 'bg-green-500 text-white' : 'bg-ds-rose text-white shadow-lg shadow-ds-rose/30'}`}>{added ? <><Check size={20} /> Added!</> : `Add to Order - $${total().toFixed(2)}`}</button>
      </div>
    </motion.div>
  )
}