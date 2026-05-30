import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ArrowLeft, MapPin, Clock, CheckCircle, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Checkout() {
  const { goBack, state, cartTotal, dispatch } = useApp()
  const [payment, setPayment] = useState<'card' | 'apple' | 'google'>('card')
  const [placing, setPlacing] = useState(false)
  const tax = cartTotal * 0.0875
  const total = cartTotal + tax

  const handlePlace = () => {
    setPlacing(true)
    const order = { id: `DS-${Math.floor(1000 + Math.random() * 200)}`, items: [...state.cart], total, tax, status: 'preparing' as const, timestamp: Date.now(), customerName: 'Walk-in Customer', paymentMethod: payment }
    setTimeout(() => { dispatch({ type: 'PLACE_ORDER', order }) }, 1200)
  }

  if (placing) return (
    <div className="min-h-screen bg-ds-cream flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}><div className="w-24 h-24 rounded-full bg-ds-rose/20 flex items-center justify-center mb-6 mx-auto"><CheckCircle size={48} className="text-ds-rose" /></div></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display text-3xl font-bold text-ds-chocolate mb-2">Order Placed!</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-ds-caramel text-sm">Preparing your scoops...</motion.p>
    </div>
  )

  return (
    <div className="min-h-screen bg-ds-cream relative pb-36">
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-ds-caramel/10">
        <div className="flex items-center gap-3 px-5 h-14"><button onClick={goBack} className="w-10 h-10 rounded-full bg-ds-cream flex items-center justify-center active:scale-90 transition-transform"><ArrowLeft size={20} className="text-ds-chocolate" /></button><h1 className="font-display text-xl font-bold text-ds-chocolate">Checkout</h1></div>
      </div>
      <div className="px-5 pt-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 border border-ds-caramel/10 shadow-sm">
          <h3 className="text-ds-chocolate font-display font-semibold text-sm mb-3">Pickup Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-ds-rose/10 flex items-center justify-center"><MapPin size={16} className="text-ds-rose" /></div><div><p className="text-ds-chocolate text-sm font-medium">Dolce Scoop - Main St</p><p className="text-ds-caramel text-xs">123 Sweet Lane, Suite 100</p></div></div>
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-ds-caramel/10 flex items-center justify-center"><Clock size={16} className="text-ds-caramel" /></div><div><p className="text-ds-chocolate text-sm font-medium">Estimated: 8-12 min</p><p className="text-ds-caramel text-xs">Preparation time</p></div></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-4 border border-ds-caramel/10 shadow-sm">
          <h3 className="text-ds-chocolate font-display font-semibold text-sm mb-3">Order Summary</h3>
          <div className="space-y-2">
            {state.cart.map((item) => <div key={item.id} className="flex items-center justify-between text-sm"><span className="text-ds-chocolate/80">{item.quantity}x {item.menuItem.name}</span><span className="text-ds-chocolate">${item.totalPrice.toFixed(2)}</span></div>)}
            <div className="border-t border-ds-caramel/20 pt-2 space-y-1">
              <div className="flex items-center justify-between text-sm"><span className="text-ds-caramel">Subtotal</span><span className="text-ds-chocolate">${cartTotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-ds-caramel">Tax</span><span className="text-ds-chocolate">${tax.toFixed(2)}</span></div>
              <div className="flex items-center justify-between pt-1"><span className="text-ds-chocolate font-display font-semibold">Total</span><span className="text-ds-rose font-display font-bold">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-4 border border-ds-caramel/10 shadow-sm">
          <h3 className="text-ds-chocolate font-display font-semibold text-sm mb-3">Payment Method</h3>
          <div className="space-y-2">
            {[{ id: 'card' as const, label: 'Credit/Debit Card' }, { id: 'apple' as const, label: 'Apple Pay' }, { id: 'google' as const, label: 'Google Pay' }].map((m) => (
              <button key={m.id} onClick={() => setPayment(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${payment === m.id ? 'bg-ds-rose/10 border-ds-rose/40' : 'bg-ds-cream border-transparent'}`}>
                <CreditCard size={18} className="text-ds-chocolate" /><span className="text-ds-chocolate text-sm font-medium">{m.label}</span>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === m.id ? 'bg-ds-rose border-ds-rose' : 'border-ds-caramel/40'}`}>{payment === m.id && <CheckCircle size={12} className="text-white" />}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ds-caramel/10 p-5 z-50">
        <button onClick={handlePlace} className="w-full h-14 rounded-full bg-ds-rose text-white font-display font-semibold text-base active:scale-[0.97] transition-transform shadow-lg shadow-ds-rose/30">Place Order - ${total.toFixed(2)}</button>
      </div>
    </div>
  )
}