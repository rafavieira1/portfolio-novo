import { useState } from 'react'
import { projects } from '../data/projects'
import { Reveal } from './ui/Reveal'
import { ProjectImage } from './ui/ProjectImage'

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

      <div
        onMouseLeave={() => setActiveId(null)}
      >
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            {project.link !== '#' ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t border-border py-6 md:py-8 transition-colors hover:border-text-tertiary"
                onMouseEnter={() => !isCoarse && setActiveId(project.id)}
                data-cursor="expand"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <h3 className="text-2xl md:text-4xl font-extralight tracking-tight group-hover:text-text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-wider text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile thumbnail */}
                {isCoarse && (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-16 h-12 object-cover rounded-sm md:hidden"
                    loading="lazy"
                  />
                )}

                <span className="text-text-tertiary group-hover:text-text-primary transition-colors text-lg hidden md:block">
                  →
                </span>
              </a>
            ) : (
              <div
                className="group flex items-center justify-between border-t border-border py-6 md:py-8"
                onMouseEnter={() => !isCoarse && setActiveId(project.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <h3 className="text-2xl md:text-4xl font-extralight tracking-tight text-text-primary/90">
                    {project.name}
                  </h3>
                  <div className="flex gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-wider text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary hidden md:block">
                  Em breve
                </span>
              </div>
            )}
          </Reveal>
        ))}

        {/* Last border */}
        <div className="border-t border-border" />
      </div>

      {/* Cursor-follow image (desktop only) */}
      {!isCoarse && activeProject && (
        <ProjectImage
          src={activeProject.image}
          alt={activeProject.name}
          isVisible={!!activeId}
        />
      )}
    </section>
  )
}
