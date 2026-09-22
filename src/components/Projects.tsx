import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "./Reveal";
import { projects } from "../data/resume";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Projects() {
  return (
    <section className="bg-[var(--color-light-bg)] py-24 relative">
      {/* 5 vertical lines — Riwa: lines 1&5 at edges, 2-4 equally spaced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "12px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "12px" }} />
      </div>

      <div className="container-riwa relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Label + Heading */}
          <div>
            <Reveal>
              <div className="section-label section-label-dark mb-6">
                02  PORTFOLIO
              </div>
            </Reveal>

            <Reveal>
              <h2 className="section-heading section-heading-light mb-4">
                Our
              </h2>
              <h2 className="section-heading section-heading-light text-[var(--color-light-muted)] mb-8">
                Projects.
              </h2>
            </Reveal>
          </div>

          {/* Right: Year + Description + CTA */}
          <div className="lg:pt-32">
            <Reveal delay={0.1}>
              <p className="font-mono text-[var(--color-light-secondary)] text-sm mb-6">
                (2022-26©)
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[var(--color-light-secondary)] text-lg leading-relaxed mb-8">
                Discover how my creative vision transforms ideas into powerful,
                conversion-driven digital experiences that truly stand out.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                to="/projects"
                className="flex items-center justify-center w-full bg-[var(--color-dark-bg)] text-white text-center py-5 rounded-full font-display text-lg font-semibold hover:bg-[var(--color-dark-card)] transition-colors group"
              >
                ALL PROJECTS
                <span className="inline-flex items-center justify-center w-7 h-7 ml-3 rounded-full bg-[var(--color-orange)] text-white text-xs">
                  ✦
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Project cards — Riwa: list-style with orange diamond icons */}
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {projects.slice(0, 4).map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <Link
                to={`/projects/${slugify(project.title)}`}
                className="group block bg-white border border-black/5 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--color-orange)] text-xs">✦</span>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-light-text)] group-hover:text-[var(--color-orange)] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <FiArrowUpRight className="text-[var(--color-light-muted)] group-hover:text-[var(--color-orange)] transition-colors" />
                </div>
                <p className="text-[var(--color-light-secondary)] text-sm mt-2 ml-5">
                  {project.tags[0]}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
