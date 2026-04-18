import { Reveal } from './ui/Reveal'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/rafavieira1',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .97-.31 3.17 1.17a11 11 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.57.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rafael-silva-vieira/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.83v2.05h.05C11.9 8.9 13.48 7.5 16 7.5c5.2 0 6 3.2 6 7.35V23h-4v-7.2c0-1.72-.03-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.8V23h-4V8z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rafavieiradev/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.7 6.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
      </svg>
    ),
  },
]

export function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-[8%] flex flex-col items-center">
      <Reveal className="w-full flex flex-col items-center gap-6">

        {/* Card */}
        <a
          href="https://wa.me/5519997026999?text=Ol%C3%A1%20Rafael%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border"
          data-cursor="expand"
          aria-label="Entrar em contato pelo WhatsApp"
        >
          {/* Default background image — fades out on hover to reveal section background */}
          <div
            className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundImage: "url('fundocta.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="relative flex flex-col items-center justify-between min-h-[500px] md:min-h-[600px] py-12 px-8">
            {/* Top: icon + label + whatsapp button */}
            <div className="flex flex-col items-center gap-5">
              <img
                src="/tucano.png"
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain"
              />
              <p className="text-xs tracking-[0.25em] uppercase text-text-tertiary group-hover:text-text-secondary transition-colors duration-500">
                ORÇAMENTO SEM COMPROMISSO · RESPOSTA RÁPIDA
              </p>
              <div className="flex items-center gap-2 h-10 px-5 rounded-full border border-text-secondary/20 bg-transparent text-text-secondary text-xs tracking-[0.15em] uppercase pointer-events-none">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.82 11.82 0 0 0 5.66 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.78.99 1.01-3.69-.23-.38a9.44 9.44 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.46-9.3 9.66zm5.2-7.1c-.29-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
                </svg>
                WhatsApp
              </div>
            </div>

            {/* Bottom: big CTA text */}
            <h2 className="text-[clamp(2.8rem,9vw,6rem)] font-extralight tracking-tight leading-none text-text-primary text-center">
              VAMOS CONSTRUIR ALGO JUNTOS?
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
              className="flex items-center gap-2 h-10 px-5 rounded-full border border-text-secondary/20 text-text-secondary text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:border-transparent hover:bg-white hover:text-text-secondary"
              data-cursor="expand"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

      </Reveal>
    </section>
  )
}
