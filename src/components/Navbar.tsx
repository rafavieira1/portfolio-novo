import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { MagneticButton } from './ui/MagneticButton'
import { getLenis } from '../hooks/useLenis'

const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(href: string) {
    setMenuOpen(false)
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 })
    }
  }

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        '.mobile-menu-link',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 transition-all duration-300 ${
          scrolled ? 'bg-bg/60 backdrop-blur-md' : ''
        }`}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); getLenis()?.scrollTo(0) }}
          className="text-sm tracking-[0.3em] uppercase font-light text-text-primary"
          data-cursor="expand"
        >
          RV
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-sm tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          data-cursor="expand"
        >
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className="mobile-menu-link text-3xl font-extralight tracking-wide text-text-primary"
              data-cursor="expand"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
