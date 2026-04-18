# AGENTS

Quick operating guide for AI coding agents in this repository.

## Project Snapshot

- Stack: React 19 + TypeScript + Vite 8 + Tailwind CSS v4.
- Animation core: GSAP + ScrollTrigger + Lenis.
- App type: Single-page portfolio with section-based layout.

## Runbook

- Install: `npm install`
- Dev server: `npm run dev`
- Production build (includes TS build): `npm run build`
- Lint: `npm run lint`
- Preview production build: `npm run preview`

## Architecture Map

- App entry: [src/main.tsx](src/main.tsx)
- Root composition + Lenis/GSAP bridge: [src/App.tsx](src/App.tsx)
- Page sections: [src/components](src/components)
- Reusable animation UI primitives: [src/components/ui](src/components/ui)
- Project content source: [src/data/projects.ts](src/data/projects.ts)
- Global theme and base styles: [src/styles/index.css](src/styles/index.css)
- GSAP context helper: [src/hooks/useGsap.ts](src/hooks/useGsap.ts)
- Lenis singleton access: [src/hooks/useLenis.ts](src/hooks/useLenis.ts)

## Conventions To Follow

- Keep section-level components in [src/components](src/components) and shared motion primitives in [src/components/ui](src/components/ui).
- Use [src/hooks/useGsap.ts](src/hooks/useGsap.ts) for GSAP lifecycle-safe setup and cleanup in components.
- Do not create a second Lenis instance; use the app-level instance initialized in [src/App.tsx](src/App.tsx).
- When adding/editing project cards, update [src/data/projects.ts](src/data/projects.ts) and ensure matching assets exist under [public/images/projects](public/images/projects).
- Interactive elements intended to trigger cursor expansion should include `data-cursor="expand"`.

## Motion and Device Constraints

- Mobile/touch behavior is intentionally simplified: cursor-follow and hover-heavy effects should remain disabled on coarse pointers.
- Respect reduced-motion behavior already implemented in reveal/split-text patterns.

## Pitfalls

- If `npm run dev` fails, check dependency install status first (`npm install`) and then rerun.
- This project currently has no test runner configured; rely on lint + build for baseline validation.
- `README.md` is template-oriented; prefer project-specific references below for implementation details.

## Reference Docs

- Portfolio design specification: [docs/superpowers/specs/2026-04-09-portfolio-design.md](docs/superpowers/specs/2026-04-09-portfolio-design.md)
- Tooling template notes: [README.md](README.md)
