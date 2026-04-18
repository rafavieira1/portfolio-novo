import { MagneticButton } from './ui/MagneticButton'
import { getLenis } from '../hooks/useLenis'

const footerLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
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
    <footer className="border-t border-border px-6 md:px-12 lg:px-[8%] py-10 md:py-12 mt-6">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Rafael Vieira</p>
          <p className="text-sm text-text-secondary/90">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:justify-end">
          {footerLinks.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className="text-xs uppercase tracking-[0.16em] text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}

          <MagneticButton>
            <button
              type="button"
              onClick={() => getLenis()?.scrollTo(0)}
              className="text-xs uppercase tracking-[0.16em] text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              Topo
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
