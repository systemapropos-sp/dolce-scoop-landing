import { useState, useEffect } from 'react'
import { IceCream, Menu, X } from 'lucide-react'
const links = [{ label: 'Our Story', href: '#story' }, { label: 'Flavors', href: '#menu' }, { label: 'Process', href: '#process' }, { label: 'Reviews', href: '#reviews' }, { label: 'Locations', href: '#locations' }]
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-ds-caramel/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${scrolled ? 'bg-ds-rose' : 'bg-white/20 backdrop-blur-sm'}`}><IceCream size={18} className="text-white" /></div>
          <span className={`font-display font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-ds-chocolate' : 'text-white'}`}>Dolce Scoop</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => <a key={l.label} href={l.href} className={`text-sm font-medium transition-colors hover:text-ds-rose ${scrolled ? 'text-ds-chocolate/70' : 'text-white/80'}`}>{l.label}</a>)}
          <a href="#contact" className="px-5 py-2 bg-ds-rose text-white text-sm font-medium rounded-full hover:bg-ds-rose-dark transition-colors">Visit Us</a>
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${scrolled ? 'bg-ds-cream' : 'bg-white/20 backdrop-blur-sm'}`}>
          {mobileOpen ? <X size={20} className={scrolled ? 'text-ds-chocolate' : 'text-white'} /> : <Menu size={20} className={scrolled ? 'text-ds-chocolate' : 'text-white'} />}
        </button>
      </div>
      {mobileOpen && <div className="lg:hidden bg-white border-b border-ds-caramel/10 px-5 pb-5">
        {links.map((l) => <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-ds-chocolate font-medium border-b border-ds-caramel/10">{l.label}</a>)}
        <a href="#contact" onClick={() => setMobileOpen(false)} className="block mt-3 px-5 py-3 bg-ds-rose text-white text-center font-medium rounded-full">Visit Us</a>
      </div>}
    </header>
  )
}