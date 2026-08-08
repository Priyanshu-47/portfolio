import { useRef, useState, useCallback } from 'react'
import { Calendar, Boxes, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { sendAvatarCommand } from './Avatar3D'
import { Chip } from './Chip'
import { projects } from '../data/resume'
import type { Project } from '../data/resume'

/* ---------------------------------------------------------------------------
   Single project card — glassmorphism with hover micro-zoom + gradient shift
--------------------------------------------------------------------------- */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  // Shift background gradient position on hover for a dynamic feel
  const gradientStyle = {
    backgroundPosition: hovered ? '60% 40%' : '50% 50%',
    transition: 'background-position 0.5s ease, transform 0.35s ease, box-shadow 0.35s ease',
  }

  return (
    <article
      onMouseEnter={() => {
        setHovered(true)
        sendAvatarCommand({ type: 'point', cardId: project.title })
      }}
      onMouseLeave={() => {
        setHovered(false)
        sendAvatarCommand({ type: 'unpoint' })
      }}
      className="group relative flex h-full w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md transition-all duration-350 sm:w-[380px] sm:p-7"
      style={{
        ...gradientStyle,
        transform: hovered ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: hovered
          ? '0 24px 48px -26px rgba(154, 134, 207, 0.45)'
          : '0 12px 32px -22px rgba(102, 108, 132, 0.25)',
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(233,226,250,0.3) 50%, rgba(251,231,220,0.25) 100%)'
          : 'rgba(255, 255, 255, 0.4)',
      }}
    >
      {/* Top accent line */}
      {project.featured && (
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lavender-deep/60 to-transparent"
          aria-hidden
        />
      )}

      {/* Header: icon + title */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white/50 text-lavender-deep transition-colors duration-300 group-hover:text-peach-deep">
            <Boxes className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-2">{project.title}</h3>
            <p className="text-xs text-slate-500">{project.subtitle}</p>
          </div>
        </div>
        {project.featured && (
          <span className="hidden shrink-0 rounded-full border border-lavender-deep/30 bg-lavender-deep/10 px-3 py-1 font-mono text-[11px] text-lavender-deep sm:inline-flex">
            Featured
          </span>
        )}
      </div>

      {/* Period */}
      <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
        <Calendar className="h-3.5 w-3.5 text-lavender-deep" />
        {project.period}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>

      {/* Highlights — revealed on hover */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: hovered ? '200px' : '0', opacity: hovered ? 1 : 0, marginTop: hovered ? '12px' : '0' }}
      >
        <ul className="space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-peach-deep/80" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech badges */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>

      {/* Action link — visible on hover */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: hovered ? '40px' : '0', opacity: hovered ? 1 : 0, marginTop: hovered ? '12px' : '0' }}
      >
        <a
          href={project.featured ? 'https://github.com/Priyanshu-47' : '#'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-lavender-deep transition-colors hover:text-peach-deep"
        >
          View project <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------------------
   Horizontal carousel with scroll-snap + navigation arrows
--------------------------------------------------------------------------- */
export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = 400
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="projects"
        title="Things I've built."
        description="Enterprise platforms, SaaS products and full-stack apps — shipped with .NET, React and a lot of intentional craft."
      />

      <div className="relative">
        {/* Navigation arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/60 text-ink shadow-lg backdrop-blur-md transition-colors hover:bg-white/80"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/60 text-ink shadow-lg backdrop-blur-md transition-colors hover:bg-white/80"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent" aria-hidden />

        {/* Scrollable track */}
        <Reveal>
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pt-2 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
