export interface Project {
  id: string
  name: string
  tags: string[]
  image: string
  link: string
}

export const projects: Project[] = [
  {
    id: 'novu-landing',
    name: 'Novu Landing Page',
    tags: ['React', 'Design', 'Tailwind'],
    image: '/images/projects/novu-landing.svg',
    link: '#',
  },
  {
    id: 'estetica',
    name: 'Sistema Estética',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: '/images/projects/estetica.svg',
    link: '#',
  },
  {
    id: 'agenda',
    name: 'App Agenda',
    tags: ['React', 'TypeScript', 'API REST'],
    image: '/images/projects/agenda.svg',
    link: '#',
  },
  {
    id: 'voga',
    name: 'VOGA',
    tags: ['Next.js', 'Tailwind', 'Full-stack'],
    image: '/images/projects/voga.svg',
    link: '#',
  },
]
