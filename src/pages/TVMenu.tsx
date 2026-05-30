import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'
import { menuItems } from '@/data/menu'
import { ArrowLeft } from 'lucide-react'

const tvCategories = ['Artisan Scoops', 'Gelato', 'Sorbets', 'Sundaes', 'Milkshakes', 'Waffles']

export default function TVMenu() {
  const { navigate } = useApp()
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => { const el = scrollRef.current; if (!el) return; let pos = 0, dir = 1; const interval = setInterval(() => { pos += 0.4 * dir; if (pos >= el.scrollHeight - el.clientHeight - 10) dir = -1; else if (pos <= 0) dir = 1; el.scrollTop = pos }, 30); return () => clearInterval(interval) }, [])
  return (
    <div className="h-screen w-screen bg-ds-chocolate overflow-hidden flex">
      <div className="w-[28%] bg-gradient-to-b from-ds-rose-dark to-ds-chocolate flex flex-col relative border-r border-white/5">
        <div className="p-8 pt-12">
          <h1 className="font-display text-5xl font-black text-white leading-none tracking-tight">DOLCE<br />SCOOP</h1>
          <p className="text-ds-vanilla text-lg mt-3 font-sans tracking-wide">Handcrafted with love.</p>
        </div>
        <div className="flex-1 relative mx-6 mb-6 rounded-3xl overflow-hidden">
          <img src="/images/strawberry-scoop.jpg" alt="Artisan ice cream" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ds-chocolate via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-ds-vanilla text-sm font-sans font-semibold uppercase tracking-wider">Made Fresh Daily</p>
            <p className="text-white text-xl font-display font-bold mt-1">Small batches, big flavor</p>
          </div>
        </div>
        <button onClick={() => navigate('home')} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"><ArrowLeft size={18} className="text-white" /></button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-hidden no-scrollbar">
        <div className="p-10 pb-20">
          {tvCategories.map((cat) => { const items = menuItems.filter((i) => i.category === cat); if (items.length === 0) return null; return (
            <div key={cat} className="mb-10">
              <h2 className="font-display text-4xl font-bold text-ds-rose mb-5 tracking-tight">{cat.toUpperCase()}</h2>
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-5 bg-white/[0.04] rounded-2xl p-4 border border-white/5 hover:bg-white/[0.07] transition-colors">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-white font-display font-bold text-lg leading-tight">{item.name}</h3>
                        <span className="text-ds-vanilla font-display font-bold text-xl shrink-0">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-white/50 text-sm mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                      <p className="text-white/30 text-xs mt-2">{item.calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )})}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-sm font-sans">All ice cream handcrafted in small batches with premium ingredients</p>
            <p className="text-ds-rose/60 text-xs font-sans mt-2">Dolce Scoop - Artisan Ice Cream & Gelato</p>
          </div>
        </div>
      </div>
    </div>
  )
}