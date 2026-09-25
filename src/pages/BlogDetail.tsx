import { useParams, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AnimatedLinesBand from "../components/AnimatedLinesBand";
import { profile } from "../data/resume";
import { articles, slugify, BLOG_ICON_MASK, PLACEHOLDERS } from "./BlogPage";

/* Riwa /blog/:slug — live-verified (rp-bdet-1..4 + DOM probes @ vw1398):
   dark article section #080A10 y0 h3098 pad "160px 24px 120px",
   5 vertical lines rgba(255,255,255,0.15);
   LEFT: sticky image box (sticky top60, overflow clip) 600×620, notched
     corners = cut overlays 43×87 TL, 30×140 TR, 16×16 BL (BR square) —
     reproduced with an exact-ratio clip-path, dark bg shows through;
   RIGHT (grid cols 3–4, Riwa x692 w668):
     date pill y160 — dark chip #21242B pad8/14 gap12 r100, orange dot
       10 + mono 500 14/17 uppercase #CCCCCC,
     H1 row y255 (mt62) — "/" Sora600 48/48 #9E9E9E gap11 + title
       Sora600 48/48 #F1F1F1 uppercase maxWidth640 (natural tracking),
     lead block ml50% mt108 — rule row h21: 1px #34363B line at top10
       + 19px 4-point sparkle svg hanging left −9 (fill #34363B) →
       excerpt Geist 18/25.2 #9E9E9E mt4 → author row mt80: avatar 40
       round + name mono 14 uppercase rgba(255,255,255,0.8) +
       role Geist 15/21 #9E9E9E,
     body mt100 — p Geist 18/25.2 #9E9E9E mt20; h4 IBM Plex Mono 500
       24/28.8 #FFF mt40; ul mt0 pl24 disc, li packed (line-height 25.2);
     MORE block mt100 — dark chip INSIGHTS + H3 mt20 Sora600 48/48
       uppercase two-tone #FFF/#9E9E9E → cards mt40 grid-cols-2 gap9
       h420: strip h30 #F1F1F1 pad6/12 gap16 (glyph14 orange + date
       mono 14 uppercase #6A6A6A) / image flex-1 / title pad12 mono
       16/19.2 #F1F1F1, hover scale105.
   seam: dark strip h70 bg #080A10 with Riwa "Lines 1" band (orange bars
   2/4/6/8/10, gaps 10, 70→30 on scroll) → orange Contact inner y3168
   h1052 → Footer (docH 4841).
   Content: dummy article body; date/year + titles from the user's list. */

/* Riwa's exact 19×19 4-point sparkle (svg-160579582_315) */
const STAR_PATH =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

/* notched-corner cut: 43×87 TL, 30×140 TR, 16×16 BL, BR square (of 600×620) */
const IMAGE_CUT =
  "polygon(7.167% 0, 95% 0, 100% 22.581%, 100% 100%, 2.667% 100%, 0 97.581%, 0 14.032%)";

const chipDark: CSSProperties = {
  background: "#21242B",
  padding: "8px 14px",
  borderRadius: 100,
  gap: 12,
};

const chipDot: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "100%",
  background: "rgb(214, 54, 20)",
  flexShrink: 0,
};

const pillLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "17px",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "#CCCCCC",
  whiteSpace: "nowrap",
};

const bodyP: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "25.2px",
  color: "#9E9E9E",
  margin: 0,
  marginTop: 20,
};

const bodyH4: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 24,
  lineHeight: "28.8px",
  color: "#FFFFFF",
  margin: 0,
  marginTop: 40,
};

const displayTitle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(32px, 4vw, 48px)",
  lineHeight: 1,
  textTransform: "uppercase",
  margin: 0,
};

/* Dummy body — 4 mono-H4 sections, Riwa's block rhythm (mt20 p / mt40 h4 /
   mt0 ul), line-count-matched so the column flows like the reference. */
function ArticleBody() {
  return (
    <div style={{ marginTop: 100 }}>
      <p style={{ ...bodyP, marginTop: 0 }}>
        Great software is built on decisions that compound over time.
      </p>
      <p style={bodyP}>
        This piece walks through the principles behind systems that last.
      </p>
      <p style={bodyP}>
        From architecture to delivery, every layer benefits from a shared set
        of conventions that keep teams aligned and products predictable.
      </p>

      <h4 style={bodyH4}>From Structure to Experience</h4>
      <p style={bodyP}>
        Interfaces are no longer judged by a single screen but by the rhythm
        that connects every state, transition, and edge case across the
        journey.
      </p>
      <p style={bodyP}>Every interaction matters:</p>
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: 24,
          margin: 0,
          marginTop: 0,
          fontFamily: '"Geist", sans-serif',
          fontWeight: 400,
          fontSize: 18,
          lineHeight: "25.2px",
          color: "#9E9E9E",
        }}
      >
        <li>keep teams aligned</li>
        <li>make trade-offs visible</li>
        <li>reduce review cycles</li>
        <li>and compound effort over time</li>
      </ul>
      <p style={bodyP}>
        When the system carries the thinking, individual features can evolve
        without breaking the whole.
      </p>

      <h4 style={bodyH4}>Why Systems Thinking Wins</h4>
      <p style={bodyP}>
        Teams that document the why behind a choice move faster six months
        later, when context has faded and the stakes have grown.
      </p>
      <p style={bodyP}>
        A shared language turns reviews into decisions and keeps quality
        consistent as more people contribute.
      </p>

      <h4 style={bodyH4}>Designing for Change</h4>
      <p style={bodyP}>
        Change is the only constant in a product's life, so the foundation
        should bend long before it breaks.
      </p>
      <p style={bodyP}>
        Modular components, clear boundaries, and honest naming make
        refactors feel routine instead of risky.
      </p>

      <h4 style={bodyH4}>What Lasts Beyond the Launch</h4>
      <p style={bodyP}>
        Products that endure treat launch as the first checkpoint rather than
        the finish line.
      </p>
      <p style={bodyP}>
        Measurement, iteration, and honest feedback loops turn early momentum
        into durable growth, and they only work when the underlying system
        is legible to everyone who touches it.
      </p>
      <p style={bodyP}>Build once, refine forever.</p>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const article =
    articles.find((a) => slugify(a.title) === slug) ?? articles[0];
  const more = articles.filter((a) => a !== article).slice(0, 2);

  return (
    <div>
      {/* ── dark article section ─────────────────────────────────────── */}
      <section
        className="relative"
        style={{ background: "#080A10", padding: "160px 24px 120px" }}
      >
        {/* 5 vertical lines — white @15% on dark (24 inset, quarter-spaced) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-px block"
                style={{ background: "rgba(255, 255, 255, 0.15)" }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4">
          {/* LEFT — sticky notched image box (cols 1–2, w600) */}
          <div className="lg:col-span-2 mb-14 lg:mb-0">
            <div
              className="lg:sticky lg:top-[60px]"
              style={{
                width: "100%",
                maxWidth: 600,
                height: "clamp(380px, 106vw, 620px)",
                overflow: "clip",
              }}
            >
              {/* image slot — grayscale placeholder until the real photo arrives */}
              <div
                className="w-full h-full"
                style={{
                  clipPath: IMAGE_CUT,
                  background:
                    "radial-gradient(ellipse 70% 55% at 32% 38%, #3d3d3d, transparent 72%), radial-gradient(ellipse 45% 60% at 78% 72%, #232323, transparent 70%), #060606",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* RIGHT — text column (cols 3–4) */}
          <div className="lg:col-span-2">
            {/* date pill */}
            <Reveal>
              <div className="inline-flex items-center" style={chipDark}>
                <span className="block" style={chipDot} />
                <span style={pillLabel}>{article.date}</span>
              </div>
            </Reveal>

            {/* "/" + title */}
            <Reveal delay={0.1}>
              <div className="flex" style={{ marginTop: 62 }}>
                <span
                  aria-hidden="true"
                  style={{
                    ...displayTitle,
                    color: "#9E9E9E",
                    marginRight: 11,
                    flexShrink: 0,
                  }}
                >
                  /
                </span>
                <h1
                  style={{
                    ...displayTitle,
                    color: "#F1F1F1",
                    maxWidth: 640,
                  }}
                >
                  {article.title}
                </h1>
              </div>
            </Reveal>

            {/* lead block — indented to col 4: sparkle rule + excerpt + author */}
            <Reveal delay={0.15}>
              <div style={{ marginLeft: "50%", width: "50%", marginTop: 108 }}>
                <div className="relative" style={{ height: 21 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 10,
                      height: 1,
                      background: "#34363B",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: -9,
                      top: 0,
                      width: 19,
                      height: 19,
                      color: "#34363B",
                    }}
                  >
                    <svg
                      viewBox="0 0 19 19"
                      width="19"
                      height="19"
                      aria-hidden="true"
                    >
                      <path d={STAR_PATH} fill="currentColor" />
                    </svg>
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: "25.2px",
                    color: "#9E9E9E",
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  {article.excerpt}
                </p>

                {/* author — avatar 40 + name/role */}
                <div
                  className="flex items-center"
                  style={{ gap: 8, marginTop: 80 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      flexShrink: 0,
                      background:
                        "radial-gradient(circle at 35% 30%, #4a4a4a, #1d1d1d)",
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: 14,
                        lineHeight: "17px",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.8)",
                        margin: 0,
                      }}
                    >
                      {profile.name}
                    </p>
                    <p
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontWeight: 400,
                        fontSize: 15,
                        lineHeight: "21px",
                        color: "#9E9E9E",
                        margin: 0,
                      }}
                    >
                      {profile.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* body */}
            <Reveal>
              <ArticleBody />
            </Reveal>

            {/* MORE ARTICLES — chip + two-tone H3 + 2 cards */}
            <div style={{ marginTop: 100 }}>
              <Reveal>
                <div className="inline-flex items-center" style={chipDark}>
                  <span className="block" style={chipDot} />
                  <span style={pillLabel}>Insights</span>
                </div>
                <h3
                  style={{
                    ...displayTitle,
                    marginTop: 20,
                    color: "#9E9E9E",
                    maxWidth: 668,
                  }}
                >
                  <span style={{ color: "#FFFFFF" }}>More </span>
                  Articles.
                </h3>
              </Reveal>

              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: 9, marginTop: 40 }}
              >
                {more.map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.08}>
                    <Link
                      to={`/blog/${slugify(a.title)}`}
                      className="group block"
                      style={{ height: 420 }}
                    >
                      <div className="flex flex-col h-full">
                        {/* date strip h30 */}
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
                              ...pillLabel,
                              color: "#6A6A6A",
                              fontSize: 14,
                              letterSpacing: "-0.56px",
                            }}
                          >
                            {a.date}
                          </span>
                        </div>

                        {/* image — flex-fill, hover scale */}
                        <div
                          className="flex-1 overflow-hidden bg-black"
                          style={{ minHeight: 0 }}
                        >
                          <div
                            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                            style={{
                              background: PLACEHOLDERS[(i + 1) % 5],
                            }}
                          />
                        </div>

                        {/* title box pad12 — mono 16/19.2, light on dark */}
                        <div className="shrink-0" style={{ padding: 12 }}>
                          <p
                            style={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: 16,
                              lineHeight: "19.2px",
                              fontWeight: 500,
                              color: "#F1F1F1",
                              margin: 0,
                            }}
                          >
                            {a.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── seam: dark strip h70 + Riwa "Lines 1" band (orange 2/4/6/8/10)
             → orange contact ────────────────────────────────────────── */}
      <div className="relative" style={{ height: 70, background: "#080A10" }}>
        <AnimatedLinesBand
          placement="bottom"
          color="rgb(214, 54, 20)"
          lineHeights={[2, 4, 6, 8, 10]}
          gapPx={10}
          containerFrom={70}
          containerTo={30}
          gapColor="transparent"
        />
      </div>
      <Contact variant="inner" />
      <Footer />
    </div>
  );
}
