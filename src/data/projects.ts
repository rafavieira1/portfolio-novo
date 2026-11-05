export interface Project {
  id: string
  name: string
  category: { business: string; solution: string }
  tags: string[]
  images: string[]
  link: string
  /** Texto do botão do link. Padrão: "Ver projeto". */
  linkLabel?: string
  deliverable: string
  context: string
  /** Números de resultado exibidos em destaque no painel aberto. */
  highlights?: { value: string; label: string }[]
  /** Tecnologias usadas, exibidas como etiquetas. */
  stack?: string[]
}

export const projects: Project[] = [
  {
    id: 'voga',
    name: 'VOGA',
    category: { business: 'Salão de beleza', solution: 'Site + agendamento' },
    tags: ['SALÃO DE BELEZA · SITE + AGENDAMENTO'],
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
    link: 'https://vogaestetica.netlify.app',
    deliverable:
      'Site com agendamento online integrado, vitrine de serviços e profissionais, além de painel administrativo para organizar a agenda em tempo real.',
    context:
      'O salão perdia horas por dia respondendo pedidos de horário no WhatsApp e precisava de uma presença digital à altura do posicionamento premium da marca.',
  },
  {
    id: 'gmvision',
    name: 'GM Vision',
    category: { business: 'Painéis de LED', solution: 'Site institucional' },
    tags: ['PAINÉIS DE LED · SITE INSTITUCIONAL'],
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
      '/images/projects/gmvision (1).png',
    ],
    link: 'https://gmvisionco.com',
    deliverable:
      'Site institucional com catálogo de painéis, cases de aplicação, formulário de orçamento e páginas preparadas para SEO técnico do setor.',
    context:
      'O mercado é B2B e competitivo: o cliente precisava de autoridade visual e clareza de informação para gerar leads qualificados vindos de busca orgânica.',
  },
  {
    id: 'chacarald',
    name: 'ChacaraLD',
    category: { business: 'Espaço de eventos', solution: 'Site com reservas' },
    tags: ['ESPAÇO DE EVENTOS · SITE COM RESERVAS'],
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
      '/images/projects/chacarald (1).png',
    ],
    link: 'https://chacara-ld.netlify.app',
    deliverable:
      'Site com galeria imersiva do espaço, apresentação de pacotes, seção de disponibilidade e formulário de reserva direto com o proprietário.',
    context:
      'O cliente recebia muitas dúvidas repetidas sobre datas e valores; o site passou a pré-qualificar o contato, entregando leads prontos para fechar.',
  },
  {
    id: 'beaute',
    name: 'BEAUTE',
    category: { business: 'Salão de beleza', solution: 'Site com agendamento' },
    tags: ['SALÃO DE BELEZA · SITE COM AGENDAMENTO'],
    images: [
      '/images/projects/beautehero.png',
      '/images/projects/beaute (3).png',
      '/images/projects/beaute (4).png',
      '/images/projects/beaute (5).png',
      '/images/projects/beaute (6).png',
      '/images/projects/beaute (7).png',
      '/images/projects/beaute (8).png',
      '/images/projects/beaute (2).png',
    ],
    link: 'https://beautebytati.netlify.app',
    deliverable:
      'Landing page com seções de serviços, equipe e depoimentos, conectada a um fluxo de agendamento com confirmação automática.',
    context:
      'A marca queria um canal próprio de captação que não dependesse de redes sociais e fortalecesse o reconhecimento local como referência no segmento.',
  },
  {
    id: 'advfracaro',
    name: 'Advocacia Fracaro',
    category: { business: 'Advocacia', solution: 'Site institucional' },
    tags: ['ADVOCACIA · SITE INSTITUCIONAL'],
    images: [
      '/images/projects/advfra (1).png',
      '/images/projects/advfra (2).png',
      '/images/projects/advfra (3).png',
      '/images/projects/advfra (4).png',
      '/images/projects/advfra (5).png',
      '/images/projects/advfra (6).png',
    ],
    link: 'https://advocaciafracaro.com.br',
    deliverable:
      'Site institucional com apresentação do escritório, áreas de atuação, perfil dos advogados e formulário de contato para captação de novos clientes.',
    context:
      'O escritório precisava de uma presença digital profissional que transmitisse credibilidade e facilitasse o primeiro contato de potenciais clientes.',
  },
  {
    id: 'veritaessere',
    name: 'Verità Essere',
    category: { business: 'Psicologia', solution: 'Site institucional' },
    tags: ['PSICOLOGIA · SITE INSTITUCIONAL'],
    images: [
      '/images/projects/veritaessere-1.webp',
      '/images/projects/veritaessere-2.webp',
      '/images/projects/veritaessere-3.webp',
      '/images/projects/veritaessere-4.webp',
      '/images/projects/veritaessere-5.webp',
      '/images/projects/veritaessere-6.webp',
    ],
    link: 'https://clinicaveritaessere.com',
    deliverable:
      'Site institucional para psicólogo, com apresentação do profissional, áreas de atuação, explicação de como funciona a psicoterapia, perguntas frequentes e agendamento pelo WhatsApp.',
    context:
      'O psicólogo atende em Medianeira e online e precisava de um canal próprio que transmitisse acolhimento e credibilidade e levasse o paciente direto ao agendamento.',
  },
]
