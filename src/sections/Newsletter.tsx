import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSubmitted(true) }
  return (
    <section id="contact" className="py-24 lg:py-32 px-5 bg-ds-rose relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => <div key={i} className="absolute rounded-full border border-white" style={{ width: `${100 + i * 80}px`, height: `${100 + i * 80}px`, left: `${50 + (i % 3) * 20}%`, top: `${30 + (i % 2) * 40}%`, transform: 'translate(-50%, -50%)' }} />)}
      </div>
      <div className="max-w-2xl mx-auto text-center relative gsap-reveal">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">Join the <span className="text-ds-vanilla">scoop squad</span></h2>
        <p className="text-white/70 mt-4">Get early access to new flavors, seasonal specials, and sweet deals.</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-4 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 outline-none focus:bg-white/25 transition-colors text-sm" />
            <button type="submit" className="px-6 py-4 bg-white text-ds-rose font-display font-semibold rounded-full hover:bg-ds-vanilla hover:text-ds-chocolate transition-colors active:scale-95 flex items-center justify-center gap-2"><Send size={16} /> Subscribe</button>
          </form>
        ) : <div className="mt-10 flex items-center justify-center gap-2 text-white"><CheckCircle size={20} className="text-ds-vanilla" /><span className="font-medium">Welcome to the squad! Check your inbox.</span></div>}
        <p className="text-white/40 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}