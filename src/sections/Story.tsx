import { IceCream, Heart, Award, Leaf } from 'lucide-react'
const values = [
  { icon: IceCream, title: 'Small Batches', desc: 'Every flavor is crafted in small batches to ensure the freshest, creamiest texture.' },
  { icon: Heart, title: 'Made with Love', desc: 'Our artisans pour passion into every scoop, using time-honored techniques.' },
  { icon: Award, title: 'Premium Ingredients', desc: 'Valrhona chocolate, Sicilian pistachios, real vanilla beans - only the best.' },
  { icon: Leaf, title: 'Local & Fresh', desc: 'We partner with local farms for seasonal fruits and the freshest dairy.' },
]
export default function Story() {
  return (
    <section id="story" className="py-24 lg:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="gsap-reveal relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img src="/images/pistachio-gelato.jpg" alt="Pistachio gelato" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ds-chocolate/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-ds-caramel/10">
              <p className="font-display text-3xl font-bold text-ds-rose">25+</p>
              <p className="text-ds-caramel text-xs mt-1">Unique flavors daily</p>
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-ds-rose/20 animate-spin-slow" />
          </div>
          <div className="gsap-reveal">
            <span className="inline-block px-4 py-1.5 bg-ds-rose/10 text-ds-rose text-xs font-bold uppercase tracking-widest rounded-full mb-6">Our Story</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-ds-chocolate leading-tight">From a single <span className="text-ds-rose">churn</span> to a beloved destination</h2>
            <p className="text-ds-chocolate/70 mt-6 leading-relaxed">Dolce Scoop was born from a passion for authentic, handcrafted frozen desserts. What started as a small gelato cart at the local farmers market has grown into a community-loved destination for artisan ice cream.</p>
            <p className="text-ds-chocolate/70 mt-4 leading-relaxed">We believe that exceptional ice cream starts with exceptional ingredients. That is why we source Valrhona chocolate from France, Sicilian pistachios from Italy, and partner with local dairy farms for the freshest cream.</p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {values.map((v) => { const Icon = v.icon; return (
                <div key={v.title} className="p-4 bg-white rounded-2xl border border-ds-caramel/10">
                  <div className="w-10 h-10 rounded-xl bg-ds-rose/10 flex items-center justify-center mb-3"><Icon size={20} className="text-ds-rose" /></div>
                  <h4 className="font-display font-semibold text-ds-chocolate text-sm">{v.title}</h4>
                  <p className="text-ds-caramel text-xs mt-1 leading-relaxed">{v.desc}</p>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}