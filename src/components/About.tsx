import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { profile } from "../data/resume";

/* Riwa "04 ABOUT US" section — measured live on riwadesign (section name "About us"):
   header : h2 75% LEFT (Sora 600, 70px, -0.06em, uppercase, two-tone)
            + chip 25% RIGHT (pill #21242B, mono 14 #CCC)
   desc   : 4-col grid — empty | sparkle + hairline (25%→50%, line y+89) |
            p (Geist 18/25.2, #9E9E9E) | empty
   cards  : 4 × #14171D, pad 10/24/24, min-h 246, stepped corner cuts (fill = section bg),
            icon (orange, inset 26) + label (mono 14, white-75) → title (mono 16/19.2,
            +46) → desc (Geist 15) → ghost number (mono 600 54, bg-col, right-flush,
            clipped 9px at bottom)
   CTA    : memory-chip photo frame (w-content × h800, bg #000, notch sprites
            TL 391×52 / TR 35×23 / BL 122×63 in section bg) holding a
            grayscale photo (placeholder → user image later), scrim, the
            Sora 600 80px edge-fade scrolling ticker + centered 288×66 pill,
            all vertically centered in the frame.
   User-verified overrides: heading→cards gap raised to 140, card gap 8→24,
   card description line-height 21→24. */

type Feature = { n: string; icon: "dots" | "tri"; title: string; description: string };

const features: Feature[] = [
  {
    n: "01",
    icon: "dots",
    title: "Full-Stack Expertise",
    description:
      "End-to-end development with .NET, React, AWS — from database schema to pixel-perfect UI.",
  },
  {
    n: "02",
    icon: "tri",
    title: "AI-Accelerated Development",
    description:
      "Cursor AI woven into daily workflow for code generation, debugging, documentation and impact analysis.",
  },
  {
    n: "03",
    icon: "dots",
    title: "Enterprise-Grade Quality",
    description:
      "Secure, scalable applications built for production — Auth0, Salesforce, Appian integrations.",
  },
  {
    n: "04",
    icon: "tri",
    title: "Long-term Impact",
    description:
      "Building systems that evolve — not just launch. Production support, monitoring, and continuous improvement.",
  },
];

/* Riwa card corner cuts (extracted from their svg sprite; fill = section bg) */
const CUT_CARD_TL = "M 11 126 L 0 140 L 0 0 L 30 0 L 11 15.328 Z"; /* 30×140 */
const CUT_CARD_TR = "M 9 11.083 L 0 0 L 43 0 L 43 87 L 9 50 Z"; /* 43×87 */
const CUT_CARD_BR = "M 0 0 L 0 0 L 0 16 L 15.83 16 L 0 0 Z"; /* 16×16 */

/* Chip-frame notch sprites — painted in the SECTION bg color ON TOP of the
   photo frame, carving Riwa's memory-chip silhouette (extracted from Riwa's
   #svg-1973985276_274 / svg779842434_274 / #svg-72157396_241 defs):
   top-left 391×52 stepped notch | top-right 35×23 corner cut |
   bottom-left 122×63 stepped deco (Riwa #svg779842434_274, same path) */
const CHIP_NOTCH_TL = "M 391 0 L 0 0 L 0 52 L 26.007 14.345 L 365.89 14.345 Z";
const DECO_BOTTOM_LEFT = "M 0 0 L 0 63 L 122 63 L 54.12 24.128 L 19.263 24.128 Z";

/* Marquee edge-fade mask (Riwa: linear-gradient 0/5%/95%/100%) */
const EDGE_FADE =
  "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";

/* Chip-frame photo placeholder — grayscale office-tone gradient; swap for
   the user's real image later (Riwa photo: framerusercontent EW5tkzMc…png) */
const FRAME_PHOTO_PLACEHOLDER =
  "radial-gradient(ellipse 70% 55% at 32% 38%, #575757, transparent 72%), radial-gradient(ellipse 45% 60% at 78% 72%, #2e2e2e, transparent 70%), #0a0a0a";

const SPARKLE_D =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

/* Button icon: 26×26 dark circle + 4-arrow cross (#CCC) */
const BTN_CIRCLE =
  "M 13 26 C 5.82 26 0 20.18 0 13 L 0 13 C 0 5.82 5.82 0 13 0 L 13 0 C 20.18 0 26 5.82 26 13 L 26 13 C 26 20.18 20.18 26 13 26 Z";
const BTN_CROSS =
  "M 13 21.667 L 13 17.333 C 13 14.94 11.06 13 8.667 13 L 4.333 13 M 21.667 13 L 17.333 13 C 14.94 13 13 14.94 13 17.333 L 13 21.667 M 13 4.333 L 13 8.667 C 13 11.06 14.94 13 17.333 13 L 21.667 13 M 4.333 13 L 8.667 13 C 11.06 13 13 11.06 13 8.667";
const BTN_DIAMOND = "M 13 15.708 L 10.292 13 L 13 9.75 L 15.708 13 Z";

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

const btnTextStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  color: "#0B0D14",
  whiteSpace: "nowrap",
};

const LABELS = ["First", "Second", "Third", "Fourth"];

function FeatureIcon({ kind }: { kind: "dots" | "tri" }) {
  if (kind === "dots") {
    return (
      <svg width={18} height={18} viewBox="0 0 18 18" fill="var(--color-orange)" aria-hidden="true">
        <circle cx="9" cy="2.6" r="2.3" />
        <circle cx="15.4" cy="9" r="2.3" />
        <circle cx="9" cy="15.4" r="2.3" />
        <circle cx="2.6" cy="9" r="2.3" />
      </svg>
    );
  }
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="var(--color-orange)" aria-hidden="true">
      <path d="M9 2.4 L16.2 15.6 L1.8 15.6 Z" />
    </svg>
  );
}

function FeatureCard({ f, i }: { f: Feature; i: number }) {
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <div
        className="relative overflow-hidden bg-[var(--color-dark-card)] h-full"
        style={{ padding: "10px 24px 24px", minHeight: 246 }}
      >
        {/* stepped corner cuts — fill = section bg */}
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={30}
          height={140}
          viewBox="0 0 30 140"
          fill="var(--color-dark-bg)"
          aria-hidden="true"
        >
          <path d={CUT_CARD_TL} />
        </svg>
        <svg
          className="absolute top-0 right-0 pointer-events-none"
          width={43}
          height={87}
          viewBox="0 0 43 87"
          fill="var(--color-dark-bg)"
          aria-hidden="true"
        >
          <path d={CUT_CARD_TR} />
        </svg>
        <svg
          className="absolute bottom-0 right-0 pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="var(--color-dark-bg)"
          aria-hidden="true"
        >
          <path d={CUT_CARD_BR} />
        </svg>

        {/* icon (inset 26) + label */}
        <div className="flex items-center" style={{ paddingLeft: 26, gap: 8 }}>
          <FeatureIcon kind={f.icon} />
          <span style={{ ...monoLabel, color: "rgba(255, 255, 255, 0.75)" }}>{LABELS[i]}</span>
        </div>

        <h4
          style={{
            ...monoBase,
            fontSize: 16,
            lineHeight: "19.2px",
            color: "#FFFFFF",
            margin: 0,
            marginTop: 46,
          }}
        >
          {f.title}
        </h4>

        <p
          className="font-body"
          style={{
            fontSize: 15,
            lineHeight: "24px",
            color: "var(--color-dark-secondary)",
            margin: 0,
            marginTop: 8,
          }}
        >
          {f.description}
        </p>

        {/* ghost number — right-flush, hangs 9px past the card (clipped by overflow) */}
        <span
          style={{
            position: "absolute",
            right: 0,
            bottom: -9,
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: 54,
            lineHeight: "60px",
            color: "var(--color-dark-bg)",
          }}
        >
          {f.n}
        </span>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[var(--color-dark-bg)]"
      style={{ padding: "120px 24px" }}
    >
      {/* No vertical lines here — verified dicto: Riwa's About section shows no
          white lines (their line elements in this range are 1px transparent
          rgba(0,0,0,0) and never paint; confirmed visually). Matched: none. */}

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header — heading 75% LEFT, chip 25% RIGHT (row-reverse on desktop;
            stacks chip-first on mobile) */}
        <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start lg:gap-0">
          <Reveal className="lg:w-1/4 flex justify-start lg:justify-end">
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
                <span style={{ ...monoLabel, color: "#CCCCCC" }}>04</span>
              </span>
              <span style={{ ...monoLabel, color: "#CCCCCC" }}>about me</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:w-3/4">
            <h2
              style={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 5.01vw, 4.375rem)",
                lineHeight: 1,
                letterSpacing: "-0.06em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              <span style={{ color: "var(--color-dark-text)" }}>The Team Behind Your </span>
              <span style={{ color: "var(--color-dark-secondary)" }}>Projects.</span>
            </h2>
          </Reveal>
        </div>

        {/* Description row — 4-col grid: empty | sparkle + hairline | paragraph | empty */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4">
          <div className="hidden lg:block" />
          <div className="hidden lg:block relative" style={{ paddingTop: 89 }}>
            <div style={{ height: 1, background: "#34363B", width: "100%" }} />
            <svg
              className="absolute"
              width={19}
              height={19}
              viewBox="0 0 19 19"
              style={{ left: -9, top: 79.5 }}
              aria-hidden="true"
            >
              <path d={SPARKLE_D} fill="#34363B" />
            </svg>
          </div>
          <p
            className="font-body"
            style={{
              fontSize: 18,
              lineHeight: 1.4,
              color: "var(--color-dark-secondary)",
              textWrap: "balance",
              margin: 0,
            }}
          >
            My goal is to combine strategy, design, and technology to create experiences that
            build trust and deliver results.
          </p>
          <div className="hidden lg:block" />
        </div>

        {/* Feature cards — gap 24 (user: increased from Riwa's 8);
            heading block → cards = 140 (user: increased) */}
        <div className="mt-[140px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.n} f={f} i={i} />
          ))}
        </div>

        {/* Memory-chip photo frame — Riwa's About CTA zone: full-content-width
            black frame (h800), grayscale photo (placeholder until user
            supplies the real image) dimmed by a dark scrim, section-bg notch
            overlays carving the chip silhouette, with the tagline marquee +
            centered CTA pill inside. Frame → section bottom = 120 pad. */}
        <div
          className="relative mt-10 overflow-hidden h-[560px] md:h-[680px] lg:h-[800px]"
          style={{ background: "#000000" }}
        >
          {/* photo layer — grayscale, dimmed, slightly zoomed (Riwa: grayscale(1)
              opacity .64 scale 1.25) */}
          <div
            className="absolute inset-0"
            style={{
              filter: "grayscale(1)",
              opacity: 0.64,
              transform: "scale(1.25)",
            }}
          >
            <div
              className="w-full h-full"
              style={{ background: FRAME_PHOTO_PLACEHOLDER }}
            />
          </div>
          {/* scrim (Riwa: rgba(8,10,16,0.3) @ opacity .8) */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(8, 10, 16, 0.3)", opacity: 0.8 }}
          />

          {/* chip notch overlays — section-bg colored, carving the photo */}
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={391}
            height={52}
            viewBox="0 0 391 52"
            fill="var(--color-dark-bg)"
            aria-hidden="true"
          >
            <path d={CHIP_NOTCH_TL} />
          </svg>
          <svg
            className="absolute top-0 right-0 pointer-events-none"
            width={35}
            height={23}
            viewBox="0 0 35 23"
            fill="var(--color-dark-bg)"
            aria-hidden="true"
          >
            <path d="M 35 23 L 0 0 L 35 0 Z" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 pointer-events-none"
            width={122}
            height={63}
            viewBox="0 0 122 63"
            fill="var(--color-dark-bg)"
            aria-hidden="true"
          >
            <path d={DECO_BOTTOM_LEFT} />
          </svg>

          {/* content — marquee (edge-fade) + CTA, vertically centered
              (Riwa: wrapper top +301 of 800, gap 32) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ gap: 32 }}
          >
            <div
              className="w-full overflow-hidden"
              style={{ padding: 10, WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
            >
              <div className="marquee-track">
                {[0, 1].map((k) => (
                  <span
                    key={k}
                    aria-hidden={k === 1}
                    style={{
                      fontFamily: '"Sora", sans-serif',
                      fontWeight: 600,
                      fontSize: "clamp(40px, 5.73vw, 80px)",
                      lineHeight: 1,
                      letterSpacing: "-0.06em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                      paddingRight: 60,
                    }}
                  >
                    {profile.tagline}
                  </span>
                ))}
              </div>
            </div>

            <a href="#contact" className="group block w-[288px] max-w-full no-underline">
              <div
                className="flex items-center justify-center"
                style={{
                  gap: 16,
                  padding: "20px 20px 20px 24px",
                  borderRadius: 40,
                  background: "#FFFFFF",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  className="flex flex-col overflow-hidden justify-start group-hover:justify-end transition-[justify-content] duration-300"
                  style={{ height: 16 }}
                >
                  <span style={btnTextStyle}>Get in touch</span>
                  <span style={btnTextStyle}>Get in touch</span>
                </div>
                <div
                  className="group-hover:rotate-45 transition-transform duration-300"
                  style={{ width: 26, height: 26, flexShrink: 0 }}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                    <path d={BTN_CIRCLE} fill="var(--color-dark-surface)" />
                    <path
                      d={BTN_CROSS}
                      stroke="#CCCCCC"
                      strokeMiterlimit="10"
                      fill="transparent"
                    />
                    <path d={BTN_DIAMOND} fill="#CCCCCC" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
