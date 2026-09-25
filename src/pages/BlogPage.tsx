import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/* Riwa /blog — live-verified (rp-blog-1/2/3, DOM probes @ vw1398):
   page  : light #F0F0F0, docH 3538 — header y120 (chip INSIGHTS pill
           #E6E6E6 x24 y120 h33 dot+label gap12, NO number) | h1 col2–4
           x357.8 w1000 Sora 600 100/100 -6px two-tone → sub-row:
           desc col3 x690 y360 w330 Geist 18/25.2 #686868 (3 lines → h76)
           + diamond rule col2 x357.8 w330 h1 #CCC y425 = centered on the
           desc's LAST line (tracks desc bottom −12.6).
           grid y536 (mt100) — 4 cols = page quarters (cells touch, card
           w = cell −6), row gap 100, checkerboard card heights 360/520
           (col parity), each card flex-col: strip h30 #F1F1F1 pad6/12
           (glyph 14 mask rounded-square+dot hole orange + date mono 500
           14 uppercase #6A6A6A, row gap16) → image flex-1 bg black
           grayscale, hover scale105 → title box pad12 IBM Plex Mono
           500 16/19.2 #0B0D14 (1–2 lines; title box absorbs card height,
           image fills the rest).
           grid bottom 1676 → pad160 → white 1px divider → 30px light →
           orange contact y1866 h1052 (H2 y1986) → footer y2918 h620.
   lines : 5 vertical 1px white at x24/357/690/1024/1357 — bg-white.
   decor : sheared-bars Riwa mark svg 44×98 right24 top120 (6 bars #CCC
           + 3 bars #FFF, viewBox 0 0 44.075 97.499, par none).
   Content: user's articles (title / date). H1 keeps user's "Latest
   Articles" copy in Riwa's two-tone 2-line rhythm. */

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const articles = [
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

/* Riwa date-strip glyph: rounded square (r2) with a punched center dot */
export const BLOG_ICON_MASK =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath fill-rule='evenodd' d='M 2 12 C 0.895 12 0 11.105 0 10 L 0 2 C 0 0.895 0.895 0 2 0 L 10 0 C 11.105 0 12 0 12 2 L 12 10 C 12 11.105 11.105 14 10 14 L 2 14 C 0.895 14 0 13.105 0 12 Z M 7 4.5 C 5.619 4.5 4.5 5.619 4.5 7 C 4.5 8.381 5.619 9.5 7 9.5 C 8.381 9.5 9.5 8.381 9.5 7 C 9.5 5.619 8.381 4.5 7 4.5 Z' fill='black'/%3E%3C/svg%3E")`;

/* Riwa's exact sheared-bars mark (top-right decor) */
export const DECOR_BARS_1 =
  "M 44.075 97.499 L 0 97.499 L 44.075 89.348 L 44.075 97.498 Z M 44.075 86.329 L 0 86.329 L 44.075 78.178 L 44.075 86.328 Z M 44.075 75.159 L 0 75.159 L 44.075 67.008 L 44.075 75.158 Z M 44.075 63.99 L 0 63.99 L 44.075 55.84 L 44.075 63.989 Z M 44.075 52.82 L 0 52.82 L 44.075 44.67 Z M 44.075 41.65 L 0 41.65 L 44.075 33.5 Z";
export const DECOR_BARS_2 =
  "M 44.075 30.49 L 0 30.49 L 44.075 22.34 Z M 44.075 19.32 L 0 19.32 L 44.075 11.17 Z M 44.075 8.15 L 0 8.15 L 44.075 0 Z";

/* Grayscale placeholders matching Riwa's photo tone — replace with real images later */
export const PLACEHOLDERS = [
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

export default function BlogPage() {
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

        {/* Decor — sheared-bars mark, right:24, top:120, 44×98 */}
        <svg
          className="absolute hidden lg:block"
          style={{ right: 24, top: 120, width: 44, height: 98 }}
          viewBox="0 0 44.075 97.499"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={DECOR_BARS_1} fill="rgb(204, 204, 204)" />
          <path d={DECOR_BARS_2} fill="#FFFFFF" />
        </svg>

        <div className="relative z-10">
          {/* Header — chip col1 | heading col2–4 */}
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Reveal>
                <div
                  className="inline-flex items-center"
                  style={{ background: "#E6E6E6", padding: "8px 14px", borderRadius: 100, gap: 12 }}
                >
                  <span
                    className="block"
                    style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
                  />
                  <span style={monoLabel}>Insights</span>
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
                    Latest
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    Articles.
                  </span>
                </h1>
              </Reveal>
            </div>
          </div>

          {/* sub-row: diamond rule (25% col, tracks desc's last line) | desc (50% col, w330) */}
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
                Thoughts on development, design, and the tech industry.
              </p>
            </Reveal>
          </div>

          {/* Cards — 4 cols = page quarters (cells touch, card w = cell −6),
              checkerboard heights 360/520, row gap 100 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 0, rowGap: 100, marginTop: 100 }}
          >
            {articles.map((article, i) => {
              const tall = i % 2 === 1;
              return (
                <Reveal key={article.title} delay={(i % 4) * 0.08}>
                  <Link
                    to={`/blog/${slugify(article.title)}`}
                    className="group block"
                    style={{ width: "calc(100% - 6px)", height: tall ? 520 : 360 }}
                  >
                    <div className="flex flex-col h-full">
                      {/* date strip h30 #F1F1F1 — glyph 14 + date mono 14 gap16 */}
                      <div
                        className="flex items-center shrink-0"
                        style={{
                          height: 30,
                          background: "#F1F1F1",
                          padding: "6px 12px",
                          gap: 16,
                          boxSizing: "border-box",
                        }}
                      >
                        <span
                          className="block shrink-0"
                          style={{
                            width: 14,
                            height: 14,
                            background: "rgb(214, 54, 20)",
                            WebkitMaskImage: BLOG_ICON_MASK,
                            maskImage: BLOG_ICON_MASK,
                            WebkitMaskSize: "auto",
                            maskSize: "auto",
                            WebkitMaskPosition: "50% 50%",
                            maskPosition: "50% 50%",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          }}
                        />
                        <span
                          style={{
                            ...monoLabel,
                            color: "#6A6A6A",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {article.date}
                        </span>
                      </div>

                      {/* image — flex-fill of the fixed card height, bg black letterbox */}
                      <div className="flex-1 overflow-hidden bg-black" style={{ minHeight: 0 }}>
                        <div
                          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ background: PLACEHOLDERS[i % 5] }}
                        />
                      </div>

                      {/* title box pad12 — mono 16/19.2 (absorbs card height) */}
                      <div className="shrink-0" style={{ padding: 12 }}>
                        <p
                          style={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: 16,
                            lineHeight: "19.2px",
                            fontWeight: 500,
                            color: "#0B0D14",
                            margin: 0,
                          }}
                        >
                          {article.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 30px light gap → orange contact (seam: divider y1836 / contact y1866) */}
      <div style={{ height: 30, background: "var(--color-light-bg)" }} />
      <Contact variant="inner" />
      <Footer />
    </div>
  );
}
