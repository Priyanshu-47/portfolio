import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { profile, experience, education, certifications } from "../data/resume";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-light-bg)] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 riwa-grid-bg-light opacity-30" />
        <motion.div
          className="absolute top-24 left-24 riwa-star riwa-star-large"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>

        <div className="container-riwa relative z-10">
          <Reveal>
            <div className="section-label section-label-light mb-6">
              ● ABOUT ME
            </div>
          </Reveal>
          <Reveal>
            <h1 className="section-heading section-heading-light mb-6">
              The Person Behind{" "}
              <span className="riwa-gradient-text">the Code</span>
            </h1>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="riwa-divider riwa-divider-light">
            <div />
            <div />
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-[var(--color-light-bg)] py-20">
        <div className="container-riwa">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-light-text)] mb-6">
                  {profile.name}
                </h2>
                <p className="text-[var(--color-light-secondary)] text-lg leading-relaxed mb-8">
                  {profile.summary}
                </p>
                <p className="text-[var(--color-light-secondary)] text-base leading-relaxed mb-8">
                  {profile.summaryExtra}
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-light-muted)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                {[
                  { label: "Email", value: profile.email },
                  { label: "Role", value: profile.role },
                  { label: "Speciality", value: "Full-Stack Development" },
                  { label: "Availability", value: "Open to opportunities" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center border-b border-[var(--color-light-border)] pb-4"
                  >
                    <span className="text-xs font-[var(--font-mono)] text-[var(--color-light-muted)] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[var(--color-light-text)] font-medium text-sm text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-[var(--color-dark-bg)] py-24">
        <div className="container-riwa">
          <Reveal>
            <div className="section-label section-label-dark mb-6">
              ● EXPERIENCE
            </div>
          </Reveal>
          <Reveal>
            <h2 className="section-heading text-[var(--color-dark-text)] mb-16">
              Work <span className="riwa-gradient-text">History</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {experience.map((exp, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group border-b border-[var(--color-dark-border)] py-8 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-48 shrink-0">
                    <span className="font-[var(--font-mono)] text-[var(--color-accent)] text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-dark-text)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-[var(--color-accent)] text-sm font-medium mb-3">
                      {exp.company}
                    </p>
                    <ul className="text-[var(--color-dark-secondary)] text-sm leading-relaxed max-w-2xl space-y-1">
                      {exp.highlights.slice(0, 3).map((highlight, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-[var(--color-accent)] mt-1.5 shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-[var(--font-mono)] text-[var(--color-dark-muted)] border border-[var(--color-dark-border)] rounded"
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

      {/* Education & Certifications */}
      <section className="bg-[var(--color-dark-bg)] py-24">
        <div className="container-riwa">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <div className="section-label section-label-dark mb-6">
                  ● EDUCATION
                </div>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="riwa-card p-6">
                      <h4 className="font-[var(--font-display)] font-semibold text-[var(--color-dark-text)] mb-1">
                        {edu.degree || edu.school}
                      </h4>
                      <p className="text-[var(--color-accent)] text-sm mb-1">
                        {edu.school}
                      </p>
                      <p className="text-[var(--color-dark-muted)] text-xs font-[var(--font-mono)]">
                        {edu.period} · {edu.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <div className="section-label section-label-dark mb-6">
                  ● CERTIFICATIONS
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="riwa-card p-6"
                    >
                      <h4 className="font-[var(--font-display)] font-semibold text-[var(--color-dark-text)] mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-[var(--color-accent)] text-sm mb-1">
                        {cert.issuer}
                      </p>
                      {cert.period && (
                        <p className="text-[var(--color-dark-muted)] text-xs font-[var(--font-mono)]">
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
      </section>

      <Footer />
    </div>
  );
}
