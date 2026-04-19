import { useState, useRef, useEffect, useCallback } from 'react'
import { MotionButton } from './ui/motion-button'
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
            <h3 className="text-2xl md:text-4xl font-extralight tracking-tight text-neutral-900 transition-colors">
              {project.name}
            </h3>
            <div className="flex gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-wider text-neutral-900">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-4">
            {project.link === '#' && (
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-900 hidden md:block">
                VER PROJETO
              </span>
            )}
            <span
              className="text-neutral-900 transition-all duration-300 text-lg"
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
            <div className="accordion-child flex flex-col gap-5 md:pt-1">
              <h4 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900">
                  {project.name}
                </h4>

              <div className="flex flex-col gap-3">
                <p className="text-neutral-900 text-sm md:text-base leading-relaxed">
                  {project.deliverable}
                </p>
                <p className="text-neutral-900 text-sm md:text-base leading-relaxed">
                  {project.context}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                {project.link !== '#' && (
                  <MotionButton
                    label="Ver projeto"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="expand"
                  />
                )}
                <MotionButton
                  label="Quero algo parecido"
                  href={`https://wa.me/5519997026999?text=${encodeURIComponent(
                    `Olá Rafael, vi o projeto ${project.name} no seu portfólio e quero algo parecido.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="expand"
                  classes="w-60"
                  icon={
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.82 11.82 0 0 0 5.66 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.78.99 1.01-3.69-.23-.38a9.44 9.44 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.46-9.3 9.66zm5.2-7.1c-.29-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
                    </svg>
                  }
                />
              </div>
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
        <div className="flex items-baseline gap-4 mb-16 md:mb-20 lg:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-900 select-none">03</span>
          <div className="h-px flex-1 max-w-[3rem] bg-border" />
          <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-neutral-900">
            Projetos
          </h2>
        </div>
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
