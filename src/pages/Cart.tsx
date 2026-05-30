import { useApp } from '@/context/AppContext'
import { ArrowLeft, Minus, Plus, Trash2, Receipt } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Cart() {
  const { state, goBack, navigate, dispatch, cartTotal } = useApp()
  const cart = state.cart
  const tax = cartTotal * 0.0875
  const total = cartTotal + tax

  return (
    <div className="min-h-screen bg-ds-cream relative">
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-ds-caramel/10">
        <div className="flex items-center gap-3 px-5 h-14">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-ds-cream flex items-center justify-center active:scale-90 transition-transform"><ArrowLeft size={20} className="text-ds-chocolate" /></button>
          <h1 className="font-display text-xl font-bold text-ds-chocolate">Your Order</h1>
          {cart.length > 0 && <span className="ml-auto text-ds-caramel text-sm">{cart.length} items</span>}
        </div>
      </div>
      <div className="px-5 pt-4 pb-44">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-ds-cream flex items-center justify-center mb-5"><Receipt size={32} className="text-ds-caramel" /></div>
            <h2 className="font-display text-2xl font-bold text-ds-chocolate mb-2">Your cart is empty</h2>
            <p className="text-ds-caramel text-sm max-w-[260px]">Add some scoops of happiness to get started.</p>
            <button onClick={() => navigate('home')} className="mt-6 px-8 py-3 bg-ds-rose text-white rounded-full font-display font-semibold text-sm active:scale-95 transition-transform shadow-lg shadow-ds-rose/20">Browse Menu</button>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((ci, i) => (
              <motion.div key={ci.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-4 border border-ds-caramel/10 shadow-sm">
                <div className="flex gap-3">
                  <img src={ci.menuItem.image} alt={ci.menuItem.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-ds-chocolate font-display font-semibold text-sm leading-tight">{ci.menuItem.name}</h3>
                      <span className="text-ds-rose font-display font-bold text-sm shrink-0">${ci.totalPrice.toFixed(2)}</span>
                    </div>
                    {Object.entries(ci.selectedModifiers).length > 0 && <p className="text-ds-caramel text-xs mt-1">{Object.values(ci.selectedModifiers).map((v) => { for (const m of ci.menuItem.modifiers || []) { const o = m.options.find((x) => x.id === v); if (o) return o.name } return '' }).filter(Boolean).join(', ')}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', cartItemId: ci.id, quantity: ci.quantity - 1 })} className="w-7 h-7 rounded-full bg-ds-cream flex items-center justify-center active:scale-75 transition-transform"><Minus size={14} className="text-ds-chocolate" /></button>
                        <span className="text-ds-chocolate font-display font-semibold text-sm w-4 text-center">{ci.quantity}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', cartItemId: ci.id, quantity: ci.quantity + 1 })} className="w-7 h-7 rounded-full bg-ds-rose flex items-center justify-center active:scale-75 transition-transform"><Plus size={14} className="text-white" /></button>
                      </div>
                      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', cartItemId: ci.id })} className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center active:scale-75 transition-transform"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ds-caramel/10 p-5 z-50">
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm"><span className="text-ds-caramel">Subtotal</span><span className="text-ds-chocolate font-medium">${cartTotal.toFixed(2)}</span></div>
            <div className="flex items-center justify-between text-sm"><span className="text-ds-caramel">Tax</span><span className="text-ds-chocolate font-medium">${tax.toFixed(2)}</span></div>
            <div className="border-t border-ds-caramel/20 pt-2 flex items-center justify-between"><span className="text-ds-chocolate font-display font-bold">Total</span><span className="text-ds-rose font-display font-bold text-lg">${total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => navigate('checkout')} className="w-full h-14 rounded-full bg-ds-rose text-white font-display font-semibold text-base active:scale-[0.97] transition-transform shadow-lg shadow-ds-rose/30">Checkout - ${total.toFixed(2)}</button>
        </div>
      )}
    </div>
  )
}