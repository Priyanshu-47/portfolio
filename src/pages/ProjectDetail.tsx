import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import { projectDetails } from "../data/projectDetails";
import { Reveal } from "../components/Reveal";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="bg-[var(--color-dark-bg)] pt-32 container-riwa">
        <p className="text-[var(--color-dark-muted)]">Project not found.</p>
        <Link
          to="/projects"
          className="mt-4 inline-flex items-center gap-2 text-[var(--color-accent)] text-sm"
        >
          <FiArrowLeft /> Back to projects
        </Link>
      </section>
    );
  }

  const currentIndex = projectDetails.findIndex((p) => p.slug === slug);
  const nextProject =
    projectDetails[(currentIndex + 1) % projectDetails.length];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-dark-bg)] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 riwa-grid-bg opacity-30" />

        <div className="container-riwa relative z-10">
          <Reveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-dark-muted)] hover:text-[var(--color-dark-text)] transition-colors mb-12"
            >
              <FiArrowLeft />
              All Projects
            </Link>
          </Reveal>

          <Reveal>
            <div className="section-label section-label-dark mb-6">
              ● {project.category}
            </div>
          </Reveal>

          <Reveal>
            <h1 className="font-[var(--font-display)] font-bold text-[var(--color-dark-text)] leading-[1.05] tracking-tight max-w-4xl mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-[var(--color-dark-secondary)] text-lg max-w-2xl mb-8">
              {project.subtitle}
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-6 text-sm text-[var(--color-dark-muted)]">
              <span className="inline-flex items-center gap-2">
                <FiCalendar className="text-[var(--color-accent)]" />
                {project.period}
              </span>
              <span className="inline-flex items-center gap-2">
                <FiUser className="text-[var(--color-accent)]" />
                {project.client}
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-[var(--font-mono)] text-[var(--color-accent)] bg-[var(--color-accent-subtle)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="riwa-divider">
            <div />
            <div />
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-[var(--color-dark-bg)] py-16">
        <div className="container-riwa">
          <Reveal>
            <div className="w-full h-[300px] lg:h-[500px] rounded-2xl bg-gradient-to-br from-[var(--color-dark-card)] via-[#1a1a1a] to-[var(--color-dark-border)] flex items-center justify-center overflow-hidden">
              <span className="font-[var(--font-display)] text-[8rem] font-bold text-[var(--color-dark-border)] select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-[var(--color-dark-bg)] pb-24">
        <div className="container-riwa">
          {[
            { label: "01 — Challenge", title: "The Problem", text: project.challenge },
            { label: "02 — Approach", title: "What I Built", text: project.approach },
            { label: "03 — Result", title: "The Outcome", text: project.result },
            { label: "04 — Takeaway", title: "What I Learned", text: project.takeaway },
          ].map((section, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-[var(--color-dark-border)] pb-12 mb-12">
                <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] uppercase tracking-wider mb-4">
                  {section.label}
                </p>
                <h2 className="font-[var(--font-display)] text-2xl lg:text-3xl font-semibold text-[var(--color-dark-text)] tracking-tight mb-6">
                  {section.title}
                </h2>
                <p className="max-w-2xl text-[var(--color-dark-secondary)] leading-relaxed">
                  {section.text}
                </p>
              </div>
            </Reveal>
          ))}

          {project.testimonial && (
            <Reveal>
              <div className="riwa-card p-8 lg:p-12 max-w-2xl">
                <p className="font-[var(--font-display)] text-lg text-[var(--color-dark-text)] leading-relaxed italic">
                  "{project.testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-dark-border)] flex items-center justify-center">
                    <FiUser className="h-4 w-4 text-[var(--color-dark-muted)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-dark-text)]">
                      {project.testimonial.author}
                    </p>
                    <p className="text-xs text-[var(--color-dark-muted)]">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Next Project */}
      <section className="bg-[var(--color-dark-bg)] border-t border-[var(--color-dark-border)] py-16">
        <div className="container-riwa">
          <Reveal>
            <p className="font-[var(--font-mono)] text-xs text-[var(--color-dark-muted)] uppercase tracking-wider mb-4">
              Next Project
            </p>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group block"
            >
              <h3 className="font-[var(--font-display)] text-2xl lg:text-4xl font-semibold text-[var(--color-dark-text)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                {nextProject.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-dark-secondary)] flex items-center gap-2">
                {nextProject.subtitle}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[var(--color-dark-bg)] border-t border-[var(--color-dark-border)] py-24">
        <div className="container-riwa">
          <Reveal>
            <h2 className="section-heading text-[var(--color-dark-text)] mb-6">
              Like what you{" "}
              <span className="riwa-gradient-text">see?</span>
            </h2>
            <p className="text-[var(--color-dark-secondary)] text-lg max-w-xl mb-8">
              Let's build something great together. I'm always open to new
              challenges and interesting problems.
            </p>
            <Link
              to="/contact"
              className="riwa-pill riwa-pill-primary inline-flex items-center gap-2 group"
            >
              Get in Touch
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
