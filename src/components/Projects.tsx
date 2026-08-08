import { Calendar, Boxes, CheckCircle2 } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'
import { Chip } from './Chip'
import { projects } from '../data/resume'
import type { Project } from '../data/resume'

function ProjectCard({ project, delay }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <SpotlightCard className="h-full">
        <article
          className={`card group relative flex h-full flex-col overflow-hidden p-6 sm:p-7 ${
            project.featured ? 'lg:p-9' : ''
          }`}
        >
          {project.featured && (
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent"
              aria-hidden
            />
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300 transition-colors duration-300 group-hover:text-cyan-300">
                <Boxes className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-xs text-slate-500">{project.subtitle}</p>
              </div>
            </div>
            {project.featured && (
              <span className="hidden rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] text-violet-300 sm:inline-flex">
                Featured
              </span>
            )}
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            {project.period}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

          <ul className="mt-4 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300/80" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </article>
      </SpotlightCard>
    </Reveal>
  )
}

export function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="projects"
        title="Things I've built."
        description="Enterprise platforms, SaaS products and full-stack apps — shipped with .NET, React and a lot of intentional craft."
      />

      <div className="space-y-6">
        <ProjectCard project={featured} />

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
