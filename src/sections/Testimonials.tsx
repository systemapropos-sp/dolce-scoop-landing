import { Star, Quote } from 'lucide-react'
const reviews = [
  { name: 'Emma L.', role: 'Food Blogger', text: "The pistachio gelato here is the real deal - it tastes exactly like the ones I had in Sicily. You can tell they use authentic Sicilian pistachios. Absolutely divine!", rating: 5 },
  { name: 'Marcus R.', role: 'Local Regular', text: "I've been coming here every weekend for a year. The Strawberry Fields is my go-to, but I always try the seasonal specials. The waffle cone is made fresh - you can taste the difference.", rating: 5 },
  { name: 'Sofia K.', role: 'Mom of Three', text: "My kids love the Cookies & Cream and I love that they use real ingredients I can pronounce. The dairy-free mango sorbet is a lifesaver for my lactose-intolerant daughter!", rating: 5 },
]
export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 lg:py-32 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center gsap-reveal mb-14">
          <span className="inline-block px-4 py-1.5 bg-ds-rose/10 text-ds-rose text-xs font-bold uppercase tracking-widest rounded-full mb-6">Reviews</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ds-chocolate">Sweet words from <span className="text-ds-rose">sweet people</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="gsap-reveal bg-ds-cream rounded-3xl p-6 lg:p-8 border border-ds-caramel/10 relative">
              <Quote size={32} className="text-ds-rose/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">{[...Array(r.rating)].map((_, j) => <Star key={j} size={16} className="text-ds-caramel fill-ds-caramel" />)}</div>
              <p className="text-ds-chocolate/80 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-ds-rose/10 flex items-center justify-center"><span className="font-display font-bold text-ds-rose text-sm">{r.name.split(' ').map((n) => n[0]).join('')}</span></div>
                <div><p className="font-display font-semibold text-ds-chocolate text-sm">{r.name}</p><p className="text-ds-caramel text-xs">{r.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}