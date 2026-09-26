import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

/* Riwa "07 CLIENT STORIES" section — live-verified (d-client-a/b):
   section : bg #080A10 DARK, NO vertical lines, pad 120/24 (full-bleed),
             faint circle arc bottom-left + diagonal hairline decor.
   left    : dark chip 07 (bg #21242B, r100, pad 8/14, mono 500 14 #CCC,
             orange dot) → h2 Sora 600 70/70 -4.2px uppercase two-tone
             (line1 #FFF, line2 #9E9E9E) → CTA pill "ALL STORIES"
             (dark #080A10, r40, 1px #FFF border, h66, Sora 600 16
             uppercase text-roll + 16px arrow).
   right   : 2-col masonry of WHITE quote cards (gap 24, ~321 each), left
             column staggered +160 below right. Card: three corner cuts
             carved by section bg (TL 12×8 / TR 218×29 / BR 66.5×23.5),
             pad ~36/40; row [orange 4-dot glyph 16 | "#1" mono 14 gray]
             → quote IBM Plex Mono 400 15/19.5 -0.3 #080A10 → bottom row
             [avatar 48 circle | NAME mono 500 uppercase + role Geist 15
             #5E5E5E].
   Content: existing 3 testimonials (avatar = initials gradient placeholder
   until real photos arrive). */

const testimonials = [
  {
    quote:
      "Priyanshu took a vague idea and returned a working full-stack build — clean APIs, a polished interface, and docs we could actually maintain.",
    author: "Project Collaborator",
    role: "Tech Lead",
  },
  {
    quote:
      "He moves fast without cutting corners. Most of our trickiest bugs ended up explained in his pull requests.",
    author: "Team Member",
    role: "Senior Developer",
  },
  {
    quote:
      "From database schema to deployment he owned every layer — exactly the full-stack partner you want on an early build.",
    author: "Client",
    role: "Startup Founder",
  },
];

/* Card corner cuts — Riwa svg sprites; fill = section bg carving the card */
const CARD_CUTS = [
  { w: 12, h: 8, d: "M 0 8 L 12 0 L 0 0 Z", pos: "top-0 left-0" },
  {
    w: 218,
    h: 29,
    d: "M 0 0 L 218 0 L 218 29 L 203.5 8 L 14 8 Z",
    pos: "top-0 right-0",
  },
  {
    w: 66.5,
    h: 23.5,
    d: "M 66.5 0 L 66.5 23.5 L 0 23.5 L 37 9 L 56 9 Z",
    pos: "bottom-0 right-0",
  },
];

const monoLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#CCCCCC",
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

function QuoteGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="var(--color-orange)" aria-hidden="true">
      <circle cx="8" cy="2.8" r="2.6" />
      <circle cx="13.2" cy="8" r="2.6" />
      <circle cx="8" cy="13.2" r="2.6" />
      <circle cx="2.8" cy="8" r="2.6" />
    </svg>
  );
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function QuoteCard({ t, n }: { t: (typeof testimonials)[number]; n: number }) {
  return (
    <div className="relative bg-white" style={{ padding: "36px 40px 40px" }}>
      {/* corner cuts — fill = section bg (dark), carving the white card */}
      {CARD_CUTS.map((c) => (
        <svg
          key={c.pos}
          className={`absolute ${c.pos} pointer-events-none`}
          width={c.w}
          height={c.h}
          viewBox={`0 0 ${c.w} ${c.h}`}
          fill="var(--color-dark-bg)"
          aria-hidden="true"
        >
          <path d={c.d} />
        </svg>
      ))}

      {/* glyph | #n */}
      <div className="flex items-center justify-between">
        <QuoteGlyph />
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.56px",
            color: "#5E5E5E",
          }}
        >
          #{n}
        </span>
      </div>

      {/* quote */}
      <p
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 400,
          fontSize: 15,
          lineHeight: "19.5px",
          letterSpacing: "-0.3px",
          color: "#080A10",
          margin: 0,
          marginTop: 32,
        }}
      >
        {t.quote}
      </p>

      {/* avatar | name / role */}
      <div className="flex items-center" style={{ gap: 16, marginTop: 44 }}>
        <span
          className="flex items-center justify-center shrink-0"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E9681E, #D63614)",
            fontFamily: '"Sora", sans-serif',
            fontWeight: 600,
            fontSize: 15,
            color: "#FFFFFF",
          }}
          aria-hidden="true"
        >
          {initialsOf(t.author)}
        </span>
        <span>
          <span
            className="block"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: "-0.3px",
              textTransform: "uppercase",
              color: "#0B0D14",
            }}
          >
            {t.author}
          </span>
          <span
            className="block"
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 15,
              lineHeight: "21px",
              color: "#5E5E5E",
              marginTop: 2,
            }}
          >
            {t.role}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const left: typeof testimonials = [testimonials[0], testimonials[2]];
  const right: typeof testimonials = [testimonials[1]];

  return (
    <section
      id="testimonials"
      className="bg-[var(--color-dark-bg)] relative overflow-hidden"
      style={{ padding: "120px 24px" }}
    >
      {/* decor: faint circle arc bottom-left + diagonal hairline (Riwa) */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          left: -220,
          bottom: -260,
          width: 640,
          height: 640,
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          left: 140,
          top: 180,
          width: 1,
          height: 900,
          background: "rgba(255, 255, 255, 0.05)",
          transform: "rotate(-38deg)",
          transformOrigin: "top center",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-start">
        {/* Left: chip → heading → CTA */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div style={{ marginBottom: 24 }}>
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
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      background: "rgb(214, 54, 20)",
                    }}
                  />
                  <span style={monoLabel}>07</span>
                </span>
                <span style={monoLabel}>testimonials</span>
              </div>
            </div>
          </Reveal>

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
              <span className="block" style={{ color: "var(--color-dark-text)" }}>
                Kind
              </span>
              <span className="block" style={{ color: "var(--color-dark-secondary)" }}>
                Words.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ marginTop: 40 }}>
              {/* CTA pill — dark, 1px white border, text-roll + 16px arrow */}
              <a href="#contact" className="group" style={{ textDecoration: "none" }}>
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
                      <span style={btnTextStyle}>All stories</span>
                      <span style={btnTextStyle}>All stories</span>
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

        {/* Right: 2-col staggered white quote cards */}
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-6 lg:mt-[160px]">
            {left.map((t, i) => (
              <Reveal key={t.author} delay={0.1 + i * 0.1}>
                <QuoteCard t={t} n={i === 0 ? 1 : 3} />
              </Reveal>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {right.map((t) => (
              <Reveal key={t.author} delay={0.2}>
                <QuoteCard t={t} n={2} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
