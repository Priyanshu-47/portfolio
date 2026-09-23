import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { projects } from "../data/resume";
import AnimatedLinesBand from "./AnimatedLinesBand";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* Riwa's exact card-header icon: pinwheel of 4 rounded rects, used as mask */
const CARD_ICON_MASK =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M 9.335 0.885 L 9.335 3.786 C 9.335 4.279 8.943 4.671 8.45 4.671 L 5.552 4.671 C 5.06 4.671 4.668 4.279 4.668 3.786 L 4.668 0.885 C 4.668 0.392 5.06 0 5.552 0 L 8.45 0 C 8.932 0 9.335 0.392 9.335 0.885 Z M 4.668 13.115 L 4.668 10.214 C 4.668 9.721 5.06 9.329 5.552 9.329 L 8.45 9.329 C 8.943 9.329 9.335 9.721 9.335 10.214 L 9.335 13.115 C 9.335 13.608 8.943 14 8.45 14 L 5.552 14 C 5.071 14 4.668 13.597 4.668 13.115 Z M 10.218 4.657 L 13.116 4.657 C 13.609 4.657 14.001 5.049 14.001 5.542 L 14.001 8.443 C 14.001 8.936 13.609 9.328 13.116 9.328 L 10.218 9.328 C 9.726 9.328 9.334 8.936 9.334 8.443 L 9.334 5.542 C 9.334 5.06 9.726 4.657 10.218 4.657 Z M 0.884 4.657 L 3.783 4.657 C 4.275 4.657 4.667 5.049 4.667 5.542 L 4.667 8.443 C 4.667 8.936 4.275 9.328 3.783 9.328 L 0.884 9.328 C 0.392 9.328 0 8.936 0 8.443 L 0 5.542 C 0 5.06 0.403 4.657 0.884 4.657 Z' fill='black'/%3E%3C/svg%3E")`;

/* Riwa's exact staggered masonry placement (4-col grid, verified at vw1397):
   R1: [small c1][ – ][large c3-4]
   R2: [ – ][large c2-3][ – ]
   R3: [large c1-2][ – ][small c4]                                  */
const PLACEMENT = [
  { cls: "lg:[grid-column:1] lg:[grid-row:1]", small: true },
  { cls: "lg:[grid-column:3/span_2] lg:[grid-row:1]", small: false },
  { cls: "lg:[grid-column:2/span_2] lg:[grid-row:2]", small: false },
  { cls: "lg:[grid-column:1/span_2] lg:[grid-row:3]", small: false },
  { cls: "lg:[grid-column:4] lg:[grid-row:3]", small: true },
];

/* Grayscale placeholders matching Riwa's photo tone — replace with real images later */
const PLACEHOLDERS = [
  "radial-gradient(ellipse 70% 55% at 32% 38%, #3d3d3d, transparent 72%), radial-gradient(ellipse 45% 60% at 78% 72%, #232323, transparent 70%), #060606",
  "radial-gradient(ellipse 60% 70% at 65% 30%, #414141, transparent 70%), radial-gradient(ellipse 55% 45% at 25% 75%, #1f1f1f, transparent 72%), #070707",
  "radial-gradient(ellipse 80% 45% at 50% 65%, #383838, transparent 74%), radial-gradient(ellipse 40% 50% at 82% 22%, #2a2a2a, transparent 68%), #050505",
  "radial-gradient(ellipse 55% 65% at 38% 60%, #454545, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 28%, #202020, transparent 72%), #060606",
  "radial-gradient(ellipse 75% 50% at 60% 45%, #3a3a3a, transparent 72%), radial-gradient(ellipse 42% 55% at 20% 30%, #262626, transparent 70%), #070707",
];

const monoLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

export default function Projects() {
  return (
    <section className="bg-[var(--color-light-bg)] relative" style={{ padding: "120px 24px" }}>
      {/* 5 vertical lines — lines 1&5 at edges, 2-4 at 25/50/75 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      {/* Horizontal scrolling-lines band at the 02 -> 03 boundary: sits at the
          bottom edge of this light section, right before Services. Bar color =
          next section bg rgb(8, 10, 16) (Riwa paints their band in what-we-do's
          color over the light projects bg); merge effect = hero band spec. */}
      <AnimatedLinesBand />

      <div className="relative z-10">
        {/* Header: 2 equal columns, no gap — right column starts at 50% line */}
        <div className="grid lg:grid-cols-2 gap-0 items-start">
          {/* Left: Chip + Heading */}
          <div>
            <Reveal>
              <div style={{ marginBottom: 19 }}>
                {/* Riwa chip: pad 8/14, gap 12, radius 100, bg #E6E6E6, dot 10px */}
                <div className="inline-flex items-center" style={{ background: "#E6E6E6", padding: "8px 14px", borderRadius: 100, gap: 12 }}>
                  <span className="inline-flex items-center" style={{ gap: 4 }}>
                    <span className="block" style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }} />
                    <span style={monoLabel}>02</span>
                  </span>
                  <span style={monoLabel}>Portfolio</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(2.5rem, 5.73vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span className="block" style={{ color: "var(--color-light-text)" }}>Our</span>
                <span className="block" style={{ color: "var(--color-light-muted)" }}>Projects.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right: Year + Description + CTA — top-aligned with chip (no top padding) */}
          <div>
            <Reveal delay={0.1}>
              <p
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 14,
                  lineHeight: "16.8px",
                  fontWeight: 500,
                  letterSpacing: "-0.56px",
                  color: "var(--color-light-text)",
                }}
              >
                (2022-26©)
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                className="font-body"
                style={{
                  marginTop: 59,
                  fontSize: 18,
                  lineHeight: "25.2px",
                  color: "var(--color-light-secondary)",
                }}
              >
                Discover how my creative vision transforms ideas into powerful,
                conversion-driven digital experiences that truly stand out.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                to="/projects"
                className="group flex items-center justify-center"
                style={{
                  marginTop: 20,
                  height: 66,
                  background: "var(--color-dark-bg)",
                  borderRadius: 40,
                }}
              >
                {/* Slide-up label: two stacked copies, Riwa hover */}
                <span className="block overflow-hidden" style={{ height: 16, marginRight: 16 }}>
                  <span
                    className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-4"
                    style={{
                      fontFamily: '"Sora", sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "16px",
                      letterSpacing: "-0.64px",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                    }}
                  >
                    <span style={{ height: 16 }}>All projects</span>
                    <span style={{ height: 16 }}>All projects</span>
                  </span>
                </span>
                {/* Riwa's exact plus-in-circle icon (26×26) */}
                <svg
                  className="transition-transform duration-300 ease-out group-hover:rotate-90"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path d="M 13 26 C 5.82 26 0 20.18 0 13 C 0 5.82 5.82 0 13 0 C 20.18 0 26 5.82 26 13 C 26 20.18 20.18 26 13 26 Z" fill="#FFFFFF" />
                  <path
                    d="M 13 21.667 L 13 17.333 C 13 14.94 11.06 13 8.667 13 L 4.333 13 M 21.667 13 L 17.333 13 C 14.94 13 13 14.94 13 17.333 L 13 21.667 M 13 4.333 L 13 8.667 C 13 11.06 14.94 13 17.333 13 L 21.667 13 M 4.333 13 L 8.667 13 C 11.06 13 13 11.06 13 8.667 L 13 4.333"
                    stroke="rgb(229, 59, 23)"
                    strokeMiterlimit="10"
                  />
                  <path d="M 13 15.708 L 10.292 13 L 13 9.75 L 15.708 13 Z" fill="rgb(229, 59, 23)" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Project cards — Riwa staggered masonry: 4-col grid, row-gap 60 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[7px] lg:gap-x-0"
          style={{ marginTop: 100, rowGap: 60 }}
        >
          {projects.slice(0, 5).map((project, i) => {
            const placement = PLACEMENT[i % 5];
            return (
              <div key={project.title} className={placement.cls}>
                <Reveal delay={(i % 5) * 0.1}>
                  <Link to={`/projects/${slugify(project.title)}`} className="group block">
                    {/* Header strip — bg #EBEBEB, pad 6/12, h29 */}
                    <div className="flex items-center justify-between" style={{ background: "#EBEBEB", padding: "6px 12px" }}>
                      <span className="flex items-center min-w-0" style={{ gap: 16, flex: "1 1 50%" }}>
                        <span
                          className="block shrink-0"
                          style={{
                            width: 14,
                            height: 14,
                            background: "rgb(214, 54, 20)",
                            WebkitMaskImage: CARD_ICON_MASK,
                            maskImage: CARD_ICON_MASK,
                            WebkitMaskSize: "auto, auto",
                            maskSize: "auto, auto",
                            WebkitMaskPosition: "50% 50%",
                            maskPosition: "50% 50%",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          }}
                        />
                        <span style={{ ...monoLabel, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {project.title}
                        </span>
                      </span>
                      <span className="flex items-center shrink-0" style={{ gap: 4, justifyContent: "flex-end" }}>
                        <span style={monoLabel}>/</span>
                        <span style={monoLabel}>{project.tags[0]}</span>
                      </span>
                    </div>

                    {/* Image — Riwa: black bg, cover; small 333/311, large 667/491 */}
                    <div
                      className="overflow-hidden bg-black"
                      style={{ aspectRatio: placement.small ? "333 / 311" : "667 / 491" }}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ background: PLACEHOLDERS[i % 5] }}
                        />
                      )}
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
