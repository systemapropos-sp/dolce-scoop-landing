import { MapPin, Clock, Phone } from 'lucide-react'
const locations = [
  { name: 'Dolce Scoop - Downtown', address: '456 Sweet Avenue', hours: 'Mon-Fri 11am-10pm, Sat-Sun 10am-11pm', phone: '(212) 555-0192' },
  { name: 'Dolce Scoop - Westside', address: '789 Creamery Lane', hours: 'Mon-Sun 12pm-10pm', phone: '(212) 555-0241' },
  { name: 'Dolce Scoop - Brooklyn', address: '321 Gelato Street', hours: 'Mon-Thu 1pm-9pm, Fri-Sun 12pm-11pm', phone: '(718) 555-0378' },
]
export default function Locations() {
  return (
    <section id="locations" className="py-24 lg:py-32 px-5 bg-ds-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center gsap-reveal mb-14">
          <span className="inline-block px-4 py-1.5 bg-ds-rose/10 text-ds-rose text-xs font-bold uppercase tracking-widest rounded-full mb-6">Locations</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ds-chocolate">Find your <span className="text-ds-rose">scoop spot</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <div key={i} className="gsap-reveal bg-white rounded-3xl p-6 border border-ds-caramel/10 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-2xl bg-ds-rose/10 flex items-center justify-center mb-4 group-hover:bg-ds-rose transition-colors"><MapPin size={22} className="text-ds-rose group-hover:text-white transition-colors" /></div>
              <h3 className="font-display font-bold text-ds-chocolate text-lg">{loc.name}</h3>
              <p className="text-ds-chocolate/70 text-sm mt-2">{loc.address}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2"><Clock size={14} className="text-ds-caramel mt-0.5 shrink-0" /><span className="text-ds-caramel text-xs">{loc.hours}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-ds-caramel shrink-0" /><span className="text-ds-caramel text-xs">{loc.phone}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}