import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis } from './hooks/useLenis'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
                <div style={{ background: 'radial-gradient(ellipse 120% 80% at 100% 100%, #1a4eb8 0%, #6b8fd4 30%, #dce6f7 60%, #ffffff 100%)' }}>
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
