import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from './ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = imgRef.current
    if (!element) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 1023px)').matches
    ) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" className="px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-12 lg:py-32 xl:px-[6%] 2xl:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-stretch lg:gap-10 2xl:grid-cols-[50%_1fr] 2xl:gap-12">
        {/* Header — visible only on mobile/tablet (hidden on lg+) */}
        <Reveal className="mb-10 lg:hidden sm:mb-12 md:mb-14">
          <div className="flex items-baseline gap-4">
            <span className="select-none text-xs uppercase tracking-[0.3em] text-text-tertiary">02</span>
            <div className="h-px max-w-[3rem] flex-1 bg-border" />
            <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-text-primary">
              Sobre Mim
            </h2>
          </div>
        </Reveal>

        <Reveal direction="left" className="mb-10 lg:mb-0 lg:self-start sm:mb-12 md:mb-14">
          <div ref={imgRef} className="max-h-[720px] overflow-hidden rounded-[2rem] bg-[#0e0e0e]">
            <img
              src="/upsc.png"
              alt="Retrato de Rafael Vieira"
              className="block h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <div className="flex flex-col justify-start lg:pt-4">
          {/* Header — visible only on desktop (hidden on mobile/tablet) */}
          <Reveal>
            <div className="mb-12 hidden items-baseline gap-4 lg:flex lg:mb-20 2xl:mb-24">
              <span className="select-none text-xs uppercase tracking-[0.3em] text-text-tertiary">02</span>
              <div className="h-px max-w-[3rem] flex-1 bg-border" />
              <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-text-primary">
                Sobre Mim
              </h2>
            </div>
          </Reveal>

          <div className="flex max-w-[52rem] flex-col gap-5">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                Sou Rafael Vieira, desenvolvedor de IA e automação.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                Desde janeiro de 2026 estou na SafeWork, empresa de saúde e segurança do trabalho, onde desenvolvi do zero a plataforma de automações: agentes de IA no WhatsApp, um sistema de agendamento de exames e robôs que operam o ERP do setor.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                Antes disso, trabalhei com suporte e desenvolvimento em ERPs, o que me ensinou a entender o processo antes de automatizar. Também desenvolvo sites e sistemas para clientes desde 2025.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                No dia a dia, uso o Claude Code e o Codex, sempre com especificação, plano e testes antes do código. Também criei um servidor MCP que conecta o Claude aos dados de campanhas do Meta Ads.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                Estou no último semestre de Ciência da Computação na UTFPR. Fora do trabalho, gosto de esportes, música e jogos.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
