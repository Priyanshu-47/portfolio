import { Reveal } from "./Reveal";

const stats = [
  {
    value: "100%",
    label: "Client Satisfaction",
    description: "Every project delivered with excellence",
  },
  {
    value: "3+",
    label: "Experience",
    description: "Years of professional development",
  },
  {
    value: "10+",
    label: "Delivered Projects",
    description: "Full-stack applications shipped",
  },
  {
    value: "+40%",
    label: "Growth Impact",
    description: "Average ROI for client projects",
  },
];

export default function Stats() {
  return (
    <section className="bg-[var(--color-light-bg)] py-0 relative overflow-hidden">
      <div className="absolute inset-0 riwa-vertical-lines-dark" />

      <div className="container-riwa relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-black/5">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white p-6 md:p-8 border-b border-r border-black/5 last:border-r-0 lg:[&:nth-child(4)]:border-r-0 lg:[&:nth-child(odd)]:border-r-0">
                <p className="font-[var(--font-mono)] text-[var(--color-light-secondary)] text-xs uppercase tracking-wider mb-4">
                  {stat.label}
                </p>
                <p className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--color-light-text)] tracking-tight">
                  {stat.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
