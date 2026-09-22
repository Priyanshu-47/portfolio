import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "../components/Reveal";
import { projectDetails } from "../data/projectDetails";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-light-bg)] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 riwa-grid-bg-light opacity-30" />

        {/* Decorative stars */}
        <motion.div
          className="absolute top-24 right-24 riwa-star riwa-star-large"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>

        <div className="container-riwa relative z-10">
          <Reveal>
            <div className="section-label section-label-light mb-6">
              ● ALL PROJECTS
            </div>
          </Reveal>

          <Reveal>
            <h1 className="section-heading section-heading-light mb-6">
              Selected Work
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-[var(--color-light-secondary)] text-lg max-w-xl">
              A curated collection of projects showcasing my expertise in
              full-stack development, AI/ML, and problem-solving.
            </p>
          </Reveal>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="riwa-divider riwa-divider-light">
            <div />
            <div />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-[var(--color-light-bg)] py-20">
        <div className="container-riwa">
          <div className="grid md:grid-cols-2 gap-8">
            {projectDetails.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block riwa-card riwa-card-light overflow-hidden"
                >
                  {/* Image placeholder */}
                  <div className="relative h-72 overflow-hidden bg-[var(--color-light-card)]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-[8rem] font-bold text-[var(--color-light-text)] opacity-[0.05] select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-dark-bg)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiArrowUpRight className="text-[var(--color-accent)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-[var(--color-accent)] font-medium uppercase">
                        {project.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-light-muted)]" />
                      <span className="text-xs text-[var(--color-light-muted)] font-mono">
                        {project.period}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[var(--color-light-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[var(--color-light-secondary)] text-sm leading-relaxed line-clamp-2 mb-4">
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono text-[var(--color-accent)] bg-[var(--color-accent-subtle)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[var(--color-dark-bg)] py-24">
        <div className="container-riwa text-center">
          <Reveal>
            <h2 className="section-heading text-[var(--color-dark-text)] mb-6">
              Have a project{" "}
              <span className="riwa-gradient-text">in mind?</span>
            </h2>
            <p className="text-[var(--color-dark-secondary)] text-lg max-w-xl mx-auto mb-8">
              I'm always looking for new challenges. Let's talk about your next
              project.
            </p>
            <Link
              to="/contact"
              className="riwa-pill riwa-pill-primary inline-flex items-center gap-2 group"
            >
              Get in Touch
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
