import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { projects, type Project } from '../data/projects'
import { automacoes, projetosProprios } from '../data/automacoes'
import { ProjectImage } from './ui/ProjectImage'
import { Reveal } from './ui/Reveal'

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
  }, [current, go, images.length])

  const goPrev = useCallback(() => {
    go((current - 1 + images.length) % images.length, -1)
  }, [current, go, images.length])

  useEffect(() => {
    timerRef.current = setTimeout(goNext, 7000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, goNext])

  useEffect(() => {
    if (prev === null) return

    const incoming = currentRef.current
    const outgoing = prevRef.current
    if (!incoming || !outgoing) {
      animatingRef.current = false
      return
    }

    const xIn = direction * 60
    gsap.set(incoming, { x: xIn, opacity: 0 })
    gsap.set(outgoing, { x: 0, opacity: 1 })

    gsap.to(outgoing, { x: -xIn, opacity: 0, duration: 0.45, ease: 'power2.inOut' })
    gsap.to(incoming, {
      x: 0,
      opacity: 1,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        animatingRef.current = false
        setPrev(null)
      },
    })
  }, [direction, prev])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          ref={prevRef}
          src={images[prev]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <img
        key={`curr-${current}`}
        ref={currentRef}
        src={images[current]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={prev === null ? {} : { opacity: 0 }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Imagem anterior"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Próxima imagem"
          >
            ›
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                go(i, i > current ? 1 : -1)
              }}
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
  project: Project
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
      return
    }

    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
      overwrite: 'auto',
    })
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
          className="group flex w-full flex-col gap-4 py-5 text-left transition-colors hover:border-text-tertiary sm:py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:py-8"
          data-cursor="expand"
          aria-expanded={open}
          onMouseEnter={() => !open && onMouseEnter()}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
            <h3 className="text-2xl font-extralight tracking-tight text-neutral-900 transition-colors sm:text-3xl lg:text-4xl">
              {project.name}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-wider text-neutral-900">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="ml-0 flex shrink-0 items-center gap-4 self-start lg:ml-4 lg:self-center">
            <span
              className="inline-block text-lg text-neutral-900 transition-all duration-300"
              style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
            >
              +
            </span>
          </div>
        </button>

        <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
          <div
            ref={innerRef}
            className="grid grid-cols-1 items-start gap-6 pb-8 sm:pb-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10"
          >
            <div className="accordion-child">
              {open && <Carousel images={project.images} />}
            </div>

            <div className="accordion-child flex flex-col gap-5 lg:pt-1">
              <h4 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
                {project.name}
              </h4>

              <div className="flex flex-col gap-3">
                <p className="text-sm leading-relaxed text-neutral-900 md:text-base">
                  {project.deliverable}
                </p>
                <p className="text-sm leading-relaxed text-neutral-900 md:text-base">
                  {project.context}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="flex flex-col">
                      <span className="text-3xl font-extralight tracking-tight text-neutral-900 md:text-4xl">
                        {h.value}
                      </span>
                      <span className="text-xs text-text-secondary md:text-sm">{h.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {project.stack && project.stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-text-secondary/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-neutral-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.link !== '#' && (
                <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="expand"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:w-auto"
                  >
                    {project.linkLabel ?? 'Ver projeto'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ProjectList({
  id,
  number,
  title,
  intro,
  items,
}: {
  id: string
  number: string
  title: string
  intro?: string
  items: Project[]
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const updatePointerMode = () => setIsCoarse(mediaQuery.matches)

    updatePointerMode()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePointerMode)
      return () => mediaQuery.removeEventListener('change', updatePointerMode)
    }

    mediaQuery.addListener(updatePointerMode)
    return () => mediaQuery.removeListener(updatePointerMode)
  }, [])

  const visible = items.filter((item) => item.images.length > 0)
  const activeProject = visible.find((project) => project.id === activeId)

  if (visible.length === 0) return null

  return (
    <section id={id} className="px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-[6%] xl:px-[8%] 2xl:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:mb-14 md:mb-16 lg:mb-20 2xl:mb-24">
            <div className="flex items-baseline gap-4">
              <span className="select-none text-xs uppercase tracking-[0.3em] text-neutral-900">{number}</span>
              <div className="h-px max-w-[3rem] flex-1 bg-border" />
              <h2 className="text-[clamp(2.2rem,5.2vw,4.8rem)] font-light tracking-tight text-neutral-900">
                {title}
              </h2>
            </div>
            {intro && (
              <p className="max-w-[52rem] text-base leading-relaxed text-text-secondary sm:text-[1.05rem] md:text-lg">
                {intro}
              </p>
            )}
          </div>
        </Reveal>

        <div>
          {visible.map((project, index) => (
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
      </div>
    </section>
  )
}

export function Automations() {
  return (
    <ProjectList
      id="automacoes"
      number="03"
      title="Automações e IA"
      intro="Sistemas que desenvolvi na SafeWork, empresa de saúde e segurança do trabalho, e que estão em uso pela equipe e pelos clientes. Nas imagens, nomes e documentos aparecem desfocados ou com dados de teste."
      items={automacoes}
    />
  )
}

export function OwnProjects() {
  return <ProjectList id="projetos-proprios" number="04" title="Projetos próprios" items={projetosProprios} />
}

export function Projects() {
  const temProprios = projetosProprios.some((p) => p.images.length > 0)
  return (
    <ProjectList id="projetos" number={temProprios ? '05' : '04'} title="Sites para clientes" items={projects} />
  )
}
