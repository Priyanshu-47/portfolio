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
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl text-indigo-300 transition-colors duration-300 group-hover:text-cyan-300">
                  <tech.icon />
                </span>
                <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{tech.name}</h3>
              <p className="mt-1 font-mono text-xs text-indigo-300/90">{tech.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{tech.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tech.usage.map((u) => (
                  <span
                    key={u}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400"
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
