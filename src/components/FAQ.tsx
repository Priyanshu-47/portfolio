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
   right   : stacked WHITE cards gap 8 (pad 24/30), carved by section bg
             (same svg corner cuts), top row: dashed pill r100 pad 8/14
             (orange glyph 14 + number mono 14 #686868) + dotted line
             flex-1 (1px dotted #CCC) + plus circle 48 (1px solid #D8D8D8,
             plus icon rotates 45° when open) → question IBM Plex Mono 500
             22/26.4 -0.88 #0B0D14 (tt none) → answer Geist 16/24 #5E5E5E.
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

function PillGlyph() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="var(--color-orange)" aria-hidden="true">
      <circle cx="7" cy="2.4" r="2.3" />
      <circle cx="11.6" cy="7" r="2.3" />
      <circle cx="7" cy="11.6" r="2.3" />
      <circle cx="2.4" cy="7" r="2.3" />
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
                <div className="relative bg-white" style={{ padding: "24px 30px" }}>
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

                  {/* top row: dashed pill + dotted line + plus circle */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex items-center w-full text-left"
                    style={{ gap: 24, background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
                  >
                    <span
                      className="inline-flex items-center shrink-0"
                      style={{
                        gap: 16,
                        padding: "8px 14px",
                        border: "1px dashed #CCCCCC",
                        borderRadius: 100,
                      }}
                    >
                      <PillGlyph />
                      <span
                        style={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: 14,
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
                      style={{ borderTop: "1px dotted #CCCCCC", minWidth: 24 }}
                      aria-hidden="true"
                    />

                    <span
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        border: "1px solid #D8D8D8",
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
                          stroke="#0B0D14"
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
                      marginTop: 28,
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
