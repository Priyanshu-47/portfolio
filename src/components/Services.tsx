import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const services = [
  {
    number: "001",
    title: "Frontend Development",
    description:
      "Building responsive, performant user interfaces with React, TypeScript, and modern CSS frameworks.",
    tags: ["React", "TypeScript", "Tailwind", "Accessibility"],
  },
  {
    number: "002",
    title: "Backend Development",
    description:
      "Designing scalable APIs and server architectures with .NET, Node.js, Python, and PostgreSQL.",
    tags: [".NET", "Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    number: "003",
    title: "Full-Stack Applications",
    description:
      "End-to-end development from concept to deployment — database, APIs, CI/CD, and cloud.",
    tags: ["System Design", "CI/CD", "AWS", "Testing"],
  },
  {
    number: "004",
    title: "UI/UX Design & Development",
    description:
      "Translating designs into functional, accessible interfaces with focus on user experience.",
    tags: ["Figma", "Prototyping", "Design Systems", "Responsive"],
  },
  {
    number: "005",
    title: "Cloud & DevOps",
    description:
      "AWS infrastructure, Docker containers, CI/CD pipelines, and production monitoring.",
    tags: ["Docker", "Kubernetes", "Monitoring", "Pipelines"],
  },
];

const icons = ["⬆", "✦", "▲", "◆", "✚"];

/* Cursor-following hover previews (Riwa: fixed, z13, 128×150, follows cursor).
   Real contextual photos, one per service. */
const PREVIEWS = [
  "/img/blog-react.jpg",
  "/img/dev-terminal.jpg",
  "/img/stack-4.jpg",
  "/img/life-5.jpg",
  "/img/blog-docker.jpg",
];

/* Riwa's exact SVG shapes (captured from their sprite symbols) */
const SPARKLE_D =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

const DECO_TOP =
  "M 44.075 97.499 L 0 97.499 L 44.075 89.348 L 44.075 97.498 Z M 44.075 86.329 L 0 86.329 L 44.075 78.178 L 44.075 86.328 Z M 44.075 75.159 L 0 75.159 L 44.075 67.008 L 44.075 75.158 Z M 44.075 63.99 L 0 63.99 L 44.075 55.84 L 44.075 63.989 Z M 44.075 52.82 L 0 52.82 L 44.075 44.67 Z M 44.075 41.65 L 0 41.65 L 44.075 33.5 Z";
const DECO_BOTTOM =
  "M 44.075 30.49 L 0 30.49 L 44.075 22.34 Z M 44.075 19.32 L 0 19.32 L 44.075 11.17 Z M 44.075 8.15 L 0 8.15 L 44.075 0 Z";

/* Corner cuts — filled with the section bg color to notch the card */
const CUT_TL = "M 218 0 L 0 0 L 0 29 L 14.5 8 L 204 8 Z";
const CUT_BL = "M 0 0 L 0 23.5 L 66.5 23.5 L 29.5 9 L 10.5 9 Z";
const CUT_TR = "M 12 8 L 0 0 L 12 0 Z";

const monoBase: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
};

const monoLabel: CSSProperties = {
  ...monoBase,
  fontSize: 14,
  lineHeight: "16.8px",
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
};

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  /* Riwa accordion: clicking + expands the row (h90 → h240), turns it orange,
     reveals description + tag chips, swaps + for −; rows open independently
     (multiple can be open at once) */
  const [open, setOpen] = useState<number[]>([]);

  useEffect(() => {
    if (hovered === null) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [hovered]);

  return (
    <section className="relative bg-[var(--color-dark-bg)]" style={{ padding: "120px 24px" }}>
      {/* Riwa's what-we-do shows NO visible vertical lines: their page-wide
          "Vertical fixed lines" overlay (z0) is painted under the opaque section
          background here, and hit-tests at 17px/25%/50%/75% find no line element.
          Matched dicto: this section intentionally has none. */}

      <div className="relative z-10">
        {/* Header: chip (col 1, 25%) + heading block (cols 2-4, 75%) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
          <Reveal className="lg:w-1/4 shrink-0">
            {/* Riwa dark chip: bg #21242B, pad 8/14, gap 12, radius 100, text #CCC */}
            <div
              className="inline-flex items-center"
              style={{
                background: "var(--color-dark-surface)",
                padding: "8px 14px",
                borderRadius: 100,
                gap: 12,
              }}
            >
              <span className="inline-flex items-center" style={{ gap: 4 }}>
                <span
                  className="block"
                  style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
                />
                <span style={{ ...monoLabel, color: "#CCCCCC" }}>03</span>
              </span>
              <span style={{ ...monoLabel, color: "#CCCCCC" }}>What we do</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:w-3/4 relative">
            {/* Header-right deco: sliced arrow stack, 44×98 */}
            <svg
              className="absolute top-0 right-0 hidden lg:block pointer-events-none"
              width="44"
              height="98"
              viewBox="0 0 44.075 97.499"
              fill="none"
              aria-hidden="true"
            >
              <path d={DECO_TOP} fill="var(--color-dark-surface)" />
              <path d={DECO_BOTTOM} fill="#34363B" />
            </svg>

            <h2
              style={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 7.16vw, 6.25rem)",
                lineHeight: 1,
                letterSpacing: "-0.06em",
                textTransform: "uppercase",
              }}
            >
              <span className="block" style={{ color: "var(--color-dark-text)" }}>
                Design Services That
              </span>
              <span className="block" style={{ color: "var(--color-dark-secondary)" }}>
                Drive Results.
              </span>
            </h2>

            {/* Sparkle + hairline | description | (empty) — Riwa: 3 cols of ~330, gap 5 */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 lg:gap-[5px] lg:items-end">
              <div className="relative hidden lg:block" style={{ height: 101 }}>
                <div
                  className="absolute left-0 right-0"
                  style={{ height: 1, bottom: 10, background: "#34363B" }}
                />
                <svg
                  className="absolute"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  style={{ left: -9, bottom: 0 }}
                  aria-hidden="true"
                >
                  <path d={SPARKLE_D} fill="#34363B" />
                </svg>
              </div>
              <p
                className="font-body"
                style={{
                  fontSize: 18,
                  lineHeight: "25.2px",
                  color: "var(--color-dark-secondary)",
                }}
              >
                From interface to infrastructure — I design and build accessible, performant
                applications with React, .NET, and AWS.
              </p>
              <div className="hidden lg:block" />
            </div>
          </Reveal>
        </div>

        {/* Service rows — Riwa: #14171D cards, gap 8, notched corners;
            hover anywhere → cursor-following preview; click ANYWHERE on the card
            → orange accordion open/close (Riwa toggles on whole-card click;
            the +/− button is just the indicator) */}
        <div className="mt-16 lg:mt-[100px] flex flex-col gap-2">
          {services.map((service, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal key={service.number} delay={i * 0.05}>
                <div
                  className="relative transition-colors duration-300 cursor-pointer"
                  style={{ background: isOpen ? "rgb(214, 54, 20)" : "var(--color-dark-card)" }}
                  onClick={() =>
                    setOpen(isOpen ? open.filter((n) => n !== i) : [...open, i])
                  }
                  onMouseEnter={(e) => {
                    setHovered(i);
                    setPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Exact corner cuts (fill = section bg) */}
                  <svg
                    className="absolute left-0 top-0 pointer-events-none"
                    width="218"
                    height="29"
                    viewBox="0 0 218 29"
                    fill="var(--color-dark-bg)"
                    aria-hidden="true"
                  >
                    <path d={CUT_TL} />
                  </svg>
                  <svg
                    className="absolute left-0 bottom-0 pointer-events-none"
                    width="66.5"
                    height="23.5"
                    viewBox="0 0 66.5 23.5"
                    fill="var(--color-dark-bg)"
                    aria-hidden="true"
                  >
                    <path d={CUT_BL} />
                  </svg>
                  <svg
                    className="absolute right-0 top-0 pointer-events-none"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="var(--color-dark-bg)"
                    aria-hidden="true"
                  >
                    <path d={CUT_TR} />
                  </svg>

                  <div
                    className={
                      `relative flex flex-col gap-3 md:flex-row md:gap-[10px] p-4 ` +
                      (isOpen
                        ? "md:items-start md:min-h-[240px] md:pt-6 md:pr-6 md:pb-[15px] md:pl-6"
                        : "md:items-center md:min-h-[90px] md:p-6")
                    }
                  >
                    {/* Number pill (dashed outline) + dashed line */}
                    <div className="flex items-center md:w-[262px] shrink-0" style={{ height: 33 }}>
                      <span
                        className="inline-flex items-center shrink-0"
                        style={{
                          padding: "8px 14px",
                          borderRadius: 100,
                          gap: 24,
                          border: "1px dashed rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <span
                          className="flex items-center justify-center"
                          style={{
                            width: 14,
                            height: 14,
                            fontSize: 14,
                            lineHeight: "14px",
                            color: isOpen ? "#FFFFFF" : "rgb(214, 54, 20)",
                          }}
                          aria-hidden="true"
                        >
                          {icons[i]}
                        </span>
                        <span style={{ ...monoLabel, color: "#FFFFFF" }}>{service.number}</span>
                      </span>
                      <span
                        className="hidden md:block flex-1"
                        style={{ borderTop: "1px dashed rgba(255, 255, 255, 0.3)" }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Title column: title + expand button, then (when open) desc + tags */}
                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex-1 min-w-0 md:pl-10 pr-14 md:pr-0">
                        <h4
                          style={{
                            ...monoBase,
                            fontSize: "clamp(1rem, 1.72vw, 1.5rem)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.04em",
                            color: "#FFFFFF",
                          }}
                        >
                          {service.title}
                        </h4>
                      </div>

                      {/* Riwa expanded panel: desc (Geist 16/22.4, w650) + 2×2 tag chips */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="svc-detail"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="overflow-hidden md:pl-10"
                          >
                            <p
                              className="font-body"
                              style={{
                                fontSize: 16,
                                lineHeight: "22.4px",
                                color: "#FFFFFF",
                                maxWidth: 650,
                                marginTop: 3,
                              }}
                            >
                              {service.description}
                            </p>
                            <div
                              className="mt-8 md:mt-[86.6px] grid grid-cols-2 max-w-[650px]"
                              style={{ rowGap: 4 }}
                            >
                              {service.tags.map((tag) => (
                                <span key={tag} style={{ ...monoLabel, color: "#FFFFFF" }}>
                                  [ {tag} ]
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* +/− button — Riwa: absolute at right edge; vertically centered when
                        closed, top-aligned with the title when open. Indicator only:
                        click bubbles to the whole-card toggle above. */}
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${service.title}`}
                      className={`absolute right-6 z-10 flex items-center justify-center cursor-pointer ${
                        isOpen ? "top-6" : "top-1/2 -translate-y-1/2"
                      }`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        border: `1px solid ${isOpen ? "rgba(255, 255, 255, 0.7)" : "#686868"}`,
                        background: "transparent",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d={isOpen ? "M6 12h12" : "M6 12h12M12 6v12"}
                          stroke={isOpen ? "#FFFFFF" : "#686868"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Cursor-following preview — Riwa: fixed, above header, 128×150,
          anchored top at cursor, translateX(-50%) */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="svc-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block fixed z-[60] pointer-events-none"
            style={{ left: pos.x, top: pos.y, transform: "translateX(-50%)" }}
          >
            <div
              style={{
                width: 128,
                height: 150,
                overflow: "hidden",
                background: "#14171D",
              }}
            >
              <img
                src={PREVIEWS[hovered]}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
