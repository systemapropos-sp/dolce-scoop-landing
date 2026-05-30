import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ChefHat, Package, CheckCircle, Home, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  { id: 'preparing', label: 'Preparing', desc: 'Crafting your scoops with care', icon: ChefHat },
  { id: 'ready', label: 'Ready for Pickup', desc: 'Your order is ready at the counter', icon: Package },
  { id: 'completed', label: 'Enjoy!', desc: 'Savor every sweet moment', icon: CheckCircle },
]

export default function OrderTracking() {
  const { state, navigate } = useApp()
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => { const interval = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100 } return p + 1 }) }, 180); return () => clearInterval(interval) }, [])
  useEffect(() => { if (progress >= 40) setStep(1); if (progress >= 85) setStep(2) }, [progress])
  const isDone = step >= 2

  return (
    <div className="min-h-screen bg-ds-cream relative">
      <div className="px-5 pt-12 pb-6">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold text-ds-chocolate">{isDone ? 'Order Complete!' : 'Order Tracking'}</motion.h1>
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-ds-caramel text-sm mt-1">{isDone ? 'Thanks for choosing Dolce Scoop' : `Order #${state.orders[0]?.id || 'DS-1085'} • Est. 8-12 min`}</motion.p>
      </div>
      <div className="px-5">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 border border-ds-caramel/10 shadow-sm">
          <div className="relative h-2 bg-ds-cream rounded-full overflow-hidden mb-8">
            <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-ds-rose to-ds-caramel rounded-full" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => { const active = i <= step, current = i === step, Icon = s.icon; return (
              <motion.div key={s.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: active ? 1 : 0.4, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${current ? 'bg-ds-rose shadow-lg shadow-ds-rose/30' : active ? 'bg-ds-rose/20' : 'bg-ds-cream'}`}><Icon size={22} className={current || active ? 'text-white' : 'text-ds-caramel'} /></div>
                <div className="pt-1">
                  <h3 className={`font-display font-semibold text-base ${active ? 'text-ds-chocolate' : 'text-ds-caramel'}`}>{s.label}</h3>
                  <p className="text-ds-caramel text-xs mt-0.5">{s.desc}</p>
                  {current && <div className="flex items-center gap-1.5 mt-2"><Clock size={12} className="text-ds-caramel animate-pulse" /><span className="text-ds-caramel text-xs font-medium">{i === 0 ? 'Scooping & prepping...' : i === 1 ? 'Ready now!' : 'All done!'}</span></div>}
                </div>
              </motion.div>
            )})}
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ds-caramel/10 p-5 z-50">
        <button onClick={() => navigate('home')} className="w-full h-12 rounded-full bg-ds-cream text-ds-chocolate font-display font-semibold text-sm active:scale-[0.97] transition-transform flex items-center justify-center gap-2 border border-ds-caramel/20"><Home size={16} /> Back to Menu</button>
      </div>
    </div>
  )
}