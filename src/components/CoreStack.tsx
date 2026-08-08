import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { coreStack } from '../data/resume'

export function CoreStack() {
  return (
    <section id="stack" className="section">
      <SectionHeading
        eyebrow="core stack"
        title="My everyday arsenal."
        description="The five tools I reach for daily to take products from idea to production — each one proven across my enterprise work, internships and side projects."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreStack.map((tech, i) => (
          <Reveal key={tech.name} delay={i * 70} className="h-full">
            <article className="card card-hover group h-full p-6">
              <div
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-lavender-deep/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/40 bg-white/50 text-2xl text-lavender-deep transition-colors duration-300 group-hover:text-peach-deep">
                  <tech.icon />
                </span>
                <span className="font-mono text-xs text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink-2">{tech.name}</h3>
              <p className="mt-1 font-mono text-xs text-lavender-deep/90">{tech.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tech.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tech.usage.map((u) => (
                  <span
                    key={u}
                    className="rounded-md border border-white/40 bg-white/50 px-2 py-0.5 text-[11px] text-slate-600"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
