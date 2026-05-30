import { IceCream, Instagram, Facebook, Twitter } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="bg-ds-chocolate py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-ds-rose flex items-center justify-center"><IceCream size={18} className="text-white" /></div>
              <span className="font-display font-bold text-white text-lg">Dolce Scoop</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Artisan ice cream, gelato, sorbets, sundaes & milkshakes. Handcrafted daily with premium ingredients.</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ds-rose transition-colors"><Instagram size={16} className="text-white" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ds-rose transition-colors"><Facebook size={16} className="text-white" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ds-rose transition-colors"><Twitter size={16} className="text-white" /></a>
            </div>
          </div>
          <div><h4 className="font-display font-semibold text-white mb-4">Menu</h4><ul className="space-y-2.5">{['Artisan Scoops', 'Gelato', 'Sorbets', 'Sundaes', 'Milkshakes', 'Waffles'].map((item) => <li key={item}><a href="#menu" className="text-white/50 text-sm hover:text-ds-rose transition-colors">{item}</a></li>)}</ul></div>
          <div><h4 className="font-display font-semibold text-white mb-4">Company</h4><ul className="space-y-2.5">{['Our Story', 'Locations', 'Careers', 'Press', 'Contact'].map((item) => <li key={item}><a href="#" className="text-white/50 text-sm hover:text-ds-rose transition-colors">{item}</a></li>)}</ul></div>
          <div><h4 className="font-display font-semibold text-white mb-4">Contact</h4><ul className="space-y-2.5 text-white/50 text-sm"><li>hello@dolcescoop.com</li><li>(212) 555-0192</li><li>456 Sweet Avenue<br />New York, NY 10001</li></ul></div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} Dolce Scoop. All rights reserved.</p>
          <div className="flex items-center gap-6"><a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Privacy Policy</a><a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Terms of Service</a></div>
        </div>
      </div>
    </footer>
  )
}