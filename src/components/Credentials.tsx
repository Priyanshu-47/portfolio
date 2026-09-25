import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { certifications, education } from "../data/resume";
import AnimatedLinesBand from "./AnimatedLinesBand";

/* Riwa "08 PRICE" section — live-verified (d-pricing-a/b):
   section : bg light #F0F0F0, pad 120/24 (full-bleed), page 5-line white
             overlay visible (17 / 25 / 50 / 75 / right17), dark 5-line band
             at BOTH seams (07→08 top: dark client section ends; 08→next
             bottom: pricing → dark human-side — same "bars = dark side,
             painted on the light backdrop" rule as Experience/Projects).
   header  : LEFT chip 08 (pill #E6E6E6, r100, pad 8/14, mono 500 14
             #686868, orange dot) → h2 Sora 600 80/80 -4.8px uppercase
             two-tone (line1 #0B0D14, line2 #5E5E5E) | RIGHT description
             Geist 18/25.2 #5E5E5E (~50% col, w455) — Riwa's toggle omitted
             (single pricing model, content-stage).
   cards  : 3-col grid gap 8, WHITE cards carved by the section bg (same
             svg corner cuts as workflow/benefits cards), pad 24/24/24/32;
             anatomy: mono 14 uppercase #E9681E eyebrow → title Sora 600
             36/-2.16 two-tone-capable #0B0D14 → para Geist 16/22.4 #5E5E5E.
   Content: user's education (3) + certifications (5) = 8 entries. */

type Entry = { eyebrow: string; title: string; body: string };

const entries: Entry[] = [
  ...education.map((edu) => ({
    eyebrow: "Education",
    title: edu.school,
    body: [edu.degree, edu.period, edu.location].filter(Boolean).join(" · "),
  })),
  ...certifications.map((cert) => ({
    eyebrow: "Certification",
    title: cert.title,
    body: [cert.issuer, cert.period].filter(Boolean).join(" · "),
  })),
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

const monoChip: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

function Card({ e }: { e: Entry }) {
  return (
    <div className="relative bg-white" style={{ padding: "24px 24px 24px 32px" }}>
      {/* corner cuts — fill = section bg (light), carving the white card */}
      {CARD_CUTS.map((c) => (
        <svg
          key={c.pos}
          className={`absolute ${c.pos} pointer-events-none`}
          width={c.w}
          height={c.h}
          viewBox={`0 0 ${c.w} ${c.h}`}
          fill="var(--color-light-bg)"
          aria-hidden="true"
        >
          <path d={c.d} />
        </svg>
      ))}

      <p
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 14,
          lineHeight: "16.8px",
          fontWeight: 500,
          letterSpacing: "-0.56px",
          textTransform: "uppercase",
          color: "var(--color-orange)",
          margin: 0,
        }}
      >
        {e.eyebrow}
      </p>

      <h3
        style={{
          fontFamily: '"Sora", sans-serif',
          fontWeight: 600,
          fontSize: "clamp(1.5rem, 2.57vw, 2.25rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.06em",
          color: "var(--color-light-text)",
          margin: 0,
          marginTop: 18,
          textTransform: "none",
        }}
      >
        {e.title}
      </h3>

      <p
        style={{
          fontFamily: '"Geist", sans-serif',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "22.4px",
          color: "var(--color-light-muted)",
          margin: 0,
          marginTop: 14,
        }}
      >
        {e.body}
      </p>
    </div>
  );
}

export default function Credentials() {
  return (
    <section
      id="credentials"
      className="bg-[var(--color-light-bg)] relative"
      style={{ padding: "120px 24px" }}
    >
      {/* band: 07 (dark) → 08 (light) — dark bars on the light backdrop */}
      <AnimatedLinesBand placement="top" />

      {/* 5 vertical white lines — dicto Riwa pricing (17 / 25 / 50 / 75 / r17) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      <div className="relative z-10">
        {/* header row: chip left (25%) | heading + desc right (75%) gap 60 */}
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
                  <span style={monoChip}>08</span>
                </span>
                <span style={monoChip}>credentials</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3" style={{ marginTop: 24 }}>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(2.5rem, 5.79vw, 5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                <span className="block" style={{ color: "var(--color-light-text)" }}>
                  Education &amp;
                </span>
                <span className="block" style={{ color: "var(--color-light-muted)" }}>
                  Certs.
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
                The academic foundation and the certifications behind the work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3-col card grid gap 8, 100px below header */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 8, marginTop: 100 }}
        >
          {entries.map((e, i) => (
            <Reveal key={`${e.eyebrow}-${i}`} delay={(i % 3) * 0.1}>
              <Card e={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
