import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { getLenis } from '../hooks/useLenis'
import { MagneticButton } from './ui/MagneticButton'

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

  useEffect(() => {
    const lenis = getLenis()

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }

    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    gsap.fromTo(
      '.mobile-menu-link',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }
    )
  }, [menuOpen])

  function scrollTo(href: string) {
    setMenuOpen(false)
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 })
    }
  }

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-300 sm:px-6 md:px-10 md:py-5 lg:px-20 ${
          scrolled ? 'bg-bg/60 backdrop-blur-md' : ''
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(false)
            getLenis()?.scrollTo(0)
          }}
          className="text-sm font-light uppercase tracking-[0.3em] text-text-primary"
          data-cursor="expand"
        >
          <img src="/tucano.png" alt="Logo" className="h-8 w-auto" />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {links.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className="text-sm tracking-wider text-text-secondary transition-colors duration-300 hover:text-text-primary"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </div>

        <button
          className="flex w-6 flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          data-cursor="expand"
        >
          <span
            className={`block h-px bg-text-primary transition-all duration-300 ${
              menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px bg-text-primary transition-all duration-300 ${
              menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-bg px-6 pt-24 pb-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
              className="mobile-menu-link text-[clamp(2rem,10vw,3rem)] font-extralight tracking-wide text-text-primary"
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
