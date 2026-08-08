import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { skillGroups } from '../data/resume'

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="skills"
        title="Tools I command."
        description="A pragmatic toolkit — deep on the backend, fluent on the frontend, and comfortable across the cloud."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 60} className="h-full">
            <div className="card card-hover h-full p-6">
              <h3 className="font-display text-base font-semibold text-ink-2">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/40 px-3 py-1.5 text-xs text-slate-600 backdrop-blur-sm transition-colors hover:border-lavender-deep/50 hover:bg-white/60 hover:text-ink-2"
                  >
                    {skill.icon ? <skill.icon className="text-lavender-deep" /> : null}
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
