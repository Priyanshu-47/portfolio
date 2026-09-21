import { Reveal } from "./Reveal";

const features = [
  {
    label: "FIRST",
    icon: "⬆",
    title: "Full-Stack Expertise",
    description:
      "End-to-end development with .NET, React, AWS — from database schema to pixel-perfect UI.",
  },
  {
    label: "SECOND",
    icon: "✦",
    title: "AI-Accelerated Development",
    description:
      "Cursor AI woven into daily workflow for code generation, debugging, documentation and impact analysis.",
  },
  {
    label: "THIRD",
    icon: "▲",
    title: "Enterprise-Grade Quality",
    description:
      "Secure, scalable applications built for production — Auth0, Salesforce, Appian integrations.",
  },
  {
    label: "FOURTH",
    icon: "◆",
    title: "Long-term Impact",
    description:
      "Building systems that evolve — not just launch. Production support, monitoring, and continuous improvement.",
  },
];

export default function About() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative overflow-hidden">
      <div className="absolute inset-0 riwa-vertical-lines" />

      <div className="container-riwa relative z-10">
        {/* Riwa: label on the RIGHT side */}
        <Reveal>
          <div className="flex justify-end mb-6">
            <div className="section-label">
              the team
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading mb-4">
            The Team
          </h2>
          <h2 className="section-heading section-heading-muted mb-4">
            Behind Your
          </h2>
          <h2 className="section-heading section-heading-muted mb-8">
            Projects.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[var(--color-dark-secondary)] text-lg leading-relaxed max-w-lg mb-16">
            My goal is to combine strategy, design, and technology to create
            experiences that build trust and deliver results.
          </p>
        </Reveal>

        {/* Feature cards — Riwa: 4 cards with FIRST/SECOND/THIRD/FOURTH labels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-[var(--color-dark-card)] border border-white/5 p-6 hover:bg-[var(--color-dark-card-alt)] transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--color-orange)] text-sm">
                    {feature.icon}
                  </span>
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-orange)] uppercase">
                    {feature.label}
                  </span>
                </div>
                <h4 className="font-[var(--font-mono)] text-sm font-medium text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-[var(--color-dark-secondary)] text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
