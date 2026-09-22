import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const services = [
  {
    number: "001",
    title: "Frontend Development",
    description: "Building responsive, performant user interfaces with React, TypeScript, and modern CSS frameworks.",
  },
  {
    number: "002",
    title: "Backend Development",
    description: "Designing scalable APIs and server architectures with .NET, Node.js, Python, and PostgreSQL.",
  },
  {
    number: "003",
    title: "Full-Stack Applications",
    description: "End-to-end development from concept to deployment — database, APIs, CI/CD, and cloud.",
  },
  {
    number: "004",
    title: "UI/UX Design & Development",
    description: "Translating designs into functional, accessible interfaces with focus on user experience.",
  },
  {
    number: "005",
    title: "Cloud & DevOps",
    description: "AWS infrastructure, Docker containers, CI/CD pipelines, and production monitoring.",
  },
];

const icons = ["⬆", "✦", "▲", "◆", "✚"];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative overflow-hidden">
      <div className="absolute inset-0 riwa-vertical-lines" />

      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label mb-6">
            what we do
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading mb-4">
            Design Services That
          </h2>
          <h2 className="section-heading section-heading-muted mb-16">
            Drive Results.
          </h2>
        </Reveal>

        {/* Service list — Riwa: accordion rows with hover images */}
        <div className="space-y-0 border-t border-white/10">
          {services.map((service, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="group relative flex items-center justify-between py-6 md:py-7 px-4 md:px-6 border-b border-white/10 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left: icon + number */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  <span className="text-[var(--color-orange)] text-lg">
                    {icons[i]}
                  </span>
                  <span className="font-mono text-[var(--color-dark-muted)] text-sm">
                    {service.number}
                  </span>
                </div>

                {/* Center: service title */}
                <h4 className="font-mono text-lg md:text-xl font-medium text-white flex-1 ml-8 md:ml-16">
                  {service.title}
                </h4>

                {/* Right: plus icon */}
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[var(--color-orange)] group-hover:text-[var(--color-orange)] transition-colors text-white/40">
                  <span className="text-lg leading-none">+</span>
                </div>

                {/* Floating image on hover */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 w-32 h-24 rounded-lg overflow-hidden z-10 pointer-events-none"
                    >
                      <div className={`w-full h-full bg-gradient-to-br from-[var(--color-orange)]/40 to-[var(--color-orange-deep)]/30`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
