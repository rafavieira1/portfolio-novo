import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from './ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

const techTags = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL']

const GRID_COLS = 5
const GRID_ROWS = 9
const IMAGE_X_OFFSET = -6

const mosaicCells = [
  { id: 1, colStart: 2, rowStart: 1, colSpan: 1, rowSpan: 2 },
  { id: 2, colStart: 3, rowStart: 1, colSpan: 2, rowSpan: 3 },
  { id: 3, colStart: 5, rowStart: 2, colSpan: 1, rowSpan: 2 },
  { id: 4, colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 3 },
  { id: 5, colStart: 3, rowStart: 4, colSpan: 2, rowSpan: 2 },
  { id: 6, colStart: 5, rowStart: 4, colSpan: 1, rowSpan: 2 },
  { id: 7, colStart: 2, rowStart: 6, colSpan: 1, rowSpan: 3 },
  { id: 8, colStart: 3, rowStart: 6, colSpan: 2, rowSpan: 4 },
  { id: 9, colStart: 5, rowStart: 6, colSpan: 1, rowSpan: 3 },
  { id: 10, colStart: 4, rowStart: 9, colSpan: 1, rowSpan: 1 },
]

function getTileBackgroundStyle(cell: { colStart: number; rowStart: number; colSpan: number; rowSpan: number }) {
  const xDen = GRID_COLS - cell.colSpan
  const yDen = GRID_ROWS - cell.rowSpan

  const bgPosXBase = xDen === 0 ? 50 : ((cell.colStart - 1) / xDen) * 100
  const bgPosX = Math.min(100, Math.max(0, bgPosXBase + IMAGE_X_OFFSET))
  const bgPosY = yDen === 0 ? 50 : ((cell.rowStart - 1) / yDen) * 100

  return {
    backgroundImage: "url('/4por3.png')",
    backgroundSize: `${(GRID_COLS / cell.colSpan) * 100}% ${(GRID_ROWS / cell.rowSpan) * 100}%`,
    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
    backgroundRepeat: 'no-repeat',
  }
}

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
    <section id="sobre" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-[8%]">
      <Reveal>
        <h2 className="text-center text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-text-primary mb-14 md:mb-18 lg:mb-22">
          Sobre Mim
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.25fr] gap-14 lg:gap-18 items-start">
        <div className="max-w-[44rem]">
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-8">
              Freelancer Full-stack
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6">
              Sou Rafael Vieira, desenvolvedor full-stack focado em criar produtos digitais
              com equilibrio entre estrategia, estetica e performance.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8">
              Atuo desde a definicao da experiencia ate a implementacao final,
              entregando interfaces consistentes e arquiteturas solidas para startups,
              negocios locais e produtos SaaS.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-2.5">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-wider uppercase text-text-tertiary border border-border px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div
            ref={imgRef}
            className="w-full max-w-[44rem]"
          >
            <div
              className="grid grid-cols-5 grid-rows-9 gap-3 md:gap-4 aspect-[4/3]"
              role="img"
              aria-label="Foto de Rafael Vieira em composicao mosaico"
            >
              {mosaicCells.map((cell) => (
                <div
                  key={cell.id}
                  className="overflow-hidden rounded-2xl border border-border/80"
                  style={{
                    ...getTileBackgroundStyle(cell),
                    gridColumn: `${cell.colStart} / span ${cell.colSpan}`,
                    gridRow: `${cell.rowStart} / span ${cell.rowSpan}`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
