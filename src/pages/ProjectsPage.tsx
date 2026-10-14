import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { projects } from "../data/resume";

/* Riwa /projects — live-verified (rp-proj-top, rp-grid, DOM probes):
   page  : light #F0F0F0, h3956 — header y120 h290, grid y510 h1600
           (2×3 cards h520 gap20, img 657×491), white 1px divider at
           content bottom → 30px light → orange contact y2300 h1052 →
           footer y3352 h604.
   lines : 5 vertical 1px white at x24/357/690/1024/1357 (24 inset,
           quarter-spaced) — bg-white per established rule.
   header: chip "(2016-26©)" col1 (pill #E6E6E6, mono 500 14 uppercase
           #686868, orange dot) | h1 col2–4 x357 w1000 Sora 600 100/100
           -6px two-tone (SELECTED #0B0D14 / WORK. #5E5E5E) → sub-row:
           diamond ✦ + hairline x357→685 y397 | desc col3 x690 y360 w330
           Geist 18/25.2 #686868.
   cards : header strip #EBEBEB pad 6/12 (glyph 14 orange + name mono
           uppercase #686868 | right "/ tag" mono #686868 lowercase) →
           full-bleed image 657/491 grayscale, hover scale 105.
   decor : barcode stack top-right (right 24, y128, 13 bars h4 gap3).
   Content: user's 5 projects (title / tags[0] as category). */

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* Riwa's exact card-header icon: pinwheel of 4 rounded rects, used as mask */
export const CARD_ICON_MASK =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M 9.335 0.885 L 9.335 3.786 C 9.335 4.279 8.943 4.671 8.45 4.671 L 5.552 4.671 C 5.06 4.671 4.668 4.279 4.668 3.786 L 4.668 0.885 C 4.668 0.392 5.06 0 5.552 0 L 8.45 0 C 8.932 0 9.335 0.392 9.335 0.885 Z M 4.668 13.115 L 4.668 10.214 C 4.668 9.721 5.06 9.329 5.552 9.329 L 8.45 9.329 C 8.943 9.329 9.335 9.721 9.335 10.214 L 9.335 13.115 C 9.335 13.608 8.943 14 8.45 14 L 5.552 14 C 5.071 14 4.668 13.597 4.668 13.115 Z M 10.218 4.657 L 13.116 4.657 C 13.609 4.657 14.001 5.049 14.001 5.542 L 14.001 8.443 C 14.001 8.936 13.609 9.328 13.116 9.328 L 10.218 9.328 C 9.726 9.328 9.334 8.936 9.334 8.443 L 9.334 5.542 C 9.334 5.06 9.726 4.657 10.218 4.657 Z M 0.884 4.657 L 3.783 4.657 C 4.275 4.657 4.667 5.049 4.667 5.542 L 4.667 8.443 C 4.667 8.936 4.275 9.328 3.783 9.328 L 0.884 9.328 C 0.392 9.328 0 8.936 0 8.443 L 0 5.542 C 0 5.06 0.403 4.657 0.884 4.657 Z' fill='black'/%3E%3C/svg%3E")`;

const monoLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

/* Riwa card category is lowercase ("/ web design") */
const monoCat: CSSProperties = { ...monoLabel, textTransform: "none" };

/* Grayscale placeholders matching Riwa's photo tone — replace with real images later */
export const PLACEHOLDERS = [
  "radial-gradient(ellipse 70% 55% at 32% 38%, #3d3d3d, transparent 72%), radial-gradient(ellipse 45% 60% at 78% 72%, #232323, transparent 70%), #060606",
  "radial-gradient(ellipse 60% 70% at 65% 30%, #414141, transparent 70%), radial-gradient(ellipse 55% 45% at 25% 75%, #1f1f1f, transparent 72%), #070707",
  "radial-gradient(ellipse 80% 45% at 50% 65%, #383838, transparent 74%), radial-gradient(ellipse 40% 50% at 82% 22%, #2a2a2a, transparent 68%), #050505",
  "radial-gradient(ellipse 55% 65% at 38% 60%, #454545, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 28%, #202020, transparent 72%), #060606",
  "radial-gradient(ellipse 75% 50% at 60% 45%, #3a3a3a, transparent 72%), radial-gradient(ellipse 42% 55% at 20% 30%, #262626, transparent 70%), #070707",
];

/* Barcode decoration — right-aligned stack, top-right of header */
const BARCODE = [55, 30, 64, 22, 48, 70, 35, 60, 26, 52, 44, 68, 38];

export default function ProjectsPage() {
  return (
    <div>
      <section
        className="bg-[var(--color-light-bg)] relative"
        style={{ padding: "120px 24px 160px", borderBottom: "1px solid #FFFFFF" }}
      >
        {/* 5 vertical lines — 24 inset, quarter-spaced, pure white */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-px block bg-white" />
            ))}
          </div>
        </div>

        {/* Barcode decor — right:24, top:128, 13 bars h4 gap3 */}
        <div
          className="absolute hidden lg:flex flex-col items-end"
          style={{ right: 24, top: 128, gap: 3 }}
          aria-hidden="true"
        >
          {BARCODE.map((w, i) => (
            <span key={i} style={{ width: w, height: 4, background: "rgba(0,0,0,0.15)" }} />
          ))}
        </div>

        <div className="relative z-10">
          {/* Header — chip col1 | heading col2–4 (no gap, heading at 25% line) */}
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Reveal>
                <div
                  className="inline-flex items-center"
                  style={{ background: "#E6E6E6", padding: "8px 14px", borderRadius: 100, gap: 12 }}
                >
                  <span className="inline-flex items-center" style={{ gap: 4 }}>
                    <span
                      className="block"
                      style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
                    />
                    <span style={monoLabel}>(2022-26©)</span>
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <h1
                  style={{
                    fontFamily: '"Sora", sans-serif',
                    fontWeight: 600,
                    fontSize: "clamp(2.5rem, 7.16vw, 6.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    textTransform: "uppercase",
                    margin: 0,
                    maxWidth: 1000,
                  }}
                >
                  <span className="block" style={{ color: "var(--color-light-text)" }}>
                    Selected
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    Work.
                  </span>
                </h1>
              </Reveal>

              {/* sub-row: diamond rule col2 (tracks desc's last line) | desc col3 w330 */}
              <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 40 }}>
                <div className="hidden lg:block" aria-hidden="true" />
                <Reveal delay={0.15} className="lg:col-start-2 self-end">
                  <div className="relative" style={{ height: 25 }}>
                    <div
                      style={{ position: "absolute", left: 0, right: 0, top: 12, height: 1, background: "#CCCCCC" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        fontSize: 16,
                        lineHeight: "25px",
                        color: "var(--color-light-muted)",
                      }}
                    >
                      ✦
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.2} className="lg:col-start-3">
                  <p
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontWeight: 400,
                      fontSize: 18,
                      lineHeight: "25.2px",
                      color: "#686868",
                      maxWidth: 330,
                      margin: 0,
                    }}
                  >
                    A curated collection of projects showcasing my expertise in full-stack
                    development, AI/ML, and problem-solving.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Cards — 2-col, gap 20, header strip + full-bleed 657/491 image */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20, marginTop: 100 }}>
            {projects.slice(0, 6).map((project, i) => (
              <Reveal key={project.title} delay={(i % 4) * 0.08}>
                <Link to={`/projects/${slugify(project.title)}`} className="group block">
                  <div
                    className="flex items-center justify-between"
                    style={{ background: "#EBEBEB", padding: "6px 12px" }}
                  >
                    <span className="flex items-center min-w-0" style={{ gap: 16 }}>
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
                      <span
                        style={{
                          ...monoLabel,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {project.title}
                      </span>
                    </span>
                    <span className="flex items-center shrink-0" style={{ gap: 4 }}>
                      <span style={monoCat}>/ {project.tags[0]}</span>
                    </span>
                  </div>

                  <div className="overflow-hidden bg-black" style={{ aspectRatio: "657 / 491" }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* 30px light gap → orange contact (verified seam at y2270/2300) */}
      <div style={{ height: 30, background: "var(--color-light-bg)" }} />
      <Contact variant="inner" />
      <Footer />
    </div>
  );
}
