import { Reveal } from "./Reveal";

const articles = [
  {
    title: "Building Scalable React Applications",
    excerpt:
      "Lessons learned from architecting large-scale React apps with TypeScript and modern tooling.",
    date: "2025",
    tag: "React",
  },
  {
    title: "The Art of Clean Code",
    excerpt:
      "Why readable, maintainable code matters more than clever solutions in professional environments.",
    date: "2025",
    tag: "Best Practices",
  },
  {
    title: "Full-Stack Deployment with Docker",
    excerpt:
      "A practical guide to containerizing and deploying full-stack applications on cloud platforms.",
    date: "2024",
    tag: "DevOps",
  },
];

export default function Blog() {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label section-label-dark mb-6">
            ● 11 BLOG
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading text-[var(--color-dark-text)] mb-16">
            Latest <span className="riwa-gradient-text">Articles</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <article className="riwa-card p-6 group cursor-pointer h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-[var(--font-mono)] text-[var(--color-accent)] bg-[var(--color-accent-subtle)] rounded-full">
                    {article.tag}
                  </span>
                  <span className="text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)]">
                    {article.date}
                  </span>
                </div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-dark-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[var(--color-dark-secondary)] text-sm leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-4 text-[var(--color-accent)] text-sm font-medium flex items-center gap-1">
                  Read More →
                </div>
              </article>
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
