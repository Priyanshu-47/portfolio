import { Reveal } from "./Reveal";
import { experience } from "../data/resume";

export default function Experience() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label mb-6">
            <span className="section-label-number">05</span>
            experience
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading mb-4">
            Work <span className="section-heading-muted">History</span>
          </h2>
        </Reveal>

        <div className="mt-12">
          {experience.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group border-b border-white/5 py-8 flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="md:w-48 shrink-0">
                  <span className="font-mono text-[var(--color-orange)] text-sm">
                    {exp.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-white mb-1 group-hover:text-[var(--color-orange)] transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-[var(--color-orange)] text-sm font-medium mb-3 font-mono">
                    {exp.company}
                  </p>
                  <ul className="text-[var(--color-dark-secondary)] text-sm leading-relaxed max-w-2xl space-y-1">
                    {exp.highlights.slice(0, 3).map((highlight, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-[var(--color-orange)] mt-1.5 shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono text-[var(--color-dark-muted)] border border-white/5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
