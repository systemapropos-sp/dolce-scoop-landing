import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Milk, Snowflake, Blend, Smile } from 'lucide-react'
gsap.registerPlugin(ScrollTrigger)
const steps = [
  { num: '01', icon: Milk, title: 'Source', desc: 'We partner with local dairy farms and import premium ingredients like Valrhona chocolate and Sicilian pistachios.', color: 'bg-ds-rose' },
  { num: '02', icon: Snowflake, title: 'Churn', desc: 'Our ice cream is slow-churned in small batches using traditional Italian techniques for the creamiest texture.', color: 'bg-blue-500' },
  { num: '03', icon: Blend, title: 'Flavor', desc: 'Real fruits, house-made sauces, and artisanal mix-ins are folded in to create complex, unforgettable flavors.', color: 'bg-ds-caramel' },
  { num: '04', icon: Smile, title: 'Scoop', desc: 'Every serving is scooped fresh to order. We believe the joy is in the details - from cone to cherry.', color: 'bg-ds-mint' },
]
export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((el, i) => {
        gsap.fromTo(el, { x: i % 2 === 0 ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  return (
    <section id="process" ref={sectionRef} className="py-24 lg:py-32 px-5 bg-ds-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-ds-rose/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-ds-caramel/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center gsap-reveal mb-16">
          <span className="inline-block px-4 py-1.5 bg-ds-rose/10 text-ds-rose text-xs font-bold uppercase tracking-widest rounded-full mb-6">Our Process</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ds-chocolate">From farm to <span className="text-ds-rose">cone</span></h2>
          <p className="text-ds-caramel mt-4 max-w-md mx-auto">Every step of our process is designed to create the creamiest, most flavorful ice cream experience.</p>
        </div>
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => { const Icon = step.icon; return (
            <div key={step.num} className="process-step relative bg-white rounded-3xl p-6 lg:p-8 border border-ds-caramel/10 shadow-sm">
              {i < steps.length - 1 && <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-ds-caramel/20" />}
              <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}><Icon size={24} className="text-white" /></div>
              <span className="text-ds-caramel/40 font-display text-5xl font-black absolute top-4 right-5">{step.num}</span>
              <h3 className="font-display text-xl font-bold text-ds-chocolate mt-2">{step.title}</h3>
              <p className="text-ds-chocolate/60 text-sm mt-3 leading-relaxed">{step.desc}</p>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}