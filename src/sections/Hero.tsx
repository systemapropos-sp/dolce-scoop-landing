import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo('.hero-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
        .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/strawberry-scoop.jpg" alt="Artisan ice cream" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-chocolate/70 via-ds-chocolate/50 to-ds-chocolate/80" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => <div key={i} className="absolute rounded-full bg-ds-rose/20 animate-float" style={{ width: `${20 + i * 15}px`, height: `${20 + i * 15}px`, left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.8}s`, animationDuration: `${4 + i}s` }} />)}
      </div>
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
          <span className="text-white/90 text-sm font-medium">Handcrafted Daily &middot; Small Batches &middot; Premium Ingredients</span>
        </div>
        <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">LIFE IS<br /><span className="text-ds-rose">SWEETER.</span></h1>
        <p className="hero-sub text-white/70 text-base sm:text-lg mt-6 max-w-lg mx-auto leading-relaxed">Artisan ice cream, authentic Italian gelato, refreshing sorbets, and decadent sundaes. Made fresh daily.</p>
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#menu" className="px-8 py-4 bg-ds-rose text-white font-display font-semibold rounded-full hover:bg-ds-rose-dark transition-all active:scale-95 shadow-lg shadow-ds-rose/30">Explore Flavors</a>
          <a href="#story" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-display font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all active:scale-95">Our Story</a>
        </div>
      </div>
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-white/50 animate-bounce" />
      </div>
    </section>
  )
}