import { Reveal } from "./Reveal";

const testimonials = [
  {
    quote:
      "Exceptional developer who delivered our project ahead of schedule. The code quality and attention to detail were outstanding.",
    author: "Project Collaborator",
    role: "Tech Lead",
  },
  {
    quote:
      "Amazing problem-solving skills and a great team player. Always brings fresh ideas to the table.",
    author: "Team Member",
    role: "Senior Developer",
  },
  {
    quote:
      "Very professional and skilled in both frontend and backend. Would highly recommend for any full-stack project.",
    author: "Client",
    role: "Startup Founder",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label section-label-dark mb-6">
            ● 09 TESTIMONIALS
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading text-[var(--color-dark-text)] mb-16">
            Kind <span className="riwa-gradient-text">Words</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="riwa-card p-8 h-full flex flex-col">
                <div className="text-[var(--color-accent)] text-4xl font-serif mb-4 leading-none">
                  "
                </div>
                <p className="text-[var(--color-dark-secondary)] leading-relaxed mb-6 flex-1 italic">
                  {t.quote}
                </p>
                <div className="border-t border-[var(--color-dark-border)] pt-4">
                  <p className="font-[var(--font-display)] font-semibold text-[var(--color-dark-text)] text-sm">
                    {t.author}
                  </p>
                  <p className="text-[var(--color-accent)] text-xs">
                    {t.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
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
