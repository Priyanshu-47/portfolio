import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { experience } from "../data/resume";
import AnimatedLinesBand from "./AnimatedLinesBand";

/* Riwa "05 WORKFLOW" section — rebuilt to the corrected measured spec:
   section : bg light rgb(240,240,240), pad 120/24, 2-col 50/50 gap 0,
             page-style vertical lines visible (17 / 25 / 50 / 75 / right17,
             pure white per user rule), band "Lines 2" (dark bars) at the
             04 → 05 top seam.
   left    : chip pill #E6E6E6 r100 pad 8/14 (orange dot 10 + mono 14
             #686868) → 20 → h2 Sora 600 70px/70px -0.06em uppercase
             two-tone (leading rgb(11,13,20), base rgb(94,94,94)) → 32 →
             CTA link w333 h66 "Dark with image": inner button 288×66
             (bg rgb(8,10,16) r40, 1px #FFF solid border, pad 20/20/20/24,
             Sora 600 16 white uppercase text-roll, icon 26 white circle +
             orange cross rotate-45 on hover) + 66×66 avatar circle
             right-flush, overlapping the button by 21px — user's home
             portrait (./portrait.png), object-cover like the hero avatar.
   right   : WHITE cards rgb(255,255,255), pad 24, h158 (content 110),
             gap 8, no radius/shadow; three corner cuts (SVG filled with
             the section bg, carving the card):
             TL 12×8  `M 0 8 L 12 0 L 0 0 Z`
             TR 218×29 stepped `M 0 0 L 218 0 L 218 29 L 203.5 8 L 14 8 Z`
             BR 66.5×23.5 stepped `M 66.5 0 L 66.5 23.5 L 0 23.5 L 37 9 L 56 9 Z`
             content: row h33 — dashed connector line (1px #CCC, full card
             content width, vertically centered — passes through the pill)
             + pill (pad 8/14, r100, 1px dashed #CCC) = icon 14×14 (orange
             masked glyph) + gap 24 + number mono 14 #686868 "001"
             → 20 → title IBM Plex Mono 24/28.8 -0.96px rgb(11,13,20)
             → 6 → desc Geist 16/22.4 rgb(94,94,94).
   icons   : Riwa's five workflow glyphs (framer-SkWSw / h3wxp / Ia6VR /
             aZdkB / xuJSm masks, paths + viewBox/transform extracted from
             riwa-ssr.css), cycled per step.
   Verified overrides: none yet (content-stage: CTA label/href, copy). */

const monoLabel: CSSProperties = {
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

/* Button icon: 26×26 white circle + orange 4-arrow cross (light-section
   variant of the same sprite Riwa uses — circle #FFF, glyphs #D63614) */
const BTN_CIRCLE =
  "M 13 26 C 5.82 26 0 20.18 0 13 L 0 13 C 0 5.82 5.82 0 13 0 L 13 0 C 20.18 0 26 5.82 26 13 L 26 13 C 26 20.18 20.18 26 13 26 Z";
const BTN_CROSS =
  "M 13 21.667 L 13 17.333 C 13 14.94 11.06 13 8.667 13 L 4.333 13 M 21.667 13 L 17.333 13 C 14.94 13 13 14.94 13 17.333 L 13 21.667 M 13 4.333 L 13 8.667 C 13 11.06 14.94 13 17.333 13 L 21.667 13 M 4.333 13 L 8.667 13 C 11.06 13 13 11.06 13 8.667";
const BTN_DIAMOND = "M 13 15.708 L 10.292 13 L 13 9.75 L 15.708 13 Z";

/* Step icon masks — exact d paths from riwa-ssr.css (vb = viewBox of the
   mask svg, tr = path transform) */
const STEP_ICONS: { vb: string; tr: string; d: string }[] = [
  {
    vb: "0 0 14 14",
    tr: "translate(1 1)",
    d: "M 0 2.065 C 0 0.925 0.925 0 2.065 0 C 3.388 0 4.369 1.226 4.08 2.516 L 3 7.342 L 5.973 7.342 L 9 7.342 L 7.92 2.516 C 7.631 1.226 8.612 0 9.935 0 C 11.075 0 12 0.925 12 2.065 L 12 10.247 C 12 11.215 11.215 12 10.247 12 L 1.753 12 C 0.785 12 0 11.215 0 10.247 Z",
  },
  {
    vb: "0 0 14 15",
    tr: "translate(1 1)",
    d: "M 6.763 1.838 C 6.763 2.212 7.258 2.345 7.445 2.021 L 8.182 0.743 C 8.283 0.568 8.507 0.509 8.682 0.61 L 9.368 1.006 C 9.543 1.107 9.603 1.33 9.502 1.505 L 8.826 2.675 C 8.639 2.999 9.001 3.362 9.325 3.175 L 10.496 2.499 C 10.671 2.398 10.894 2.458 10.995 2.633 L 11.391 3.319 C 11.492 3.494 11.432 3.718 11.258 3.819 L 10.081 4.498 C 9.757 4.685 9.89 5.18 10.264 5.18 L 11.634 5.18 C 11.836 5.18 12 5.343 12 5.545 L 12 6.338 C 12 6.539 11.836 6.703 11.634 6.703 L 10.166 6.703 C 9.792 6.703 9.659 7.198 9.983 7.385 L 11.258 8.121 C 11.432 8.222 11.492 8.445 11.391 8.62 L 10.995 9.306 C 10.894 9.48 10.671 9.54 10.496 9.439 L 9.327 8.765 C 9.003 8.578 8.641 8.941 8.828 9.264 L 9.502 10.43 C 9.603 10.605 9.543 10.829 9.368 10.93 L 8.682 11.326 C 8.507 11.427 8.283 11.367 8.182 11.192 L 7.445 9.914 C 7.258 9.59 6.763 9.723 6.763 10.097 L 6.763 11.876 C 6.763 12.078 6.599 12.241 6.397 12.241 L 5.606 12.241 C 5.404 12.241 5.24 12.078 5.24 11.876 L 5.24 10.397 C 5.24 10.023 4.745 9.89 4.558 10.214 L 3.818 11.497 C 3.717 11.672 3.493 11.732 3.318 11.631 L 2.632 11.235 C 2.457 11.134 2.397 10.91 2.498 10.735 L 3.171 9.569 C 3.358 9.245 2.995 8.883 2.671 9.07 L 1.504 9.744 C 1.329 9.845 1.106 9.785 1.005 9.61 L 0.609 8.925 C 0.508 8.75 0.568 8.527 0.742 8.426 L 2.544 7.385 C 2.868 7.198 2.735 6.703 2.361 6.703 L 0.366 6.703 C 0.164 6.703 0 6.539 0 6.338 L 0 5.545 C 0 5.343 0.164 5.18 0.366 5.18 L 1.735 5.18 C 2.109 5.18 2.242 4.685 1.918 4.498 L 0.742 3.819 C 0.568 3.718 0.508 3.494 0.609 3.319 L 1.005 2.633 C 1.106 2.458 1.329 2.398 1.504 2.499 L 2.674 3.175 C 2.998 3.362 3.361 2.999 3.174 2.675 L 2.498 1.505 C 2.397 1.33 2.457 1.107 2.632 1.006 L 3.318 0.61 C 3.493 0.509 3.717 0.568 3.818 0.743 L 4.558 2.026 C 4.745 2.35 5.24 2.217 5.24 1.843 L 5.24 0.366 C 5.24 0.164 5.404 0 5.606 0 L 6.397 0 C 6.599 0 6.763 0.164 6.763 0.366 Z",
  },
  {
    vb: "0 0 14 14",
    tr: "translate(0 1)",
    d: "M 10.604 12 L 3.399 12 C 2.514 12 1.797 11.314 1.797 10.468 C 1.797 9.622 2.514 8.937 3.399 8.937 L 10.604 8.937 C 11.49 8.937 12.207 9.622 12.207 10.468 C 12.207 11.314 11.49 12 10.604 12 Z M 12.41 9.013 C 11.861 9.013 11.323 8.735 11.02 8.253 L 7.423 2.299 C 6.986 1.57 7.244 0.628 8.006 0.21 C 8.768 -0.207 9.754 0.039 10.191 0.767 L 13.788 6.722 C 14.225 7.45 13.967 8.392 13.205 8.81 C 12.948 8.949 12.679 9.013 12.41 9.013 Z M 1.596 9.011 C 1.327 9.011 1.047 8.946 0.8 8.807 C 0.038 8.39 -0.231 7.447 0.217 6.719 L 3.814 0.765 C 4.251 0.037 5.238 -0.22 6 0.208 C 6.762 0.626 7.03 1.568 6.582 2.296 L 2.985 8.25 C 2.694 8.732 2.156 9.011 1.596 9.011 Z",
  },
  {
    vb: "0 0 14 14",
    tr: "translate(1 1)",
    d: "M 2 12 C 0.895 12 0 11.105 0 10 L 0 2 C 0 0.895 0.895 0 2 0 L 10 0 C 11.105 0 12 0.895 12 2 L 12 10 C 12 11.105 11.105 12 10 12 Z M 6 9 C 7.657 9 9 7.657 9 6 C 9 4.343 7.657 3 6 3 C 4.343 3 3 4.343 3 6 C 3 7.657 4.343 9 6 9 Z",
  },
  {
    vb: "0 0 14 14",
    tr: "",
    d: "M 9.335 0.885 L 9.335 3.786 C 9.335 4.279 8.943 4.671 8.45 4.671 L 5.552 4.671 C 5.06 4.671 4.668 4.279 4.668 3.786 L 4.668 0.885 C 4.668 0.392 5.06 0 5.552 0 L 8.45 0 C 8.932 0 9.335 0.392 9.335 0.885 Z M 4.668 13.115 L 4.668 10.214 C 4.668 9.721 5.06 9.329 5.552 9.329 L 8.45 9.329 C 8.943 9.329 9.335 9.721 9.335 10.214 L 9.335 13.115 C 9.335 13.608 8.943 14 8.45 14 L 5.552 14 C 5.071 14 4.668 13.597 4.668 13.115 Z M 10.218 4.657 L 13.116 4.657 C 13.609 4.657 14.001 5.049 14.001 5.542 L 14.001 8.443 C 14.001 8.936 13.609 9.328 13.116 9.328 L 10.218 9.328 C 9.726 9.328 9.334 8.936 9.334 8.443 L 9.334 5.542 C 9.334 5.06 9.726 4.657 10.218 4.657 Z M 0.884 4.657 L 3.783 4.657 C 4.275 4.657 4.667 5.049 4.667 5.542 L 4.667 8.443 C 4.667 8.936 4.275 9.328 3.783 9.328 L 0.884 9.328 C 0.392 9.328 0 8.936 0 8.443 L 0 5.542 C 0 5.06 0.403 4.657 0.884 4.657 Z",
  },
];

function stepIconMask(i: number): string {
  const m = STEP_ICONS[i % STEP_ICONS.length];
  const tr = m.tr ? ` transform='${m.tr}'` : "";
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${m.vb}'%3E%3Cpath d='${m.d}'${tr} fill='black'/%3E%3C/svg%3E")`;
}

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

export default function Experience() {
  return (
    <section
      className="bg-[var(--color-light-bg)] relative"
      style={{ padding: "120px 24px" }}
    >
      {/* 5 vertical white lines — Riwa's page overlay shows through this
          light section (dicto Projects: 17 / 25 / 50 / 75 / right17) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      {/* 04 → 05 boundary band (Riwa "Lines 2"): dark bars over this
          section's light bg, anchored at the top seam */}
      <AnimatedLinesBand placement="top" />

      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-start">
          {/* Left: chip → heading → CTA + avatar */}
          <div>
            <Reveal>
              <div style={{ marginBottom: 20 }}>
                {/* Riwa chip: pad 8/14, gap 12, radius 100, bg #E6E6E6, dot 10px */}
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
                    <span style={monoLabel}>05</span>
                  </span>
                  <span style={monoLabel}>experience</span>
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
                }}
              >
                <span style={{ color: "var(--color-light-text)" }}>Work </span>
                <span style={{ color: "var(--color-light-muted)" }}>
                  History
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ marginTop: 32 }}>
                {/* Riwa "Dark with image" CTA: dark pill (1px white border)
                    + avatar circle overlapping the right edge by 21px.
                    Label/href: content-stage adjustable */}
                <a
                  href="#contact"
                  className="group"
                  style={{
                    display: "block",
                    position: "relative",
                    width: 333,
                    maxWidth: "100%",
                    height: 66,
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="absolute left-0 top-0 flex items-center justify-center"
                    style={{
                      width: 288,
                      maxWidth: "100%",
                      height: 66,
                      gap: 16,
                      padding: "20px 20px 20px 24px",
                      borderRadius: 40,
                      background: "var(--color-dark-bg)",
                      border: "1px solid #FFFFFF",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Text-roll — Riwa flips justify-content instantly and a
                        JS spring smooths the jump; we animate transform
                        directly with the spring curve captured from the live
                        site (420ms, ~1.4% overshoot — .btn-roll in index.css) */}
                    <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                      <div className="btn-roll">
                        <span style={btnTextStyle}>Get in touch</span>
                        <span style={btnTextStyle}>Get in touch</span>
                      </div>
                    </div>
                    <div
                      className="group-hover:rotate-45 transition-transform duration-300"
                      style={{ width: 26, height: 26, flexShrink: 0 }}
                    >
                      <svg
                        width={26}
                        height={26}
                        viewBox="0 0 26 26"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d={BTN_CIRCLE} fill="#FFFFFF" />
                        <path
                          d={BTN_CROSS}
                          stroke="var(--color-orange-deep)"
                          strokeMiterlimit="10"
                          fill="transparent"
                        />
                        <path d={BTN_DIAMOND} fill="var(--color-orange-deep)" />
                      </svg>
                    </div>
                  </div>
                  {/* avatar — 66×66 circle, right-flush (button 288, link
                      333 → 21px overlap), painted above the pill; the user's
                      home portrait, object-cover exactly like the hero's */}
                  <span
                    className="absolute top-0 overflow-hidden"
                    style={{
                      right: 0,
                      width: 66,
                      height: 66,
                      borderRadius: "50%",
                    }}
                    aria-hidden="true"
                  >
                    <img
                      src="/portrait.png"
                      alt="Priyanshu Lodha"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: white step cards (001 / role / company · location · period) */}
          <div className="mt-16 lg:mt-0">
            {experience.map((exp, i) => {
              const iconMask = stepIconMask(i);
              return (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="relative bg-white"
                    style={{
                      padding: 24,
                      marginBottom: i < experience.length - 1 ? 8 : 0,
                    }}
                  >
                    {/* corner cuts — fill = section bg, carving the card */}
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

                    {/* number row: dashed connector line (full content
                        width, centered) + dashed pill (icon + number) */}
                    <div
                      className="relative flex items-center"
                      style={{ height: 33 }}
                    >
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: 0,
                          width: "100%",
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderTop: "1px dashed #CCCCCC",
                        }}
                      />
                      <span
                        className="relative inline-flex items-center"
                        style={{
                          gap: 24,
                          height: 33,
                          padding: "8px 14px",
                          boxSizing: "border-box",
                          borderRadius: 100,
                          border: "1px dashed #CCCCCC",
                          background: "transparent",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          className="block"
                          style={{
                            width: 14,
                            height: 14,
                            background: "rgb(214, 54, 20)",
                            WebkitMaskImage: iconMask,
                            maskImage: iconMask,
                            WebkitMaskSize: "100% 100%",
                            maskSize: "100% 100%",
                            WebkitMaskPosition: "50% 50%",
                            maskPosition: "50% 50%",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          }}
                        />
                        <span style={monoLabel}>
                          {String(i + 1).padStart(3, "0")}
                        </span>
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontWeight: 500,
                        fontSize: "clamp(20px, 1.74vw, 24px)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.04em",
                        color: "var(--color-light-text)",
                        marginTop: 20,
                      }}
                    >
                      {exp.role}
                    </h4>

                    <p
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "22.4px",
                        color: "var(--color-light-muted)",
                        margin: 0,
                        marginTop: 6,
                      }}
                    >
                      {exp.company} · {exp.location} · {exp.period}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
