import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useLenis from '@/hooks/useLenis'

import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Band from '@/components/Band/Band'
import Videos from '@/components/Videos/Videos'
import Gallery from '@/components/Gallery/Gallery'
import Contact from '@/components/Contact/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useLenis()

  useEffect(() => {
    // Recalculate trigger positions once fonts/images have settled in.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timeout = setTimeout(refresh, 500)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Band />
        <Videos />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
