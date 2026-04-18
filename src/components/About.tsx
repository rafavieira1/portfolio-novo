import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from './ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const imgRef = useRef<HTMLDivElement>(null)

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
    <section id="sobre" className="py-24 md:py-32 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

        {/* Left — full-bleed image */}
        <Reveal direction="left">
          <div
            ref={imgRef}
            className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden bg-[#0e0e0e] rounded-r-3xl"
          >
            <img
              src="/4por3.png"
              alt="Retrato de Rafael Vieira"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        {/* Right — title + two-column text */}
        <div className="flex flex-col justify-start px-6 md:px-12 lg:px-16 pt-0 pb-16 lg:pb-0">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-16 md:mb-20 lg:mb-24">
              <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary select-none">02</span>
              <div className="h-px flex-1 max-w-[3rem] bg-border" />
              <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-text-primary">
                Sobre Mim
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                Sou Rafael Vieira, desenvolvedor web full-stack.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                Há cerca de 4 anos me apaixonei pela ideia de criar soluções digitais que resolvem problemas reais, e há 2 anos venho desenvolvendo sites e sistemas para clientes.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                Atualmente curso os últimos períodos de Ciência da Computação. Fora do trabalho, gosto de esportes, música, jogos e tudo que envolve tecnologia.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                O que me move é facilitar processos e gerar resultado para meus clientes, seja aumentando a conversão com um site bem feito ou simplificando a gestão do negócio com um sistema sob medida.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                Atendo presencialmente em Medianeira e região, e remotamente em qualquer lugar do Brasil e do mundo.
              </p>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}
