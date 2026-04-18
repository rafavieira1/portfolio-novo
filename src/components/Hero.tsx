import { useState } from 'react'

const personPng = '/eu.png'
const localFallbackPerson = '/images/hero-person.svg'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.83v2.05h.05C11.9 8.9 13.48 7.5 16 7.5c5.2 0 6 3.2 6 7.35V23h-4v-7.2c0-1.72-.03-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.8V23h-4V8z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .97-.31 3.17 1.17a11 11 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.57.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.7 6.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
      </svg>
    ),
  },
]

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className="px-2 pb-8 pt-16 md:px-3 md:pt-20 lg:px-4">
      <div
        className="relative mx-auto min-h-[calc(100vh-0.5rem)] max-w-[1800px] overflow-hidden rounded-[3rem] border border-border bg-[linear-gradient(160deg,#11141b_0%,#0d1016_55%,#0a0c12_100%)] text-text-primary shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(122deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_95px)] opacity-60" />

        {/* Imagem centralizada absolutamente no retângulo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          {!imageFailed ? (
            <img
              src={personPng}
              alt="Retrato de Rafael Vieira"
              className="h-[92vh] w-auto max-w-[750px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,0.45)]"
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <img
              src={localFallbackPerson}
              alt="Retrato de pessoa"
              className="h-[78vh] w-auto max-w-[500px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,0.45)]"
              loading="eager"
              decoding="async"
            />
          )}
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-0.5rem)] flex-col px-5 pt-5 pb-20 md:px-8 md:pt-6 md:pb-24 lg:px-12 lg:pt-7 lg:pb-28">
          <header className="relative z-10 pt-1 md:pt-2">
            <h1 className="font-hero-display text-center text-[clamp(2.8rem,13vw,13rem)] uppercase tracking-[0.02em] text-text-primary">
              Rafael Vieira
            </h1>
          </header>

          <div className="mt-0 flex flex-1 items-end pb-2">
            <div className="relative z-30 flex flex-col justify-center">
              <h2 className="max-w-[24ch] text-[clamp(1.8rem,2.8vw,2.7rem)] font-light leading-[1.06] text-text-primary">
                Desenvolvo produtos web com design refinado e foco em resultado.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-text-secondary">
                Trabalho de ponta a ponta: estrategia, interface, frontend e backend. Entrego experiencias rapidas, elegantes e prontas para conversao.
              </p>

              <div className="mt-8 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-tertiary transition-colors hover:border-text-secondary hover:text-text-primary"
                    data-cursor="expand"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
