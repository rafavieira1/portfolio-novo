# Portfolio Pessoal — Design Spec

## Contexto

Portfolio pessoal para Rafael Vieira, freelancer full-stack, com o objetivo de atrair clientes. O site deve transmitir sofisticação, competência técnica e atenção ao detalhe através de um design dark minimal com animações imersivas.

## Stack

- **Build**: Vite
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animação**: GSAP + ScrollTrigger + Lenis (smooth scroll)
- **Idioma**: Português (BR)
- **Deploy target**: Vercel (static build)

## Estilo Visual

- **Tema**: Dark minimal, fundo `#0a0a0a`
- **Paleta**: Monocromática — `#0a0a0a` (bg), `#111` (surfaces), `#ffffff` (texto primário), `#888` (texto secundário), `#555` (texto terciário), `#1a1a1a` (bordas)
- **Tipografia**: Inter (Google Fonts), weight 200 para headings, 400 para body, 300 para texto intermediário
- **Espaçamento**: Generoso — seções com padding vertical grande (120-160px)
- **Detalhes**: Linhas finas como separadores, letras maiúsculas com letter-spacing para labels

## Estrutura da Página (Single Page)

### 1. Navbar
- Logo "RV" à esquerda (lettering com letter-spacing)
- Links de navegação à direita: Sobre, Projetos, Contato
- Magnetic hover nos links (GSAP)
- Fixed no topo, background transparente que ganha blur ao scroll
- Hamburger menu no mobile

### 2. Hero
- Layout tipográfico alinhado à esquerda
- Label superior: "Freelancer Full-stack" (uppercase, letter-spacing, cor terciária)
- Heading grande (font-weight 200, ~5-6rem desktop): texto impactante em 2-3 linhas
- Uma palavra em itálico para contraste visual
- Linha horizontal fina como elemento decorativo
- Indicador de scroll no canto inferior
- **Animação**: Text split — letras/palavras aparecem com stagger usando GSAP SplitText ou implementação custom

### 3. Sobre
- Texto de apresentação pessoal (2-3 parágrafos curtos)
- Foto ou avatar ao lado com parallax suave (GSAP ScrollTrigger)
- Lista de tecnologias/skills como tags minimalistas (opcional)
- **Animação**: Fade-in + slide-up ao scroll, parallax na imagem

### 4. Projetos
- Lista vertical de projetos, cada um como uma row com:
  - Nome do projeto (font-size grande, weight 200)
  - Tags de tecnologia (pequeno, cor terciária)
  - Seta → à direita
  - Borda top sutil como separador
- **Animação principal**: No hover, imagem do projeto aparece e segue o cursor (GSAP quickTo)
- **Animação secundária**: Stagger animation — projetos entram um a um ao scroll
- Link para o projeto real ou case study (pode ser externo)

### 5. Contato
- Heading grande tipo "Vamos trabalhar juntos?" ou similar
- Email clicável como elemento central
- Links sociais: GitHub, LinkedIn (ícones minimalistas)
- **Animação**: Text reveal ao scroll

### 6. Footer
- Minimalista — linha de copyright + ano
- Links de navegação repetidos (opcional)

## Animações — Especificação Técnica

### Smooth Scroll (Lenis)
- Inicializar Lenis no root da app
- Integrar com GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Duração: 1.2, easing suave

### Custom Cursor
- Dot branco pequeno (~8px) que segue o mouse com lerp suave
- No hover de links/projetos: expande para ~40px com transição
- No hover de projetos: pode adicionar texto "Ver" dentro
- Esconder em mobile (touch devices)

### Text Split (Hero)
- Dividir heading em caracteres ou palavras
- Animar cada elemento com stagger (0.02-0.05s entre cada)
- Propriedades: opacity 0→1, y 20→0
- Timeline: inicia após page load com delay de 0.3s

### Scroll Reveal (Global)
- Componente reutilizável `<Reveal>` que wrapa conteúdo
- ScrollTrigger: start "top 85%", toggleActions "play none none none"
- Propriedades: opacity 0→1, y 30→0, duration 0.8

### Magnetic Buttons
- Links/botões que "atraem" levemente na direção do cursor quando próximo
- Raio de atração: ~100px
- Intensidade: ~30% da distância
- Usar GSAP quickTo para suavidade

### Image Reveal (Projetos)
- Imagem do projeto que aparece ao lado do cursor no hover da row
- Posição: segue mouse com GSAP quickTo (lerp suave)
- Entrada: scale 0.8→1, opacity 0→1
- Saída: opacity 1→0
- Tamanho da imagem: ~350x250px

### Grain/Noise Overlay
- Canvas ou SVG com noise texture
- Opacity muito baixa (~3-5%)
- Fixed position, cobrindo toda a viewport
- Pointer-events: none
- Animação sutil de "flicker" (reposition a cada frame)

### Parallax (Sobre)
- Imagem com velocidade de scroll diferente do texto
- ScrollTrigger com scrub: true
- Deslocamento: ~50-80px

## Estrutura de Arquivos

```
src/
├── main.tsx                  # Entry point
├── App.tsx                   # Root component + Lenis setup
├── styles/
│   └── index.css             # Tailwind imports + global styles + grain
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── CustomCursor.tsx
│   └── ui/
│       ├── Reveal.tsx        # Scroll reveal wrapper
│       ├── MagneticButton.tsx
│       ├── SplitText.tsx     # Text split animation
│       └── ProjectImage.tsx  # Hover image follower
├── data/
│   └── projects.ts           # Array de projetos (nome, tech, imagem, link)
└── hooks/
    ├── useGsap.ts            # GSAP context cleanup helper
    └── useLenis.ts           # Lenis instance access
```

## Responsividade

- **Desktop**: Layout completo com todas as animações
- **Tablet**: Layout adaptado, animações mantidas (exceto cursor custom)
- **Mobile**: Layout single-column, animações simplificadas (sem cursor custom, sem image follow no hover — projetos mostram thumbnail inline), smooth scroll mantido

## Performance

- Lazy load de imagens dos projetos
- GSAP animations com `will-change` apenas durante animação
- Grain overlay com `requestAnimationFrame` throttled
- Lenis com `raf` integrado ao GSAP ticker (evitar duplo RAF)
- Target: Lighthouse 90+ em performance
