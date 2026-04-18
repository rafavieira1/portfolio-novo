import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from './ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

const techTags = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL']

const stats = [
  { value: '3+', label: 'Anos de experiência' },
  { value: '20+', label: 'Projetos entregues' },
  { value: '100%', label: 'Foco em resultado' },
]

export function About() {
  const imgRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current!,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: imgRef.current!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" className="py-24 md:py-32 lg:py-44 px-6 md:px-12 lg:px-[8%]">

      {/* Header */}
      <Reveal>
        <div className="flex items-baseline gap-4 mb-16 md:mb-20 lg:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary select-none">02</span>
          <div className="h-px flex-1 max-w-[3rem] bg-border" />
          <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-text-primary">
            Sobre Mim
          </h2>
        </div>
      </Reveal>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

        {/* Left — portrait */}
        <Reveal direction="left">
          <div
            ref={imgRef}
            className="relative w-full aspect-[4/3]"
          >
            {/* Decorative frame offset */}
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-border/60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-[repeating-linear-gradient(122deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_12px)] opacity-60"
            />

            {/* Main image */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <img
                src="/4por3.png"
                alt="Retrato de Rafael Vieira"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />
            </div>

            {/* Accent badge */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden md:flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface text-text-tertiary text-[10px] tracking-[0.25em] uppercase shadow-lg"
            >
              2026
            </div>
          </div>
        </Reveal>

        {/* Right — text + stats */}
        <div className="flex flex-col gap-10 lg:pt-2">

          <div>
            <Reveal>
              <p className="text-xs tracking-[0.25em] uppercase text-text-tertiary mb-6">
                Freelancer Full-stack
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-5">
                Sou Rafael Vieira, desenvolvedor full-stack focado em criar produtos digitais
                com equilíbrio entre estratégia, estética e performance.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
                Atuo desde a definição da experiência até a implementação final,
                entregando interfaces consistentes e arquiteturas sólidas para startups,
                negócios locais e produtos SaaS.
              </p>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal delay={0.25}>
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-px border border-border rounded-2xl overflow-hidden bg-border"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 px-5 py-6 bg-surface"
                >
                  <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-text-tertiary leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech tags */}
          <Reveal delay={0.35}>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wider uppercase text-text-secondary border border-border px-3.5 py-1.5 rounded-full hover:border-text-tertiary transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
