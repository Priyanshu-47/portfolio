import { Reveal } from "./Reveal";
import { skillGroups } from "../data/resume";

export default function Skills() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label mb-6">
            <span className="section-label-number">06</span>
            skills & tools
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading mb-4">
            Tech <span className="section-heading-muted">Stack</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1}>
              <div>
                <h4 className="font-[var(--font-mono)] text-sm text-[var(--color-orange)] mb-4 uppercase">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.label}
                      className="riwa-btn riwa-btn-outline text-xs py-2 px-3"
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
