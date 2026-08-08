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
              <h3 className="font-display text-base font-semibold text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
                  >
                    {skill.icon ? <skill.icon className="text-indigo-300" /> : null}
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
