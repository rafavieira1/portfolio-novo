import { getLenis } from '../hooks/useLenis'
import { MagneticButton } from './ui/MagneticButton'
import { MotionButton } from './ui/motion-button'

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/rafavieira1',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .97-.31 3.17 1.17a11 11 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.57.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rafael-silva-vieira/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.83v2.05h.05C11.9 8.9 13.48 7.5 16 7.5c5.2 0 6 3.2 6 7.35V23h-4v-7.2c0-1.72-.03-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.8V23h-4V8z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rafavieiradev/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.7 6.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
      </svg>
    ),
  },
]

export function Footer() {
  function scrollTo(href: string) {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 })
      return
    }
    window.location.hash = href
  }

  return (
    <footer className="relative overflow-hidden border-t border-border px-5 pt-14 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg:px-[6%]">
      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-10 text-center md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8 md:text-left">
        <div className="flex flex-col items-center gap-6 md:items-start">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-text-secondary/30 text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
                data-cursor="expand"
              >
                {social.icon}
              </a>
            ))}
            <a
              href="mailto:rafavieira372@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-text-secondary/30 text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
              data-cursor="expand"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </a>
          </div>
          <address className="not-italic text-sm leading-relaxed text-text-secondary/80">
            Medianeira - PR · Atendimento remoto
            <br />
            Disponível para projetos
          </address>
        </div>

        <div className="flex items-center justify-center py-2 md:py-8">
          <MagneticButton>
            <MotionButton
              label="Fale comigo"
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contato')
              }}
              data-cursor="expand"
            />
          </MagneticButton>
        </div>

        <nav className="flex flex-col items-center gap-2 md:items-end">
          {navLinks.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className="text-base text-text-secondary transition-colors hover:text-text-primary md:text-lg"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </nav>
      </div>

      <div className="relative z-10 mt-12 flex items-center justify-center gap-3 text-center text-xs text-text-secondary/80 md:mt-20">
        <p>© {new Date().getFullYear()} Rafael Vieira</p>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-6 flex justify-center">
        <span className="font-hero-display select-none whitespace-nowrap text-[clamp(5rem,28vw,22rem)] lowercase leading-[0.85] tracking-tight text-text-secondary/[0.09] -mb-[0.25em]">
          rafael
        </span>
      </div>
    </footer>
  )
}
