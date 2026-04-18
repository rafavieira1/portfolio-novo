export interface Project {
  id: string
  name: string
  tags: string[]
  images: string[]
  link: string
  description: string
}

export const projects: Project[] = [
  {
    id: 'voga',
    name: 'VOGA',
    tags: ['Next.js', 'Tailwind', 'Full-stack'],
    images: [
      '/images/projects/vogahero.png',
      '/images/projects/voga (2).png',
      '/images/projects/voga (3).png',
      '/images/projects/voga (4).png',
      '/images/projects/voga (5).png',
      '/images/projects/voga (6).png',
      '/images/projects/voga (7).png',
      '/images/projects/voga (8).png',
      '/images/projects/voga (9).png',
      '/images/projects/voga (10).png',
    ],
    link: '#',
    description: 'Plataforma e-commerce de moda com catálogo dinâmico, carrinho persistente, checkout integrado e painel de administração para gestão de produtos e pedidos.',
  },
  {
    id: 'gmvision',
    name: 'GM Vision',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    images: [
      '/images/projects/gmvisionhero.png',
      '/images/projects/gmvision (4).png',
      '/images/projects/gmvision (5).png',
      '/images/projects/gmvision (6).png',
      '/images/projects/gmvision (7).png',
      '/images/projects/gmvision (8).png',
      '/images/projects/gmvision (9).png',
      '/images/projects/gmvision (10).png',
      '/images/projects/gmvision (11).png',
      '/images/projects/gmvision (12).png',
      '/images/projects/gmvision (13).png',
      '/images/projects/gmvision (1).png'
    ],
    link: '#',
    description: 'Sistema completo de gestão para clínicas de estética: agendamento online, controle de clientes, histórico de procedimentos e painel administrativo com relatórios.',
  },
  {
    id: 'chacarald',
    name: 'ChacaraLD',
    tags: ['React', 'TypeScript', 'API REST'],
    images: [
      '/images/projects/chacaraldhero.png',
      '/images/projects/chacarald (3).png',
      '/images/projects/chacarald (4).png',
      '/images/projects/chacarald (5).png',
      '/images/projects/chacarald (6).png',
      '/images/projects/chacarald (7).png',
      '/images/projects/chacarald (8).png',
      '/images/projects/chacarald (9).png',
      '/images/projects/chacarald (10).png',
      '/images/projects/chacarald (11).png',
      '/images/projects/chacarald (12).png',
      '/images/projects/chacarald (1).png'
    ],
    link: '#',
    description: 'Site institucional para espaço de eventos rurais: galeria de fotos, seção de pacotes, formulário de orçamento e design que transmite a essência do local.',
  },
  {
    id: 'beaute',
    name: 'BEAUTE',
    tags: ['React', 'Design', 'Tailwind'],
    images: [
      '/images/projects/beautehero.png',
      '/images/projects/beaute (3).png',
      '/images/projects/beaute (4).png',
      '/images/projects/beaute (5).png',
      '/images/projects/beaute (6).png',
      '/images/projects/beaute (7).png',
      '/images/projects/beaute (8).png',
      '/images/projects/beaute (2).png'
    ],
    link: '#',
    description: 'Landing page de alta conversão com animações fluidas, seções de features, depoimentos e integração com formulário. Foco em performance e design responsivo para maximizar leads.',
  },
]
