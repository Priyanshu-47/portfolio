import { useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import AnimatedLinesBand from "./AnimatedLinesBand";

/* Riwa "10 FAQ" section — live-verified (d-faq-a/b):
   section : bg light #F0F0F0, pad 120/24 (full-bleed), 5-line white overlay
             (17 / 25 / 50 / 75 / right17), NO bands.
   left    : chip 10 (pill #E6E6E6, mono 500 14 #686868, orange dot) → h2
             Sora 600 80/80 -4.8px uppercase two-tone (line1 #0B0D14, line2
             #5E5E5E) → CTA pill "ASK A QUESTION" (dark #080A10, r40, 1px
             #FFF border, h66, Sora 600 16 uppercase text-roll + arrow).
   right   : stacked WHITE cards gap 8 (pad 24 all sides), carved by section
              bg (same svg corner cuts), top row h40 items-start: dashed pill
              r100 pad 8/14 gap 24 (per-item Riwa mask glyph 14 #D63614 +
              number mono 14 #686868 lh15 -> pill exactly 90x33) + dashed line
              flex-1 (1px dashed #CCC, +16 top -> sits at pill centre) + plus
              circle 40 (1px solid #CCC, plus icon #686868 rotates 45 deg when
              open) -> question mt13 IBM Plex Mono 500 22/26.4 -0.88 #0B0D14
              (tt none) -> answer Geist 16/24 #5E5E5E.
              (Probe-verified: card x696 w667, pill w90 h33, line x114 w558,
              circle x602 40x40, question y77 = 24+40+13, cards gap 8,
              glyphs = Riwa mask items 001-004 extracted live.)
   Multi-open accordion kept (Riwa opens each independently).
   Content: user's 4 FAQ entries.

   Inner variant (`variant="inner"`, /contact + /about — DOM-verified on
   /contact@1100): chip = dot + "FAQ" only (NO number, dot→text gap 12),
   heading = "BEFORE YOU / START." (same two-tone 80px), NO CTA pill,
   pad-top 190 (70px orange-lines band zone + 120), and the orange
   AnimatedLinesBand sits at the section's top edge (bars rgb(214,54,20)
   over the light bg right under the orange contact). */

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in React, TypeScript, Node.js, Python, and modern web technologies. I'm proficient in both frontend and backend development, with experience in cloud services like AWS and Docker.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes, I'm open to freelance projects and collaborations. Feel free to reach out through the contact page with your project details.",
  },
  {
    question: "What is your development process?",
    answer:
      "I follow an agile approach: understanding requirements, planning architecture, iterative development with regular check-ins, testing, and deployment. I emphasize clean code and documentation.",
  },
  {
    question: "Do you work with teams or solo?",
    answer:
      "Both! I'm comfortable working as part of a team or independently. I've experience with collaborative workflows using Git, code reviews, and agile methodologies.",
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

/* Riwa's per-item pill glyphs — <path>s extracted live from the Framer
   sprite masks (items 001-004; 14px box, fill = rgb(214,54,20) = our
   --color-orange-deep): 001 notched square, 002 16-ray sunburst,
   003 monument/wings, 004 frame + hole. */
const PILL_GLYPHS: Array<{ vb: string; t?: string; d: string }> = [
  {
    vb: "0 0 14 14",
    t: "translate(1 1)",
    d: "M 0 2.065 C 0 0.925 0.925 0 2.065 0 C 3.388 0 4.369 1.226 4.08 2.516 L 3 7.342 L 5.973 7.342 L 9 7.342 L 7.92 2.516 C 7.631 1.226 8.612 0 9.935 0 C 11.075 0 12 0.925 12 2.065 L 12 10.247 C 12 11.215 11.215 12 10.247 12 L 1.753 12 C 0.785 12 0 11.215 0 10.247 Z",
  },
  {
    vb: "0 0 14 15",
    d: "M 6.763 1.838 C 6.763 2.212 7.258 2.345 7.445 2.021 L 8.182 0.743 C 8.283 0.568 8.507 0.509 8.682 0.61 L 9.368 1.006 C 9.543 1.107 9.603 1.33 9.502 1.505 L 8.826 2.675 C 8.639 2.999 9.001 3.362 9.325 3.175 L 10.496 2.499 C 10.671 2.398 10.894 2.458 10.995 2.633 L 11.391 3.319 C 11.492 3.494 11.432 3.718 11.258 3.819 L 10.081 4.498 C 9.757 4.685 9.89 5.18 10.264 5.18 L 11.634 5.18 C 11.836 5.18 12 5.343 12 5.545 L 12 6.338 C 12 6.539 11.836 6.703 11.634 6.703 L 10.166 6.703 C 9.792 6.703 9.659 7.198 9.983 7.385 L 11.258 8.121 C 11.432 8.222 11.492 8.445 11.391 8.62 L 10.995 9.306 C 10.894 9.48 10.671 9.54 10.496 9.439 L 9.327 8.765 C 9.003 8.578 8.641 8.941 8.828 9.264 L 9.502 10.43 C 9.603 10.605 9.543 10.829 9.368 10.93 L 8.682 11.326 C 8.507 11.427 8.283 11.367 8.182 11.192 L 7.445 9.914 C 7.258 9.59 6.763 9.723 6.763 10.097 L 6.763 11.876 C 6.763 12.078 6.599 12.241 6.397 12.241 L 5.606 12.241 C 5.404 12.241 5.24 12.078 5.24 11.876 L 5.24 10.397 C 5.24 10.023 4.745 9.89 4.558 10.214 L 3.818 11.497 C 3.717 11.672 3.493 11.732 3.318 11.631 L 2.632 11.235 C 2.457 11.134 2.397 10.91 2.498 10.735 L 3.171 9.569 C 3.358 9.245 2.995 8.883 2.671 9.07 L 1.504 9.744 C 1.329 9.845 1.106 9.785 1.005 9.61 L 0.609 8.925 C 0.508 8.75 0.568 8.527 0.742 8.426 L 2.544 7.385 C 2.868 7.198 2.735 6.703 2.361 6.703 L 0.366 6.703 C 0.164 6.703 0 6.539 0 6.338 L 0 5.545 C 0 5.343 0.164 5.18 0.366 5.18 L 1.735 5.18 C 2.109 5.18 2.242 4.685 1.918 4.498 L 0.742 3.819 C 0.568 3.718 0.508 3.494 0.609 3.319 L 1.005 2.633 C 1.106 2.458 1.329 2.398 1.504 2.499 L 2.674 3.175 C 2.998 3.362 3.361 2.999 3.174 2.675 L 2.498 1.505 C 2.397 1.33 2.457 1.107 2.632 1.006 L 3.318 0.61 C 3.493 0.509 3.717 0.568 3.818 0.743 L 4.558 2.026 C 4.745 2.35 5.24 2.217 5.24 1.843 L 5.24 0.366 C 5.24 0.164 5.404 0 5.606 0 L 6.397 0 C 6.599 0 6.763 0.164 6.763 0.366 Z",
  },
  {
    vb: "0 0 14 14",
    t: "translate(0 1)",
    d: "M 10.604 12 L 3.399 12 C 2.514 12 1.797 11.314 1.797 10.468 C 1.797 9.622 2.514 8.937 3.399 8.937 L 10.604 8.937 C 11.49 8.937 12.207 9.622 12.207 10.468 C 12.207 11.314 11.49 12 10.604 12 Z M 12.41 9.013 C 11.861 9.013 11.323 8.735 11.02 8.253 L 7.423 2.299 C 6.986 1.57 7.244 0.628 8.006 0.21 C 8.768 -0.207 9.754 0.039 10.191 0.767 L 13.788 6.722 C 14.225 7.45 13.967 8.392 13.205 8.81 C 12.948 8.949 12.679 9.013 12.41 9.013 Z M 1.596 9.011 C 1.327 9.011 1.047 8.946 0.8 8.807 C 0.038 8.39 -0.231 7.447 0.217 6.719 L 3.814 0.765 C 4.251 0.037 5.238 -0.22 6 0.208 C 6.762 0.626 7.03 1.568 6.582 2.296 L 2.985 8.25 C 2.694 8.732 2.156 9.011 1.596 9.011 Z",
  },
  {
    vb: "0 0 14 14",
    t: "translate(1 1)",
    d: "M 2 12 C 0.895 12 0 11.105 0 10 L 0 2 C 0 0.895 0.895 0 2 0 L 10 0 C 11.105 0 12 0.895 12 2 L 12 10 C 12 11.105 11.105 12 10 12 Z M 6 9 C 7.657 9 9 7.657 9 6 C 9 4.343 7.657 3 6 3 C 4.343 3 3 4.343 3 6 C 3 7.657 4.343 9 6 9 Z",
  },
];

function PillGlyph({ i }: { i: number }) {
  const g = PILL_GLYPHS[i % PILL_GLYPHS.length];
  return (
    <svg
      width={14}
      height={14}
      viewBox={g.vb}
      fill="var(--color-orange-deep)"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d={g.d} transform={g.t} />
    </svg>
  );
}

type FAQBand = {
  color?: string;
  lineHeights?: number[];
  gapPx?: number;
  containerFrom?: number;
  containerTo?: number;
};

export default function FAQ({
  variant = "home",
  band = {},
}: {
  variant?: "home" | "inner";
  band?: FAQBand;
}) {
  // Riwa default = ALL COLLAPSED (answers aren't in the DOM until opened)
  const [open, setOpen] = useState<number[]>([]);
  const inner = variant === "inner";

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section
      id="faq"
      className="bg-[var(--color-light-bg)] relative"
      style={{ padding: inner ? "190px 24px 120px" : "120px 24px" }}
    >
      {/* Inner pages: lines band hugging the section's top seam (color/params
          vary per page — default = /contact's orange band) */}
      {inner && (
        <AnimatedLinesBand
          placement="top"
          color={band.color ?? "rgb(214, 54, 20)"}
          lineHeights={band.lineHeights ?? [12, 10, 8, 5, 1]}
          gapPx={band.gapPx ?? 6}
          containerFrom={band.containerFrom ?? 64}
          containerTo={band.containerTo ?? 28}
        />
      )}

      {/* 5 vertical white lines — dicto Riwa FAQ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      {/* Riwa FAQ grid gap = 0: items x692 w667 = two 667px cols, no gap */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-0 items-start">
        {/* LEFT: chip → heading → CTA */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div style={{ marginBottom: 24 }}>
              <div
                className="inline-flex items-center"
                style={{
                  background: "#E6E6E6",
                  padding: "8px 14px",
                  borderRadius: 100,
                  gap: 12,
                }}
              >
                <span className="inline-flex items-center" style={{ gap: inner ? 0 : 4 }}>
                  <span
                    className="block"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      background: "rgb(214, 54, 20)",
                    }}
                  />
                  {!inner && <span style={monoChip}>10</span>}
                </span>
                <span style={monoChip}>faq</span>
              </div>
            </div>
          </Reveal>

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
                {inner ? "Before You" : "Got"}
              </span>
              <span className="block" style={{ color: "var(--color-light-muted)" }}>
                {inner ? "Start." : "Questions?"}
              </span>
            </h2>
          </Reveal>

          {!inner && (
            <Reveal delay={0.2}>
            <div style={{ marginTop: 40 }}>
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
                      <span style={btnTextStyle}>Ask a question</span>
                      <span style={btnTextStyle}>Ask a question</span>
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
          )}
        </div>

        {/* RIGHT: white notched accordion cards */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          {faqs.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal key={f.question} delay={i * 0.08}>
                <div className="relative bg-white" style={{ padding: 24 }}>
                  {/* corner cuts — fill = section bg (light), carving the card */}
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

                  {/* top row h40: dashed pill + dashed line + plus circle 40 */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex items-start justify-between w-full text-left"
                    style={{ gap: 0, background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
                  >
                    <span
                      className="inline-flex items-center shrink-0"
                      style={{
                        gap: 24,
                        padding: "8px 14px",
                        border: "1px dashed #CCCCCC",
                        borderRadius: 100,
                      }}
                    >
                      <PillGlyph i={i} />
                      <span
                        style={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: 14,
                          lineHeight: "15px",
                          fontWeight: 500,
                          letterSpacing: "-0.56px",
                          color: "#686868",
                        }}
                      >
                        {String(i + 1).padStart(3, "0")}
                      </span>
                    </span>

                    <span
                      className="hidden sm:block flex-1"
                      style={{ borderTop: "1px dashed #CCCCCC", minWidth: 24, marginTop: 16 }}
                      aria-hidden="true"
                    />

                    <span
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "1px solid #CCCCCC",
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        className="transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        <path
                          d="M8 1.5 V14.5 M1.5 8 H14.5"
                          stroke="#686868"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* question */}
                  <h3
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 500,
                      fontSize: "clamp(1.125rem, 1.57vw, 1.375rem)",
                      lineHeight: "1.2",
                      letterSpacing: "-0.04em",
                      color: "var(--color-light-text)",
                      margin: 0,
                      marginTop: 13,
                      maxWidth: 560,
                      textTransform: "none",
                    }}
                  >
                    {f.question}
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: "24px",
                            color: "var(--color-light-muted)",
                            margin: 0,
                            marginTop: 14,
                            paddingBottom: 4,
                            maxWidth: 620,
                          }}
                        >
                          {f.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
