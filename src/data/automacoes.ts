import type { Project } from './projects'

const img = (nome: string) => `/images/automacoes/${nome}.webp`

/**
 * Automações desenvolvidas na SafeWork (saúde e segurança do trabalho).
 * Prints tirados da plataforma em produção, com nomes, telefones, CPFs e CNPJs desfocados
 * ou com a empresa de teste. Nunca citar clientes ou colegas nos textos.
 */
export const automacoes: Project[] = [
  {
    id: 'bot-agendamento',
    name: 'Bot de agendamento',
    category: { business: 'Saúde ocupacional', solution: 'Agente de IA no WhatsApp' },
    tags: ['AGENTE DE IA · WHATSAPP'],
    images: [img('bot-whatsapp'), img('bot-dashboard')],
    link: '#',
    deliverable:
      'A empresa cliente agenda o exame ocupacional do funcionário conversando no WhatsApp. O agente confere a empresa e o funcionário no ERP do setor, mostra as datas livres e grava o agendamento direto no sistema, sem ninguém da equipe digitar nada.',
    context:
      'Quando um dado não confere, como um CPF fora do cadastro, ele explica o motivo e oferece falar com a equipe. Um painel mostra as conversas, os agendamentos e o custo mensal do WhatsApp.',
    highlights: [
      { value: '1.199', label: 'agendamentos feitos pelo bot' },
      { value: '1.279', label: 'conversas atendidas' },
    ],
    stack: ['n8n', 'OpenAI', 'WhatsApp Cloud API', 'SOAP', 'Supabase'],
  },
  {
    id: 'prospeccao',
    name: 'Prospecção com IA',
    category: { business: 'Comercial B2B', solution: 'Agente de IA no WhatsApp' },
    tags: ['AGENTE DE IA · PROSPECÇÃO B2B'],
    images: [img('prospeccao-visao-geral'), img('prospeccao-funil')],
    link: '#',
    deliverable:
      'Aborda empresas pelo WhatsApp, conduz a conversa com um agente de IA e transfere as interessadas para o time comercial. A IA entra só nos pontos de decisão; o restante segue regras fixas.',
    context:
      'Antes do envio, cada CNPJ é validado na Receita Federal, o que descartou 23,8% de uma base de 49 mil empresas. Um filtro identifica respostas de outros robôs, que eram 42% das primeiras respostas, antes de acionar o modelo.',
    highlights: [
      { value: '635', label: 'empresas abordadas' },
      { value: '18', label: 'transferidas ao comercial em 19 dias' },
    ],
    stack: ['n8n', 'OpenAI', 'WhatsApp Cloud API', 'Supabase'],
  },
  {
    id: 'agendamento-exames',
    name: 'Agendamento de exames',
    category: { business: 'Saúde ocupacional', solution: 'Site e painel em tempo real' },
    tags: ['SITE + PAINEL EM TEMPO REAL'],
    images: [
      img('agendamento-site'),
      img('agendamento-formulario'),
      img('agendamento-email'),
      img('agendamento-painel'),
      img('agendamento-kanban'),
    ],
    link: 'https://agendar.safehelp.com.br',
    linkLabel: 'Ver site',
    deliverable:
      'A empresa cliente pede o exame pelo site e a equipe agenda num painel Kanban em tempo real. O solicitante recebe e-mails automáticos e acompanha o pedido por um link.',
    context:
      'Substituiu duas ferramentas pagas. As regras de cada etapa e de acesso ficam no próprio banco de dados, e os primeiros pedidos reais chegaram 8 dias depois do início do desenvolvimento.',
    highlights: [
      { value: '+4 mil', label: 'pedidos de cerca de 480 empresas' },
      { value: '9 em 10', label: 'agendados em até 48 horas' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Edge Functions', 'Resend'],
  },
  {
    id: 'engenharia',
    name: 'Engenharia de segurança',
    category: { business: 'Segurança do trabalho', solution: 'App de campo e robô no ERP' },
    tags: ['APP DE CAMPO · ROBÔ NO ERP'],
    images: [img('engenharia-visao-geral'), img('engenharia-caracterizacao'), img('engenharia-celular')],
    link: '#',
    deliverable:
      'O técnico de segurança monta os grupos de exposição e caracteriza os riscos de cada empresa pela plataforma, inclusive pelo celular durante a visita.',
    context:
      'Um robô grava tudo no ERP do setor, que não oferece API para essa parte, combinando os webservices do sistema com automação de navegador. Um grupo com 48 riscos, antes cadastrado à mão, fica pronto em cerca de 7 minutos. O módulo está em validação com a equipe.',
    highlights: [{ value: '~7 min', label: 'para cadastrar 48 riscos no ERP' }],
    stack: ['React', 'Node.js', 'Playwright', 'SOAP', 'Supabase'],
  },
  {
    id: 'convocacao',
    name: 'Convocação de exames',
    category: { business: 'Saúde ocupacional', solution: 'Aviso e resposta por botão' },
    tags: ['WHATSAPP · RESPOSTA POR BOTÃO'],
    images: [img('convocacao')],
    link: '#',
    deliverable:
      'Todos os dias, as empresas com exames vencendo recebem um aviso no WhatsApp. Desenvolvi a parte que trata a resposta: com um toque, a empresa segue para o bot de agendamento ou para a equipe.',
    context:
      'Na primeira rodada, metade das respostas era só um cumprimento. Troquei a leitura do texto por botões, e o caminho passou a ser escolhido pelo próprio cliente. Uma tela mostra quem recebeu, quem respondeu e quem agendou.',
    stack: ['n8n', 'WhatsApp Cloud API', 'Supabase', 'React'],
  },
  {
    id: 'plataforma',
    name: 'Plataforma de automações',
    category: { business: 'SafeWork', solution: 'Acesso único e módulos por área' },
    tags: ['ACESSO ÚNICO · 5 MÓDULOS'],
    images: [img('plataforma-inicio'), img('demandas-quadro')],
    link: '#',
    deliverable:
      'Todas as automações acima ficam numa plataforma que desenvolvi do zero, com acesso único e um módulo por área da empresa: bot, prospecção, agendamento, engenharia e demandas.',
    context:
      'O módulo de Demandas centraliza os pedidos internos: cada pedido vira uma tarefa com prazo, e a que atrasa avisa o gestor automaticamente. O código tem mais de 1.700 testes automatizados, escritos junto com cada funcionalidade no Claude Code e no Codex.',
    highlights: [
      { value: '5', label: 'módulos em produção' },
      { value: '+1.700', label: 'testes automatizados' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Netlify Functions', 'GitHub Actions'],
  },
]

/** Projetos próprios. A seção só aparece quando algum item tem imagens. */
export const projetosProprios: Project[] = [
  {
    id: 'trafego-ia',
    name: 'Tráfego pago com IA',
    category: { business: 'Projeto próprio', solution: 'MCP do Meta Ads' },
    tags: ['MCP DO META ADS · CAMPANHAS'],
    images: [img('mcp-resposta'), img('mcp-chamadas'), img('trafego-gerenciador')],
    link: '#',
    deliverable:
      'Gerencio campanhas no Meta Ads para negócios locais. Para analisar os resultados mais rápido, criei um servidor MCP que conecta o Claude à API de Marketing da Meta.',
    context:
      'Com ele, o Claude consulta contas, campanhas, criativos, públicos e métricas em linguagem natural e responde perguntas como quais anúncios trouxeram o menor custo por resultado.',
    highlights: [
      { value: '227', label: 'conversas no WhatsApp em 7 campanhas de uma cliente' },
      { value: 'R$ 5,10', label: 'custo médio por conversa' },
    ],
    stack: ['MCP', 'Node.js', 'Meta Marketing API', 'Claude'],
  },
]
