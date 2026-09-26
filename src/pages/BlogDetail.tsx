import { useParams, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AnimatedLinesBand from "../components/AnimatedLinesBand";
import { profile } from "../data/resume";
import { articles, slugify, BLOG_ICON_MASK } from "./BlogPage";

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
   Content: real per-article body copy (3 posts); date/year + titles from the user's list. */

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

/* Real article bodies — 4 mono-H4 sections each, Riwa's block rhythm (mt20 p /
   mt40 h4 / mt0 ul). Blocks are data so every article renders its own copy. */
type BodyBlock =
  | { t: "p"; text: string }
  | { t: "h4"; text: string }
  | { t: "ul"; items: string[] };

const BODIES: Record<string, BodyBlock[]> = {
  "building-scalable-react-applications": [
    {
      t: "p",
      text: "Scalability in a React codebase is rarely about React itself — it is about the boundaries you draw around state, data and rendering.",
    },
    {
      t: "p",
      text: "After building dashboards and internal tools that grew from a handful of screens to dozens, the patterns that kept them fast were almost always the boring ones.",
    },
    {
      t: "p",
      text: "This is a walk-through of the decisions that let a React + TypeScript app keep shipping without turning into a rewrite.",
    },
    { t: "h4", text: "Boundaries Before Components" },
    {
      t: "p",
      text: "Decide where state lives before you decide what the component tree looks like. Server data, URL state and UI state want very different lifecycles, and mixing them is how a two-line change starts touching twelve files.",
    },
    { t: "p", text: "A rule that has held up well:" },
    {
      t: "ul",
      items: [
        "keep server cache out of component state",
        "derive everything else instead of storing it",
        "push route state into the router",
        "give every shared component one reason to change",
      ],
    },
    {
      t: "p",
      text: "When those boundaries are explicit, a new feature mostly means adding a file rather than editing a web of existing ones.",
    },
    { t: "h4", text: "Types That Pay For Themselves" },
    {
      t: "p",
      text: "TypeScript is only worth its compile time when illegal states become unrepresentable. Discriminated unions for view state, exact payloads for API responses, and a hard rule against `any` at module boundaries do more for correctness than any linter.",
    },
    {
      t: "p",
      text: "The payoff shows up in review: most bugs become compile errors, and the ones that survive are genuinely interesting.",
    },
    { t: "h4", text: "Rendering On Purpose" },
    {
      t: "p",
      text: "Most performance problems I have fixed were not algorithmic — they were unnecessary renders caused by inline object literals, unstable context values, and lists that never got virtualized.",
    },
    {
      t: "p",
      text: "Fix causes in the order the profiler reports them. Memoize where the flame graph points, not where you suspect, and virtualize only when the list is actually long — premature memoization costs more readability than it saves frames.",
    },
    { t: "h4", text: "What Scales In Practice" },
    {
      t: "p",
      text: "A React app scales when a new engineer can answer three questions quickly: where does this data come from, who owns this state, and what breaks if this prop changes shape.",
    },
    {
      t: "p",
      text: "If those answers live in the structure of the code instead of someone's head, the project scales — regardless of which state library you picked.",
    },
    { t: "p", text: "Structure first. Libraries second." },
  ],
  "the-art-of-clean-code": [
    {
      t: "p",
      text: "Clean code is not a style. It is a communication strategy for people who will read the file long after you have forgotten writing it.",
    },
    {
      t: "p",
      text: "Most so-called legacy pain is really decisions that were never written down, spread across files that never explain themselves.",
    },
    { t: "p", text: "These are the habits I keep returning to in review." },
    { t: "h4", text: "Names That Carry Meaning" },
    {
      t: "p",
      text: "A name should say what a value is for, not how it was implemented. `retryBudgetMs` beats `timeout2`, and `loadPolicy()` beats `handleData()` every time.",
    },
    { t: "p", text: "When a name needs a comment to make sense, the name is the problem:" },
    {
      t: "ul",
      items: [
        "prefer specific, searchable nouns",
        "encode units inside the name",
        "delete abbreviations nobody defines",
        "let structure replace explanation",
      ],
    },
    { t: "p", text: "The best comment is a function that no longer needs one." },
    { t: "h4", text: "Small Functions, Honest Boundaries" },
    {
      t: "p",
      text: "A function does one thing only when its boundary is honest. If a helper secretly mutates its argument or reaches for a global, it is doing three things no matter how few lines it has.",
    },
    {
      t: "p",
      text: "I look for a clear input contract, no hidden side effects, and a name that matches the body. Anything else is a future bug with good intentions.",
    },
    { t: "h4", text: "Make The Wrong Thing Hard" },
    {
      t: "p",
      text: "Codebases drift toward whatever is easiest to write next. If the easy path skips validation, logging or authorization, that is exactly what ships under deadline.",
    },
    {
      t: "p",
      text: "Guardrails — typed helpers, shared middleware, safe defaults — matter more than guidelines in a README, because guidelines are read once and helpers are used daily.",
    },
    { t: "h4", text: "Refactor In Small Steps" },
    {
      t: "p",
      text: "Big-bang rewrites are where clean code earns its reputation for being risky. The safer version is a sequence of boring, reversible changes, each one shipping green.",
    },
    {
      t: "p",
      text: "Delete dead code first — it is the highest-return refactor there is, and it never breaks anybody.",
    },
    { t: "p", text: "Readable beats clever. Every time." },
  ],
  "full-stack-deployment-with-docker": [
    {
      t: "p",
      text: "Containerizing a full-stack app is easy for an afternoon and hard for a year — the difference is what happens after `docker run` works on your laptop.",
    },
    {
      t: "p",
      text: "This is the setup I keep returning to for React + .NET applications: one image per service, one compose file for local, one pipeline for everything else.",
    },
    { t: "p", text: "Nothing here is exotic. It is mostly about making the boring parts repeatable." },
    { t: "h4", text: "One Image Per Service" },
    {
      t: "p",
      text: "Build the frontend in a Node stage, copy the output into an nginx stage, and keep the API image limited to the runtime its SDK actually needs. Multi-stage builds are the difference between a 1.2 GB image and a 90 MB one.",
    },
    { t: "p", text: "Rules that keep images small and builds cached:" },
    {
      t: "ul",
      items: [
        "pin base image versions",
        "copy lockfiles before source",
        "never bake secrets into layers",
        "run as a non-root user",
        "tag by commit, not by branch",
      ],
    },
    {
      t: "p",
      text: "Once layers cache well, a deploy is mostly the time it takes to copy the last artifact.",
    },
    { t: "h4", text: "Configuration Belongs At Runtime" },
    {
      t: "p",
      text: "Images that need environment variables at build time become images you must rebuild for every environment. Read config at startup, fail fast when something required is missing, and let one identical image move from staging to production.",
    },
    {
      t: "p",
      text: "That single rule removes an entire category of works-on-my-machine bugs.",
    },
    { t: "h4", text: "Local Parity Without Pain" },
    {
      t: "p",
      text: "Compose should mirror production topology — separate database, API and web containers, named volumes for state, healthchecks before dependents start — without pretending to be a cluster.",
    },
    {
      t: "p",
      text: "If a developer can bring the whole stack up with one command, onboarding stops being a wiki article nobody trusts.",
    },
    { t: "h4", text: "Ship It" },
    {
      t: "p",
      text: "In CI, build once, scan the image, push it, then deploy that exact artifact. Rebuilding during deploy means the thing in production was never tested anywhere.",
    },
    {
      t: "p",
      text: "Containers are ephemeral, so stdout is the contract: structured logs and a driver that persists them are not optional.",
    },
    {
      t: "p",
      text: "Containers will not fix a messy architecture — but they will make a clean one repeatable.",
    },
  ],
};

function ArticleBody({ slug }: { slug: string }) {
  const blocks = BODIES[slug] ?? Object.values(BODIES)[0];
  let first = true;
  return (
    <div style={{ marginTop: 100 }}>
      {blocks.map((b, i) => {
        if (b.t === "h4") {
          return (
            <h4 key={i} style={bodyH4}>
              {b.text}
            </h4>
          );
        }
        if (b.t === "ul") {
          return (
            <ul
              key={i}
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
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        const isFirst = first;
        first = false;
        return (
          <p key={i} style={{ ...bodyP, marginTop: isFirst ? 0 : undefined }}>
            {b.text}
          </p>
        );
      })}
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
              {/* image — article cover, notched corners */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                style={{ clipPath: IMAGE_CUT }}
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
              <ArticleBody slug={slugify(article.title)} />
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
                          <img
                            src={a.image}
                            alt={a.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
