import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Story from './sections/Story'
import MenuShowcase from './sections/MenuShowcase'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import Locations from './sections/Locations'
import Newsletter from './sections/Newsletter'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    document.querySelectorAll('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } })
    })
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <div className="min-h-screen bg-ds-cream">
      <Navbar /><Hero /><Story /><MenuShowcase /><Process /><Testimonials /><Locations /><Newsletter /><Footer />
    </div>
  )
}