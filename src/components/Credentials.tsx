import { Reveal } from "./Reveal";
import { certifications, education } from "../data/resume";

export default function Credentials() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label section-label-dark mb-6">
            ● 08 CREDENTIALS
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading text-[var(--color-dark-text)] mb-16">
            Education &{" "}
            <span className="riwa-gradient-text">Certs</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <Reveal>
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--color-dark-text)] mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="riwa-card p-5">
                    <h4 className="font-display font-semibold text-[var(--color-dark-text)] mb-1">
                      {edu.degree || edu.school}
                    </h4>
                    <p className="text-[var(--color-accent)] text-sm mb-1">
                      {edu.school}
                    </p>
                    <p className="text-[var(--color-dark-muted)] text-xs font-mono">
                      {edu.period} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.2}>
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--color-dark-text)] mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="riwa-card p-5"
                  >
                    <h4 className="font-display font-semibold text-[var(--color-dark-text)] mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-[var(--color-accent)] text-sm mb-1">
                      {cert.issuer}
                    </p>
                    {cert.period && (
                      <p className="text-[var(--color-dark-muted)] text-xs font-mono">
                        {cert.period}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="riwa-divider">
          <div />
          <div />
        </div>
      </div>
    </section>
  );
}
