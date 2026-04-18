import { Reveal } from './ui/Reveal'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
]

export function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-[8%] flex flex-col items-center">
      <Reveal className="w-full flex flex-col items-center gap-6">

        {/* Card */}
        <a
          href="mailto:rafavieira372@gmail.com"
          className="group relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-surface border border-border transition-colors duration-500 hover:bg-transparent"
          data-cursor="expand"
          aria-label="Entrar em contato"
        >
          <div className="flex flex-col items-center justify-between min-h-[420px] md:min-h-[500px] py-12 px-8">
            {/* Top: icon + label */}
            <div className="flex flex-col items-center gap-5">
              <svg
                viewBox="0 0 48 48"
                className="h-10 w-10 text-text-tertiary group-hover:text-text-secondary transition-colors duration-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="24" cy="24" r="20" />
                <line x1="24" y1="4" x2="24" y2="44" />
                <line x1="24" y1="24" x2="8.3" y2="36.7" />
                <line x1="24" y1="24" x2="39.7" y2="36.7" />
              </svg>
              <p className="text-xs tracking-[0.25em] uppercase text-text-tertiary group-hover:text-text-secondary transition-colors duration-500">
                Vamos trabalhar juntos?
              </p>
            </div>

            {/* Bottom: big CTA text centered */}
            <h2 className="text-[clamp(2.8rem,9vw,7rem)] font-extralight tracking-tight leading-none text-text-primary text-center">
              Entre em contato
            </h2>
          </div>
        </a>

        {/* Pill links below card */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.15em] uppercase text-text-tertiary border border-border rounded-full px-5 py-2.5 hover:border-text-tertiary hover:text-text-secondary transition-colors duration-300"
              data-cursor="expand"
            >
              {link.label}
            </a>
          ))}
        </div>

      </Reveal>
    </section>
  )
}
