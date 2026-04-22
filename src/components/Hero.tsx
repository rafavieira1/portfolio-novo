import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Marquee } from './ui/marquee'

gsap.registerPlugin(ScrollTrigger)

const personPng = '/eu.png'

const marqueeItems = [
  'Sites',
  'Landing Pages',
  'Sistemas',
  'Design',
  'Página de Links',
  'Automações',
  'Performance',
  'SEO',
]
const localFallbackPerson = '/images/hero-person.svg'

const socialLinks = [
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
    label: 'GitHub',
    href: 'https://github.com/rafavieira1',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .97-.31 3.17 1.17a11 11 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.57.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
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

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scope = sectionRef.current
    if (!scope) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      tl.to(
        '[data-hero-card]',
        { scale: 0.92, yPercent: -6, filter: 'blur(6px)', opacity: 0.35, ease: 'none' },
        0,
      )
        .to('[data-hero-h1]', { yPercent: -45, ease: 'none' }, 0)
        .to('[data-hero-person]', { yPercent: 18, ease: 'none' }, 0)
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="px-2 pb-16 pt-16 sm:px-3 sm:pb-20 md:pt-20 lg:px-4 lg:pb-28 2xl:pb-40">
      <div
        data-hero-card
        className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.25rem] border border-border text-text-primary shadow-[0_30px_120px_rgba(27,58,122,0.12)] will-change-transform sm:rounded-[2.75rem] 2xl:min-h-[92vh] 2xl:rounded-[3rem]"
        style={{ backgroundImage: "url('/gra.png')", backgroundSize: 'cover', backgroundPosition: 'center', transformOrigin: 'center top' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(27,58,122,0.07),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(41,82,163,0.05),transparent_30%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(122deg,rgba(27,58,122,0.018)_0px,rgba(27,58,122,0.018)_1px,transparent_1px,transparent_95px)] opacity-60" />

        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-[5]">
          <Marquee duration={40} fade={false} className="w-full">
            {marqueeItems.map((item) => (
              <span
                key={item}
                className="mx-8 whitespace-nowrap font-sans text-[clamp(0.75rem,3vw,1.5rem)] uppercase leading-none tracking-[0.18em] text-neutral-900/20"
              >
                {item} <span className="mx-2 text-text-primary/10">✦</span>
              </span>
            ))}
          </Marquee>
        </div>

        <div data-hero-person className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden 2xl:flex justify-center will-change-transform">
          {!imageFailed ? (
            <img
              src={personPng}
              alt="Retrato de Rafael Vieira"
              className="h-[105vh] w-auto max-w-[1050px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(27,58,122,0.18)]"
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <img
              src={localFallbackPerson}
              alt="Retrato de pessoa"
              className="h-[78vh] w-auto max-w-[500px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(27,58,122,0.18)]"
              loading="eager"
              decoding="async"
            />
          )}
        </div>

        <div className="relative z-10 flex min-h-[72vh] flex-col px-5 pt-6 sm:min-h-[92vh] sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:hidden">
          <header data-hero-h1 className="relative z-10 will-change-transform">
            <h1
              className="font-hero-display mx-auto max-w-[9ch] text-center text-[clamp(3.25rem,18vw,8rem)] leading-[0.82] uppercase tracking-[0.02em] text-neutral-900 sm:max-w-[10ch] sm:text-[clamp(4rem,15vw,8.75rem)] lg:max-w-[12ch] xl:text-[clamp(5.5rem,12vw,9.5rem)] [transform:scaleY(1.16)] sm:[transform:scaleY(1.2)]"
              style={{
                textShadow:
                  '0 0 40px rgba(17,17,17,0.12), 0 0 80px rgba(17,17,17,0.08), 0 0 160px rgba(17,17,17,0.05)',
                transformOrigin: 'top',
              }}
            >
              Rafael Vieira
            </h1>
          </header>

          <div className="relative z-30 mt-5 px-1 md:mt-10 lg:mt-14 xl:mt-16">
            <h2 className="font-sans text-[0.82rem] font-light leading-[1.1] text-text-primary text-center sm:text-[0.9rem]">
              Sites e sistemas que transformam negócios locais em marcas digitais.
            </h2>
            <p className="mt-1 text-[0.68rem] leading-relaxed text-text-secondary text-center sm:text-[0.72rem]">
              Atuo do planejamento à entrega: estratégia, design, frontend e backend. Produtos rápidos, elegantes e prontos para converter.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://wa.me/5519997026999?text=Ol%C3%A1%20Rafael%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
                data-cursor="expand"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 fill-current">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.82 11.82 0 0 0 5.66 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.78.99 1.01-3.69-.23-.38a9.44 9.44 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.46-9.3 9.66zm5.2-7.1c-.29-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
                </svg>
                Fale comigo
              </a>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-text-secondary/20 text-text-secondary transition-colors hover:border-text-secondary hover:text-text-secondary"
                  data-cursor="expand"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div data-hero-person className="pointer-events-none relative z-20 mt-4 flex min-h-0 flex-1 items-end justify-center will-change-transform">
            {!imageFailed ? (
              <img
                src={personPng}
                alt="Retrato de Rafael Vieira"
                className="h-full max-h-[70vh] w-auto max-w-[135%] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(27,58,122,0.18)]"
                loading="eager"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <img
                src={localFallbackPerson}
                alt="Retrato de pessoa"
                className="h-full max-h-[70vh] w-auto max-w-[80%] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(27,58,122,0.18)]"
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        </div>

        <div className="relative z-10 hidden min-h-[92vh] flex-col px-5 pt-0 pb-20 md:px-8 md:pb-24 lg:px-12 lg:pb-28 2xl:flex">
          <header data-hero-h1 className="relative z-10 pt-0 will-change-transform">
            <h1
              className="font-hero-display whitespace-nowrap text-center text-[clamp(2.8rem,13vw,11rem)] uppercase tracking-[0.02em] text-neutral-900"
              style={{
                textShadow:
                  '0 0 40px rgba(17,17,17,0.12), 0 0 80px rgba(17,17,17,0.08), 0 0 160px rgba(17,17,17,0.05)',
                transform: 'scaleY(1.38)',
                transformOrigin: 'top',
              }}
            >
              Rafael Vieira
            </h1>
          </header>

          <div className="mt-0 flex flex-1 items-end pb-2">
            <div className="relative z-30 flex flex-col justify-center">
              <h2 className="font-sans max-w-[24ch] text-[clamp(1.8rem,2.8vw,2.7rem)] font-light leading-[1.06] text-text-primary">
                Sites e sistemas que transformam negócios locais em marcas digitais.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-text-secondary">
                Atuo do planejamento à entrega: estratégia, design, frontend e backend. Produtos rápidos, elegantes e prontos para converter.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/5519997026999?text=Ol%C3%A1%20Rafael%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  data-cursor="expand"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.82 11.82 0 0 0 5.66 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.78.99 1.01-3.69-.23-.38a9.44 9.44 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.46-9.3 9.66zm5.2-7.1c-.29-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
                  </svg>
                  Fale comigo
                </a>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-text-secondary/20 text-text-secondary transition-colors hover:border-text-secondary hover:text-text-secondary"
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
