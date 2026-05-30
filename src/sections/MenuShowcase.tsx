import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
const categories = ['All', 'Scoops', 'Gelato', 'Sorbets', 'Sundaes', 'Shakes']
const items = [
  { id: '1', name: 'Strawberry Fields', desc: 'Fresh California strawberries, house-made compote', category: 'Scoops', image: '/images/strawberry-scoop.jpg', tags: ['Bestseller', '280 cal'] },
  { id: '2', name: 'Sicilian Pistachio', desc: 'Imported Sicilian pistachios, velvety smooth', category: 'Gelato', image: '/images/pistachio-gelato.jpg', tags: ['Signature', '260 cal'] },
  { id: '3', name: 'Dark Chocolate', desc: '70% Valrhona chocolate, intensely rich', category: 'Gelato', image: '/images/chocolate-gelato.jpg', tags: ['290 cal'] },
  { id: '4', name: 'Salted Caramel Sundae', desc: 'Vanilla & caramel scoops, pecans, whipped cream', category: 'Sundaes', image: '/images/caramel-sundae.jpg', tags: ['Chef Pick', '620 cal'] },
  { id: '5', name: 'Classic Vanilla Shake', desc: 'Madagascar vanilla, whipped cream, cherry', category: 'Shakes', image: '/images/milkshake.jpg', tags: ['480 cal'] },
  { id: '6', name: 'Tropical Mango', desc: 'Alphonso mangoes, dairy-free, refreshing', category: 'Sorbets', image: '/images/mango-sorbet.jpg', tags: ['Vegan', '150 cal'] },
  { id: '7', name: 'Belgian Waffle & Scoop', desc: 'Warm waffle, berries, powdered sugar', category: 'Sundaes', image: '/images/waffle-icecream.jpg', tags: ['New', '580 cal'] },
  { id: '8', name: 'Cookies & Cream', desc: 'Double-stuffed cookie chunks in vanilla bean', category: 'Scoops', image: '/images/cookies-cream.jpg', tags: ['340 cal'] },
]
export default function MenuShowcase() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? items : items.filter((i) => i.category === active)
  return (
    <section id="menu" className="py-24 lg:py-32 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center gsap-reveal mb-12">
          <span className="inline-block px-4 py-1.5 bg-ds-rose/10 text-ds-rose text-xs font-bold uppercase tracking-widest rounded-full mb-6">Our Menu</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ds-chocolate">A flavor for <span className="text-ds-rose">every craving</span></h2>
          <p className="text-ds-caramel mt-4 max-w-md mx-auto">From classic scoops to Italian gelato, every item is handcrafted with premium ingredients.</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap gsap-reveal">
          {categories.map((cat) => <button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${active === cat ? 'bg-ds-rose text-white shadow-lg shadow-ds-rose/20' : 'bg-ds-cream text-ds-chocolate hover:bg-ds-rose/10'}`}>{cat}</button>)}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden bg-ds-cream">
                  <div className="aspect-square overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ds-chocolate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2 mb-2">{item.tags.map((t) => <span key={t} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{t}</span>)}</div>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-display font-semibold text-ds-chocolate group-hover:text-ds-rose transition-colors">{item.name}</h3>
                  <p className="text-ds-caramel text-xs mt-1 line-clamp-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="text-center mt-12 gsap-reveal">
          <a href="#locations" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ds-rose text-ds-rose font-display font-semibold rounded-full hover:bg-ds-rose hover:text-white transition-all active:scale-95">Find a Shop <ArrowRight size={18} /></a>
        </div>
      </div>
    </section>
  )
}