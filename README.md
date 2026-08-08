# Portfolio — Priyanshu Lodha

A modern, dark-mode portfolio built for a Full Stack Software Engineer.
Stack: **React + Vite + TypeScript + Tailwind CSS v4**.

## Highlights

- Dark-first design with gradient accents, glassmorphism and micro-interactions
- Scroll-reveal animations, scroll-spy nav, scroll progress bar
- Featured **Core Stack** section emphasising `.NET`, **React**, **AWS**, **Python** and **Cursor AI**
- Fully responsive (mobile menu, adaptive grids)

## Getting started

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
```

Production build:

```bash
npm run build      # type-check + build to dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  data/resume.ts         # single source of truth for all content
  hooks/useReveal.ts     # IntersectionObserver scroll-reveal hook
  components/            # section components + shared UI primitives
  App.tsx                # page composition
```
