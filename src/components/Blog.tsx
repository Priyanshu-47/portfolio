import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import AnimatedLinesBand from "./AnimatedLinesBand";

/* Riwa "11 BLOG/INSIGHTS" section — live-verified (final-blogtop, d-blog-a/b):
   section : bg light #F0F0F0, pad 120/24 (full-bleed), 5-line white overlay
             (17 / 25 / 50 / 75 / right17), ORANGE 5-line band at the bottom
             (bars = next section's #D63614 painted over this light backdrop).
   header  : chip 11 (pill #E6E6E6, mono 500 14 #686868, orange dot) 25% |
             heading + desc + CTA 75%, gap 60. Heading Sora 70px -4.2px
             uppercase two-tone; desc Geist 18/25.2 #686868 w330 centered;
             CTA dark pill #080A10 r40 h66 "ALL ARTICLES" (Sora 600 16
             uppercase text-roll + 16px arrow).
   cards  : 3-col grid gap 8, pad 0: h200 #34363B image block (gradient
             placeholder until real covers arrive) → mono 13 #E9681E date →
             Sora 600/24 -1.44px title → Geist 15/21 #5E5E5E excerpt.
   Content: user's 3 blog posts. */

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

const monoChip: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

const btnTextStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  color: "#FFFFFF",
  whiteSpace: "nowrap",
};

const ARROW_D = "M 3 13 L 13 3 M 13 3 H 5.5 M 13 3 V 10.5";

export default function Blog() {
  return (
    <section
      id="blog"
      className="bg-[var(--color-light-bg)] relative"
      style={{ padding: "120px 24px" }}
    >
      {/* 5 vertical white lines — dicto Riwa blog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      <div className="relative z-10">
        {/* header row: chip left (25%) | heading + desc + CTA right (75%) gap 60 */}
        <div className="grid lg:grid-cols-4" style={{ columnGap: 60 }}>
          <div className="lg:col-span-1">
            <Reveal>
              <div
                className="inline-flex items-center"
                style={{
                  background: "#E6E6E6",
                  padding: "8px 14px",
                  borderRadius: 100,
                  gap: 12,
                }}
              >
                <span className="inline-flex items-center" style={{ gap: 4 }}>
                  <span
                    className="block"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      background: "rgb(214, 54, 20)",
                    }}
                  />
                  <span style={monoChip}>11</span>
                </span>
                <span style={monoChip}>blog</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3" style={{ marginTop: 24 }}>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(2.5rem, 5.07vw, 4.375rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                <span className="block" style={{ color: "var(--color-light-text)" }}>
                  Latest
                </span>
                <span className="block" style={{ color: "var(--color-light-muted)" }}>
                  Articles.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "25.2px",
                  color: "#686868",
                  width: 330,
                  maxWidth: "100%",
                  margin: "24px auto 0",
                  textAlign: "center",
                }}
              >
                Notes on full-stack engineering, architecture and the craft of shipping
                software.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ marginTop: 32 }} className="flex justify-center">
                <a href="/blog" className="group" style={{ textDecoration: "none" }}>
                  <div
                    className="inline-flex items-center justify-center"
                    style={{
                      height: 66,
                      gap: 16,
                      padding: "20px 24px",
                      borderRadius: 40,
                      background: "var(--color-dark-bg)",
                      border: "1px solid #FFFFFF",
                      boxSizing: "border-box",
                    }}
                  >
                    <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                      <div className="btn-roll">
                        <span style={btnTextStyle}>All articles</span>
                        <span style={btnTextStyle}>All articles</span>
                      </div>
                    </div>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      className="group-hover:rotate-45 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <path d={ARROW_D} stroke="#FFFFFF" strokeWidth="1.5" />
                    </svg>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3-col pad-0 cards, 80px below header */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 8, marginTop: 80 }}
        >
          {articles.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <article className="group cursor-pointer h-full flex flex-col">
                {/* image block — gradient placeholder until real covers arrive */}
                <div
                  className="overflow-hidden"
                  style={{ height: 200, background: "#34363B" }}
                >
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #34363B 0%, #21242B 55%, #14171D 100%)",
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.26px",
                    textTransform: "uppercase",
                    color: "var(--color-orange)",
                    margin: 0,
                    marginTop: 18,
                  }}
                >
                  {a.date} · {a.tag}
                </p>

                <h3
                  className="transition-colors duration-300 group-hover:text-[var(--color-orange)]"
                  style={{
                    fontFamily: '"Sora", sans-serif',
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: "1.2",
                    letterSpacing: "-0.06em",
                    color: "var(--color-light-text)",
                    margin: 0,
                    marginTop: 8,
                    textTransform: "none",
                  }}
                >
                  {a.title}
                </h3>

                <p
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontWeight: 400,
                    fontSize: 15,
                    lineHeight: "21px",
                    color: "var(--color-light-muted)",
                    margin: 0,
                    marginTop: 8,
                  }}
                >
                  {a.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* band: 11 (light) → 12 (orange contact) — orange bars on the light backdrop */}
      <AnimatedLinesBand color="rgb(214, 54, 20)" />
    </section>
  );
}
