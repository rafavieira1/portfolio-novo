import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { projects } from '../data/projects'
import { Reveal } from './ui/Reveal'
import { ProjectImage } from './ui/ProjectImage'

function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)
  const currentRef = useRef<HTMLImageElement>(null)
  const prevRef = useRef<HTMLImageElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animatingRef = useRef(false)

  const go = useCallback((next: number, dir: 1 | -1) => {
    if (animatingRef.current || next === current) return
    animatingRef.current = true
    setDirection(dir)
    setPrev(current)
    setCurrent(next)
  }, [current])

  const goNext = useCallback(() => {
    go((current + 1) % images.length, 1)
  }, [current, images.length, go])

  const goPrev = useCallback(() => {
    go((current - 1 + images.length) % images.length, -1)
  }, [current, images.length, go])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(goNext, 7000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, goNext])

  // GSAP transition when prev changes
  useEffect(() => {
    if (prev === null) return
    const incoming = currentRef.current
    const outgoing = prevRef.current
    if (!incoming || !outgoing) { animatingRef.current = false; return }

    const xIn = direction * 60
    gsap.set(incoming, { x: xIn, opacity: 0 })
    gsap.set(outgoing, { x: 0, opacity: 1 })

    gsap.to(outgoing, { x: -xIn, opacity: 0, duration: 0.45, ease: 'power2.inOut' })
    gsap.to(incoming, {
      x: 0, opacity: 1, duration: 0.45, ease: 'power2.inOut',
      onComplete: () => {
        animatingRef.current = false
        setPrev(null)
      },
    })
  }, [prev, direction])

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border bg-surface">
      {/* Previous slide (outgoing) */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          ref={prevRef}
          src={images[prev]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Current slide (incoming) */}
      <img
        key={`curr-${current}`}
        ref={currentRef}
        src={images[current]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={prev === null ? {} : { opacity: 0 }}
      />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary hover:text-text-primary hover:bg-surface transition-colors backdrop-blur-sm"
            aria-label="Imagem anterior"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary hover:text-text-primary hover:bg-surface transition-colors backdrop-blur-sm"
            aria-label="Próxima imagem"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); go(i, i > current ? 1 : -1) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-4 bg-text-primary' : 'w-1.5 bg-text-tertiary/60'}`}
              aria-label={`Ir para imagem ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectRow({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
}: {
  project: typeof projects[0]
  index: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const inner = innerRef.current
    if (!panel || !inner) return

    if (open) {
      gsap.set(panel, { height: 'auto', opacity: 1 })
      gsap.from(panel, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      gsap.from(inner.querySelectorAll('.accordion-child'), {
        opacity: 0,
        y: 14,
        duration: 0.35,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.1,
        overwrite: 'auto',
      })
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        overwrite: 'auto',
      })
    }
  }, [open])

  return (
    <Reveal delay={index * 0.08}>
      <div className="border-t border-border">
        <button
          onClick={() => {
            const next = !open
            setOpen(next)
            if (next) onMouseLeave()
          }}
          className="group w-full flex items-center justify-between py-6 md:py-8 text-left transition-colors hover:border-text-tertiary"
          data-cursor="expand"
          aria-expanded={open}
          onMouseEnter={() => !open && onMouseEnter()}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <h3 className="text-2xl md:text-4xl font-extralight tracking-tight text-text-primary/90 group-hover:text-text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-wider text-text-tertiary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-4">
            {project.link === '#' && (
              <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary hidden md:block">
                Em breve
              </span>
            )}
            <span
              className="text-text-tertiary group-hover:text-text-primary transition-all duration-300 text-lg"
              style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.3s ease' }}
            >
              +
            </span>
          </div>
        </button>

        {/* Accordion panel */}
        <div
          ref={panelRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div ref={innerRef} className="pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-10 items-start">
            {/* Carousel */}
            <div className="accordion-child">
              {open && <Carousel images={project.images} />}
            </div>

            {/* Description */}
            <div className="accordion-child flex flex-col gap-4 md:pt-1">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wider uppercase text-text-tertiary border border-border px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  data-cursor="expand"
                >
                  Ver projeto <span>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = projects.find((p) => p.id === activeId)
  const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  return (
    <section id="projetos" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-[8%]">
      <Reveal>
        <p className="text-xs tracking-[0.2em] uppercase text-text-tertiary mb-12">
          Projetos
        </p>
      </Reveal>

      <div>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onMouseEnter={() => !isCoarse && setActiveId(project.id)}
            onMouseLeave={() => !isCoarse && setActiveId(null)}
          />
        ))}
        <div className="border-t border-border" />
      </div>

      {!isCoarse && activeProject && (
        <ProjectImage
          src={activeProject.images[0]}
          alt={activeProject.name}
          isVisible={!!activeId}
        />
      )}
    </section>
  )
}
