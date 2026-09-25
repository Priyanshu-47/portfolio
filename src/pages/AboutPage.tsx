import { useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import type { Variants } from "framer-motion";
import { Reveal } from "../components/Reveal";
import AnimatedLinesBand from "../components/AnimatedLinesBand";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import { profile } from "../data/resume";
import { PLACEHOLDERS, CARD_ICON_MASK } from "./ProjectsPage";
import { articles, slugify, DECOR_BARS_1, DECOR_BARS_2 } from "./BlogPage";

/* Riwa /about — live-verified (rb-00..rb-11 + DOM probes @ vw1398, docH 11910,
   root light rgb(240,240,240)):
   hero dark #080A10 y0 h1480 pad "160 24 120":
     chip01 col4 right ("01 | Who we are" dark #21242B) + H1 col1-3 Sora600
       100/100 -0.06em uppercase (line1 white / line2 #9E9E9E) + desc col4
       fs18 rgb(138,138,138) w334 (tagline) + mini-stat (4 avatars 41 overlap
       −14 + 5 orange stars + "200+ Satisfied clients") spread to H1 height,
     media mt100 aspect 1333/800 black, img 125% slack parallax 0 → -20%.
   seam 1480 h70: band placement top, dark, bars [10,8,6,4,2] gap10 70→30.
   light block #F0F0F0 pt160 pb120 (sections 02 + 03, 5 white lines):
     02 — chip02 col1 + H2 col2-4 Sora600 100 two-tone (Measurable value,
       #0B0D14 / not promises. #5E5E5E); row2 mt40: rule 1px #CCC + ✦ col2
       self-end | desc fs18 #686868 w330 col3; stats mt104 = <Stats hideLines/>
       (4 cards h346 stagger 160); 03 — mt236: chip03 col1-2 + H2 fs70 mt20
       ("The team" dark / "behind what you see." muted, w668) + btn "Work with
       us" mt40 (w334 h66 r40 dark, roll + circle/asterisk icon 26) | col3-4
       2×2 team imgs aspect 327/394 gap "10px 7px", grayscale photo + bottom
       scrim, content pad16 (glyph 10 orange + name mono white / role Geist 16
       / dashed / blurb 2 lines), clip BR step.
   seam 3764 h70: band placement bottom, dark, bars [10,8,6,4,2] (rb-03).
   belief dark y3834 pad 120: chip04 col1-2 + desc mt40 fs18 #9E9E9E w330 |
     col3-4 pl56: quote glyph 40×30 (#666) absolute col3 + H2 fs58 #666
     letter-by-letter reveal; media mt100 col1-3 aspect 1000/630 parallax.
   seam 5152 h70: band placement top, dark, [10,8,6,4,2].
   partnership light pad 120: H2 col1-3 fs70 (Results shaped through dark /
     collaboration. muted) + chip05 col4 right; row2 mt40 rule+✦ col2 self-end
     | desc col3 w330; row3 mt100: "(2016-26©)" col1 | logo wall col2-4 3×2
     cards 180 (strip h30 #EBEBEB glyph+/year + white body, gaps 5.5/10);
     spike decor (sheared bars 44×98) left24 bottom127.
   seam 6213 h70: band placement bottom, dark, [2,4,6,8,10].
   awards dark y6283 pad "120 24 164": chip06 col1 + H2 col2-4 fs100 (Design
     work, recognized white / globally. #9E9E9E); row2 mt40 rule rgb(52,54,59)
     col2 self-end | desc col3 fs18 #9E9E9E w330 (3 lines); 4 award rows mt100
     h105 gap8 bg rgb(20,23,29) pad-l25/r14: pill (#21242B sparkle19 + 000)
     + dashed connector 222 + title mono500 24 white + sub Geist16 #9E9E9E
     (mt11) + right meta mono14 uppercase rgba(255,255,255,.75) gap10;
     gallery mt100 2-up gap10: strip h30 rgb(20,23,29) glyph+label + img
     aspect 663/400 grayscale clip TWO_CUT; decor right24 top124.
   FAQ (variant inner, band dark [10,8,6,4,2] 70→30 gap10) y8057 h~1058.
   insights light pad 120: chip "insights" (dot, no number) → row mt12: H2
     col1-2 fs70 w460 (Latest from #0B0D14 / our studio. #5E5E5E) | col3-4 desc
     fs18 #686868 w668 + CTA centered mt40 ("All articles" roll + icon 26,
     no border); cards mt138 grid-4 gap0 (cell −6): img heights 287/428/287/447
     grayscale + title box pad12 mono500 16 #0B0D14.
   seam 10168 h70: band placement bottom, orange, [2,4,6,8,10] →
     <Contact variant="inner"/> y10238 h1052 → <Footer/> (h620).
   Content kept from user's data; template copy = design-first until the final
   content pass. */

/* ------------------------------------------------------------------ tokens */

const monoLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

const darkChipLabel: CSSProperties = { ...monoLabel, lineHeight: "17px", color: "#CCCCCC" };

const chipBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 14px",
  borderRadius: 100,
  gap: 12,
};

const chipDark: CSSProperties = { ...chipBase, background: "#21242B" };
const chipLight: CSSProperties = { ...chipBase, background: "#E6E6E6" };

const h100Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(2.5rem, 7.16vw, 6.25rem)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  textTransform: "uppercase",
  margin: 0,
};

const h70Style: CSSProperties = { ...h100Style, fontSize: "clamp(32px, 5.02vw, 70px)" };
const h58Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(32px, 4.15vw, 58px)",
  lineHeight: 1,
  letterSpacing: "-3px",
  textTransform: "uppercase",
  color: "#666666",
  margin: 0,
};

const bodyDesc: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontSize: 18,
  lineHeight: "25.2px",
  margin: 0,
  textWrap: "balance",
};

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 287,
  height: 66,
  boxSizing: "border-box",
  borderRadius: 40,
  background: "#080A10",
  padding: "20px 20px 20px 24px",
  gap: 16,
  textDecoration: "none",
};

const btnTxtStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: "-0.64px",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const rowLabelStyle: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "17px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "rgba(255, 255, 255, 0.75)",
};

export const STAR_PATH =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

/* notch clip-paths (paint-equivalent of Riwa's corner overlay divs) */
/* two-up 663×400: TR chamfer 26×17 + BL step 93×38 */
const TWO_CUT =
  "polygon(0 0, 96.078% 0, 100% 4.25%, 100% 100%, 14.027% 100%, 6.223% 95.125%, 2.215% 95.125%, 0 90.5%)";
/* Riwa team-card glyphs — exact 14×14 mask paths */
const TEAM_GLYPHS = {
  harper: {
    vb: "0 0 14 14",
    d: "M 10.604 12 L 3.399 12 C 2.514 12 1.797 11.314 1.797 10.468 C 1.797 9.622 2.514 8.937 3.399 8.937 L 10.604 8.937 C 11.49 8.937 12.207 9.622 12.207 10.468 C 12.207 11.314 11.49 12 10.604 12 Z M 12.41 9.013 C 11.861 9.013 11.323 8.735 11.02 8.253 L 7.423 2.299 C 6.986 1.57 7.244 0.628 8.006 0.21 C 8.768 -0.207 9.754 0.039 10.191 0.767 L 13.788 6.722 C 14.225 7.45 13.967 8.392 13.205 8.81 C 12.948 8.949 12.679 9.013 12.41 9.013 Z M 1.596 9.011 C 1.327 9.011 1.047 8.946 0.8 8.807 C 0.038 8.39 -0.231 7.447 0.217 6.719 L 3.814 0.765 C 4.251 0.037 5.238 -0.22 6 0.208 C 6.762 0.626 7.03 1.568 6.582 2.296 L 2.985 8.25 C 2.694 8.732 2.156 9.011 1.596 9.011 Z",
  },
  mason: {
    vb: "0 0 14 14",
    d: "M 9.335 0.885 L 9.335 3.786 C 9.335 4.279 8.943 4.671 8.45 4.671 L 5.552 4.671 C 5.06 4.671 4.668 4.279 4.668 3.786 L 4.668 0.885 C 4.668 0.392 5.06 0 5.552 0 L 8.45 0 C 8.932 0 9.335 0.392 9.335 0.885 Z M 4.668 13.115 L 4.668 10.214 C 4.668 9.721 5.06 9.329 5.552 9.329 L 8.45 9.329 C 8.943 9.329 9.335 9.721 9.335 10.214 L 9.335 13.115 C 9.335 13.608 8.943 14 8.45 14 L 5.552 14 C 5.071 14 4.668 13.597 4.668 13.115 Z M 10.218 4.657 L 13.116 4.657 C 13.609 4.657 14.001 5.049 14.001 5.542 L 14.001 8.443 C 14.001 8.936 13.609 9.328 13.116 9.328 L 10.218 9.328 C 9.726 9.328 9.334 8.936 9.334 8.443 L 9.334 5.542 C 9.334 5.06 9.726 4.657 10.218 4.657 Z M 0.884 4.657 L 3.783 4.657 C 4.275 4.657 4.667 5.049 4.667 5.542 L 4.667 8.443 C 4.667 8.936 4.275 9.328 3.783 9.328 L 0.884 9.328 C 0.392 9.328 0 8.936 0 8.443 L 0 5.542 C 0 5.06 0.403 4.657 0.884 4.657 Z",
  },
  dylan: {
    vb: "0 0 14 15",
    d: "M 6.763 1.838 C 6.763 2.212 7.258 2.345 7.445 2.021 L 8.182 0.743 C 8.283 0.568 8.507 0.509 8.682 0.61 L 9.368 1.006 C 9.543 1.107 9.603 1.33 9.502 1.505 L 8.826 2.675 C 8.639 2.999 9.001 3.362 9.325 3.175 L 10.496 2.499 C 10.671 2.398 10.894 2.458 10.995 2.633 L 11.391 3.319 C 11.492 3.494 11.432 3.718 11.258 3.819 L 10.081 4.498 C 9.757 4.685 9.89 5.18 10.264 5.18 L 11.634 5.18 C 11.836 5.18 12 5.343 12 5.545 L 12 6.338 C 12 6.539 11.836 6.703 11.634 6.703 L 10.166 6.703 C 9.792 6.703 9.659 7.198 9.983 7.385 L 11.258 8.121 C 11.432 8.222 11.492 8.445 11.391 8.62 L 10.995 9.306 C 10.894 9.48 10.671 9.54 10.496 9.439 L 9.327 8.765 C 9.003 8.578 8.641 8.941 8.828 9.264 L 9.502 10.43 C 9.603 10.605 9.543 10.829 9.368 10.93 L 8.682 11.326 C 8.507 11.427 8.283 11.367 8.182 11.192 L 7.445 9.914 C 7.258 9.59 6.763 9.723 6.763 10.097 L 6.763 11.876 C 6.763 12.078 6.599 12.241 6.397 12.241 L 5.606 12.241 C 5.404 12.241 5.24 12.078 5.24 11.876 L 5.24 10.397 C 5.24 10.023 4.745 9.89 4.558 10.214 L 3.818 11.497 C 3.717 11.672 3.493 11.732 3.318 11.631 L 2.632 11.235 C 2.457 11.134 2.397 10.91 2.498 10.735 L 3.171 9.569 C 3.358 9.245 2.995 8.883 2.671 9.07 L 1.504 9.744 C 1.329 9.845 1.106 9.785 1.005 9.61 L 0.609 8.925 C 0.508 8.75 0.568 8.527 0.742 8.426 L 2.544 7.385 C 2.868 7.198 2.735 6.703 2.361 6.703 L 0.366 6.703 C 0.164 6.703 0 6.539 0 6.338 L 0 5.545 C 0 5.343 0.164 5.18 0.366 5.18 L 1.735 5.18 C 2.109 5.18 2.242 4.685 1.918 4.498 L 0.742 3.819 C 0.568 3.718 0.508 3.494 0.609 3.319 L 1.005 2.633 C 1.106 2.458 1.329 2.398 1.504 2.499 L 2.674 3.175 C 2.998 3.362 3.361 2.999 3.174 2.675 L 2.498 1.505 C 2.397 1.33 2.457 1.107 2.632 1.006 L 3.318 0.61 C 3.493 0.509 3.717 0.568 3.818 0.743 L 4.558 2.026 C 4.745 2.35 5.24 2.217 5.24 1.843 L 5.24 0.366 C 5.24 0.164 5.404 0 5.606 0 L 6.397 0 C 6.599 0 6.763 0.164 6.763 0.366 Z",
  },
  lila: {
    vb: "0 0 14 14",
    d: "M 0 2.065 C 0 0.925 0.925 0 2.065 0 C 3.388 0 4.369 1.226 4.08 2.516 L 3 7.342 L 5.973 7.342 L 9 7.342 L 7.92 2.516 C 7.631 1.226 8.612 0 9.935 0 C 11.075 0 12 0.925 12 2.065 L 12 10.247 C 12 11.215 11.215 12 10.247 12 L 1.753 12 C 0.785 12 0 11.215 0 10.247 Z",
  },
} as const;

/* Riwa corner wedges (#F0F0F0) — TL 43×67, TR 30×130, BR 16×16 chamfer */
function TeamCuts() {
  return (
    <>
      <svg
        className="absolute"
        style={{ left: -1, top: -1 }}
        width="43"
        height="67"
        viewBox="0 0 43 67"
        fill="none"
        aria-hidden="true"
      >
        <path d="M 34 11.083 L 43 0 L 0 0 L 0 67 L 34 30.226 Z" fill="var(--color-light-bg)" />
      </svg>
      <svg
        className="absolute"
        style={{ right: -1, top: -1 }}
        width="30"
        height="130"
        viewBox="0 0 30 130"
        fill="none"
        aria-hidden="true"
      >
        <path d="M 19 116 L 30 130 L 30 0 L 0 0 L 19 15.328 Z" fill="var(--color-light-bg)" />
      </svg>
      <svg
        className="absolute"
        style={{ right: -1, bottom: -1 }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M 0 0 L 0 16 L 16 16 Z" fill="var(--color-light-bg)" />
      </svg>
    </>
  );
}

/* ------------------------------------------------------------------ pieces */

function GridLines({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-px block"
            style={{ background: dark ? "rgba(255, 255, 255, 0.15)" : "#FFFFFF" }}
          />
        ))}
      </div>
    </div>
  );
}

function NumberChip({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  const lbl = dark ? darkChipLabel : monoLabel;
  return (
    <span className="inline-flex items-center" style={dark ? chipDark : chipLight}>
      <span className="inline-flex items-center" style={{ gap: 4 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "100%",
            background: "rgb(214, 54, 20)",
            flexShrink: 0,
          }}
        />
        <span style={lbl}>{n}</span>
      </span>
      <span style={lbl}>{label}</span>
    </span>
  );
}

/* diamond rule: 1px #CCC (dark: rgb(52,54,59)) + ✦ hanging at its left end */
function RuleStar({ dark = false }: { dark?: boolean }) {
  return (
    <div className="relative" style={{ height: 25 }} aria-hidden="true">
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 12,
          height: 1,
          background: dark ? "rgb(52, 54, 59)" : "#CCCCCC",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontSize: 16,
          lineHeight: "25px",
          color: dark ? "#666666" : "var(--color-light-muted)",
        }}
      >
        ✦
      </span>
    </div>
  );
}

/* sheared-bars spike ornament (Riwa's "Lines" mark, 44×98) */
function SpikeDecor({ dark = false, style }: { dark?: boolean; style: CSSProperties }) {
  return (
    <svg
      className="absolute hidden lg:block"
      style={{ width: 44, height: 98, ...style }}
      viewBox="0 0 44.075 97.499"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={DECOR_BARS_1} fill={dark ? "rgb(52, 54, 59)" : "rgb(204, 204, 204)"} />
      <path d={DECOR_BARS_2} fill={dark ? "#080A10" : "#FFFFFF"} />
    </svg>
  );
}

/* dark seam strip between sections (bars colored like the dark section) */
function Seam({ placement, heights, color = "#080A10" }: { placement: "top" | "bottom"; heights: number[]; color?: string }) {
  return (
    <div className="relative" style={{ height: 70, background: "var(--color-light-bg)" }}>
      <AnimatedLinesBand
        placement={placement}
        color={color}
        lineHeights={heights}
        gapPx={10}
        containerFrom={70}
        containerTo={30}
        gapColor="transparent"
      />
    </div>
  );
}

/* barcode strip ornament (Riwa belief media right edge, 26×145.761) */
export function BarcodeDecor({ style }: { style: CSSProperties }) {
  return (
    <svg
      className="absolute hidden lg:block"
      style={{ width: 26, height: 146, ...style }}
      viewBox="0 0 26 145.761"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 26 145.761 L 0 145.761 L 0 144.447 L 26 144.447 Z M 26 140.504 L 0 140.504 L 0 136.562 L 26 136.562 Z M 26 135.247 L 0 135.247 L 0 133.933 L 26 133.933 Z M 26 132.619 L 0 132.619 L 0 128.676 L 26 128.676 Z M 26 127.362 L 0 127.362 L 0 126.048 L 26 126.048 Z M 26 124.713 L 0 124.713 L 0 120.771 L 26 120.771 Z M 26 116.828 L 0 116.828 L 0 115.514 L 26 115.514 Z M 26 114.2 L 0 114.2 L 0 112.885 L 26 112.885 Z M 26 111.571 L 0 111.571 L 0 107.629 L 26 107.629 Z M 26 106.314 L 0 106.314 L 0 105 L 26 105 Z"
        fill="rgb(204, 204, 204)"
      />
      <path
        d="M 26 103.904 L 0 103.904 L 0 102.59 L 26 102.59 Z M 26 98.647 L 0 98.647 L 0 94.705 L 26 94.705 Z M 26 93.391 L 0 93.391 L 0 92.076 L 26 92.076 Z M 26 90.762 L 0 90.762 L 0 86.82 L 26 86.82 Z M 26 85.505 L 0 85.505 L 0 84.191 L 26 84.191 Z M 26 82.856 L 0 82.856 L 0 81.542 L 26 81.542 Z M 26 77.6 L 0 77.6 L 0 73.657 L 26 73.657 Z M 26 72.343 L 0 72.343 L 0 71.029 L 26 71.029 Z M 26 69.714 L 0 69.714 L 0 65.772 L 26 65.772 Z M 26 64.458 L 0 64.458 L 0 63.144 L 26 63.144 Z M 26 61.809 L 0 61.809 L 0 60.495 L 26 60.495 Z M 26 56.552 L 0 56.552 L 0 52.609 L 26 52.609 Z M 26 51.295 L 0 51.295 L 0 49.981 L 26 49.981 Z M 26 48.667 L 0 48.667 L 0 44.724 L 26 44.724 Z M 26 43.41 L 0 43.41 L 0 42.096 L 26 42.096 Z M 26 40.76 L 0 40.76 L 0 39.447 L 26 39.447 L 26 40.761 Z M 26 35.504 L 0 35.504 L 0 31.562 L 26 31.562 Z M 26 30.247 L 0 30.247 L 0 28.933 L 26 28.933 Z M 26 27.619 L 0 27.619 L 0 23.676 L 26 23.676 Z M 26 22.362 L 0 22.362 L 0 21.048 L 26 21.048 Z M 26 19.713 L 0 19.713 L 0 18.4 L 26 18.4 L 26 19.714 Z M 26 14.456 L 0 14.456 L 0 10.514 L 26 10.514 Z M 26 9.2 L 0 9.2 L 0 7.885 L 26 7.885 Z M 26 6.572 L 0 6.572 L 0 2.628 L 26 2.628 L 26 6.571 Z M 26 1.315 L 0 1.315 L 0 0 L 26 0 L 26 1.314 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/* header/body media — img carries 125% slack; scroll parallax 0 → -20% */
function ParallaxMedia({ index, ratio }: { index: number; ratio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: ratio, background: "#000000" }}
    >
      <motion.div
        className="absolute left-0 top-0 w-full"
        style={{
          height: "125%",
          background: PLACEHOLDERS[index % PLACEHOLDERS.length],
          filter: "grayscale(1)",
          y,
        }}
        aria-hidden="true"
      />
      {/* Riwa corner cut-outs (exact paths, dark bg on top of media) */}
      <svg
        className="absolute left-0 top-0"
        width="391"
        height="52"
        viewBox="0 0 391 52"
        aria-hidden="true"
      >
        <path d="M 391 0 L 0 0 L 0 52 L 26.007 14.345 L 365.89 14.345 Z" fill="#080A10" />
      </svg>
      <svg
        className="absolute right-0 top-0"
        width="35"
        height="23"
        viewBox="0 0 35 23"
        aria-hidden="true"
      >
        <path d="M 35 23 L 0 0 L 35 0 Z" fill="#080A10" />
      </svg>
      <svg
        className="absolute left-0 bottom-0"
        width="122"
        height="63"
        viewBox="0 0 122 63"
        aria-hidden="true"
      >
        <path d="M 0 0 L 0 63 L 122 63 L 54.12 24.128 L 19.263 24.128 Z" fill="#080A10" />
      </svg>
    </div>
  );
}

/* circle + orange asterisk button icon (26) */
function BtnIcon({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const orange = light ? "rgb(214, 54, 20)" : "rgb(229, 59, 23)";
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M 13 26 C 5.82 26 0 20.18 0 13 L 0 13 C 0 5.82 5.82 0 13 0 L 13 0 C 20.18 0 26 5.82 26 13 L 26 13 C 26 20.18 20.18 26 13 26 Z"
        fill={light ? "#080A10" : "#FFFFFF"}
      />
      <path
        d="M 13 21.667 L 13 17.333 C 13 14.94 11.06 13 8.667 13 L 4.333 13 M 21.667 13 L 17.333 13 C 14.94 13 13 14.94 13 17.333 L 13 21.667 M 13 4.333 L 13 8.667 C 13 11.06 14.94 13 17.333 13 L 21.667 13 M 4.333 13 L 8.667 13 C 11.06 13 13 11.06 13 8.667 L 13 4.333"
        fill="transparent"
        stroke={orange}
        strokeWidth={1}
        strokeMiterlimit={10}
      />
      <path d="M 13 15.708 L 10.292 13 L 13 9.75 L 15.708 13 Z" fill={orange} />
    </svg>
  );
}

/* per-letter upward reveal (Riwa's belief quote) */
const charContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.014 } } };
const charWord: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.012 } } };
const charItem: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function SplitHeading({ text, style }: { text: string; style: CSSProperties }) {
  const words = text.split(" ");
  return (
    <motion.h2
      variants={charContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      style={style}
    >
      {words.map((w, wi) => (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <motion.span
            variants={charWord}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            {[...w].map((c, ci) => (
              <motion.span key={ci} variants={charItem} style={{ display: "inline-block" }}>
                {c}
              </motion.span>
            ))}
          </motion.span>
        </Fragment>
      ))}
    </motion.h2>
  );
}

/* --------------------------------------------------------------- section 03 */

type TeamMember = { name: string; role: string; blurb: string; glyph: keyof typeof TEAM_GLYPHS };

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const glyph = TEAM_GLYPHS[member.glyph];
  return (
    <Reveal delay={index * 0.08}>
      <div className="relative" style={{ aspectRatio: "327 / 394", background: "#000000" }}>
        <div
          className="absolute inset-0"
          style={{ background: PLACEHOLDERS[index % PLACEHOLDERS.length] }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(8, 10, 16, 0.01) 30%, rgb(8, 10, 15) 100%)" }}
        />
        <TeamCuts />
        <div className="absolute" style={{ left: 0, right: 0, bottom: 0, padding: "0 16px 15px" }}>
          <svg
            width="14"
            height="14"
            viewBox={glyph.vb}
            preserveAspectRatio="none"
            className="block"
            aria-hidden="true"
          >
            <path d={glyph.d} fill="rgb(214, 54, 20)" />
          </svg>
          <div style={{ marginTop: 12 }}>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 14,
                lineHeight: "16.8px",
                fontWeight: 500,
                letterSpacing: "-0.56px",
                textTransform: "uppercase",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {member.name}
            </p>
            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 15,
                lineHeight: "21px",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.75)",
                margin: 0,
                textWrap: "balance",
              }}
            >
              {member.role}
            </p>
          </div>
          <div style={{ marginTop: 12, borderTop: "1px dashed rgba(255, 255, 255, 0.3)" }} />
          <p
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 15,
              lineHeight: "21px",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: 0,
              marginTop: 12,
              textWrap: "balance",
            }}
          >
            {member.blurb}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------------------------------------------- section 05 */

function LogoCard({ year, index }: { year: string; index: number }) {
  return (
    <div className="flex flex-col" style={{ height: 180 }}>
      <div
        className="flex items-center shrink-0"
        style={{ height: 30, background: "rgb(241, 241, 241)", padding: "6px 12px", gap: 16, boxSizing: "border-box" }}
      >
        <span
          className="block shrink-0"
          style={{
            width: 14,
            height: 14,
            background: "rgb(214, 54, 20)",
            WebkitMaskImage: CARD_ICON_MASK,
            maskImage: CARD_ICON_MASK,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <span style={{ ...monoLabel, whiteSpace: "nowrap" }}>{year}</span>
      </div>
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: "#FFFFFF", minHeight: 0 }}
      >
        <span
          style={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "#C9C9C9",
          }}
        >
          Logo Ipsum
        </span>
      </div>
      {/* keeps index in signature for future per-card placeholder art */}
      <span hidden>{index}</span>
    </div>
  );
}

/* --------------------------------------------------------------- section 06 */

type Award = { n: string; title: string; sub: string; count: string; year: string };

function AwardRow({ award, delay }: { award: Award; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          height: 105,
          background: "rgb(20, 23, 29)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 14,
          boxSizing: "border-box",
        }}
      >
        <span
          className="inline-flex items-center shrink-0"
          style={{ padding: "8px 14px", borderRadius: 100, gap: 12, background: "#21242B" }}
        >
          <svg width="19" height="19" viewBox="0 0 19 19" aria-hidden="true">
            <path d={STAR_PATH} fill="rgb(214, 54, 20)" />
          </svg>
          <span style={darkChipLabel}>{award.n}</span>
        </span>
        <span
          className="shrink-0"
          style={{ display: "block", width: 222, height: 0, borderTop: "1px dashed rgba(255, 255, 255, 0.25)" }}
        />
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 24,
              lineHeight: "24px",
              fontWeight: 500,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            {award.title}
          </p>
          <p
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 16,
              lineHeight: "19.2px",
              color: "#9E9E9E",
              margin: 0,
              marginTop: 11,
              textWrap: "balance",
            }}
          >
            {award.sub}
          </p>
        </div>
        <div className="flex items-center shrink-0" style={{ gap: 10, marginLeft: "auto", ...rowLabelStyle }}>
          <span>{award.count}</span>
          <span>awards</span>
          <span>{award.year}</span>
        </div>
      </div>
    </Reveal>
  );
}

function GalleryPanel({ label, index }: { label: string; index: number }) {
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center shrink-0"
        style={{
          height: 30,
          background: "rgb(20, 23, 29)",
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
            WebkitMaskImage: CARD_ICON_MASK,
            maskImage: CARD_ICON_MASK,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <span style={{ ...rowLabelStyle }}>{label}</span>
      </div>
      <div className="overflow-hidden" style={{ aspectRatio: "663 / 400", clipPath: TWO_CUT }}>
        <div
          className="w-full h-full"
          style={{ background: PLACEHOLDERS[index % PLACEHOLDERS.length], filter: "grayscale(1)" }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- insights */

const INSIGHT_HEIGHTS = [287, 428, 287, 447];

function InsightCard({ title, index }: { title: string; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.08}>
      <Link
        to={`/blog/${slugify(title)}`}
        className="group block"
        style={{ width: "calc(100% - 6px)" }}
      >
        <div className="flex flex-col">
          <div className="overflow-hidden bg-black" style={{ height: INSIGHT_HEIGHTS[index % 4] }}>
            <div
              className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ background: PLACEHOLDERS[index % PLACEHOLDERS.length] }}
            />
          </div>
          <div style={{ padding: 12 }}>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 16,
                lineHeight: "19.2px",
                fontWeight: 500,
                color: "#0B0D14",
                margin: 0,
                textWrap: "balance",
              }}
            >
              {title}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* -------------------------------------------------------------------- data */

const team: TeamMember[] = [
  {
    name: "Harper Collins",
    role: "CEO & Art Director",
    blurb: "Shapes visual direction with a strong focus on concept, consistency, and brand expression.",
    glyph: "harper",
  },
  {
    name: "Mason Turner",
    role: "Motion & UI Designer",
    blurb: "Creates meaningful motion that enhances storytelling, interaction, and emotional impact.",
    glyph: "mason",
  },
  {
    name: "Dylan Brooks",
    role: "UI/UX Designer",
    blurb: "Designs intuitive interfaces with a focus on usability and scalability.",
    glyph: "dylan",
  },
  {
    name: "Lila Anderson",
    role: "Framer Developer",
    blurb: "Builds scalable, maintainable systems with clean architecture and performance in mind.",
    glyph: "lila",
  },
];

const logoYears = ["/2026", "/2025", "/2024", "/2023", "/2020", "/2016"];

const awards: Award[] = [
  { n: "001", title: "Featured Project", sub: "Behance", count: "×02", year: "/2026" },
  { n: "002", title: "UX Design Award", sub: "Awwwards", count: "×01", year: "/2025" },
  { n: "003", title: "Best Web Design Agency", sub: "CSS Design Awards", count: "×01", year: "/2024" },
  { n: "004", title: "#1 Product of the Day", sub: "Product Hunt", count: "×03", year: "/2023" },
];

const insights = [
  ...articles,
  {
    title: "Motion That Guides, Not Distracts",
    excerpt:
      "How purposeful animation turns interfaces into experiences people remember.",
    date: "2024",
    tag: "Interaction",
  },
];

/* ------------------------------------------------------------------- page */

export default function AboutPage() {
  return (
    <div>
      {/* ================================ hero (dark, pad 160/24/120) */}
      <section className="relative" style={{ background: "var(--color-dark-bg)", padding: "160px 24px 120px" }}>
        <GridLines dark />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4" style={{ rowGap: 40 }}>
          <div className="lg:col-span-3">
            <Reveal>
              <h1 style={h100Style}>
                <span className="block" style={{ color: "#FFFFFF" }}>
                  The person behind
                </span>
                <span className="block" style={{ color: "#9E9E9E" }}>
                  the code
                </span>
              </h1>
            </Reveal>
          </div>

          <div className="flex flex-col">
            <Reveal>
              <div className="flex justify-end lg:justify-end">
                <NumberChip dark n="01" label="Who we are" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ ...bodyDesc, color: "#8A8A8A", maxWidth: 334, marginTop: 77 }}>
                {profile.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center" style={{ gap: 10, marginTop: 48 }}>
                <div className="flex shrink-0">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      style={{
                        display: "block",
                        width: 41,
                        height: 41,
                        borderRadius: "100%",
                        background: PLACEHOLDERS[i % PLACEHOLDERS.length],
                        border: "2px solid #080A10",
                        boxSizing: "border-box",
                        marginLeft: i ? -14 : 0,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col" style={{ gap: 4 }}>
                  <span
                    style={{
                      display: "flex",
                      gap: 3,
                      fontSize: 13,
                      lineHeight: "16px",
                      color: "rgb(214, 54, 20)",
                      letterSpacing: 1,
                    }}
                    aria-hidden="true"
                  >
                    ★★★★★
                  </span>
                  <span style={{ display: "flex", alignItems: "baseline" }}>
                    <span style={{ ...monoLabel }}>200+</span>
                    <span
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: 15,
                        lineHeight: "21px",
                        color: "#5E5E5E",
                        marginLeft: 5,
                      }}
                    >
                      Satisfied clients
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10" style={{ marginTop: 100 }}>
          <ParallaxMedia index={0} ratio="1333 / 800" />
        </div>
      </section>

      {/* seam: dark hero → light (bars hang from the top edge) */}
      <Seam placement="top" heights={[10, 8, 6, 4, 2]} />

      {/* ================================ 02 measurable value + 03 team */}
      <section
        className="relative"
        style={{ background: "var(--color-light-bg)", padding: "160px 24px 120px" }}
      >
        <GridLines />
        <div className="relative z-10">
          {/* 02 — chip col1 | H2 col2-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Reveal>
                <NumberChip n="02" label="What you get" />
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <h2 style={h100Style}>
                  <span className="block" style={{ color: "var(--color-light-text)" }}>
                    Measurable value,
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    not promises.
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          {/* 02 — rule col2 self-end | desc col3 */}
          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 40 }}>
            <div className="hidden lg:block" aria-hidden="true" />
            <Reveal delay={0.15} className="lg:col-start-2 self-end">
              <RuleStar />
            </Reveal>
            <Reveal delay={0.2} className="lg:col-start-3">
              <p style={{ ...bodyDesc, color: "#686868", maxWidth: 330 }}>
                Clear metrics, transparent process, results you can rely on.
              </p>
            </Reveal>
          </div>

          {/* 02 — 4 stat cards (own lines suppressed; section GridLines show) */}
          <div className="relative z-10" style={{ marginTop: 104 }}>
            <Stats hideLines />
          </div>

          {/* 03 — chip + H2 + CTA col1-2 | team grid col3-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 236, rowGap: 40 }}>
            <div className="lg:col-span-2">
              <Reveal>
                <NumberChip n="03" label="Experts" />
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ ...h70Style, marginTop: 20 }}>
                  <span className="block" style={{ color: "var(--color-light-text)" }}>
                    The team
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    behind what
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    you see.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ marginTop: 32 }}>
                  <Link
                    to="/contact"
                    className="group"
                    style={{ textDecoration: "none", display: "block", width: "100%", maxWidth: 334 }}
                  >
                    <div className="relative" style={{ height: 66 }}>
                      <div style={btnStyle}>
                        <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                          <div className="btn-roll">
                            <span style={btnTxtStyle}>Work with us</span>
                            <span style={btnTxtStyle}>Work with us</span>
                          </div>
                        </div>
                        <BtnIcon className="group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          width: 66,
                          height: 66,
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: PLACEHOLDERS[0],
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ columnGap: 13, rowGap: 10 }}>
                {team.map((member, i) => (
                  <TeamCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* seam: light → dark belief (rb-03: bottom-anchored [10,8,6,4,2]) */}
      <Seam placement="bottom" heights={[10, 8, 6, 4, 2]} />

      {/* ================================ 04 belief (dark, pad 120) */}
      <section className="relative" style={{ background: "var(--color-dark-bg)", padding: "120px 24px" }}>
        <GridLines dark />
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Reveal>
                <NumberChip dark n="04" label="Belief" />
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...bodyDesc, color: "#9E9E9E", maxWidth: 330, marginTop: 40 }}>
                  The thinking behind how we work — guiding how we design, collaborate, and deliver.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-2 relative" style={{ paddingLeft: 56 }}>
              <svg
                className="absolute"
                style={{ left: 0, top: 0 }}
                width="40"
                height="30"
                viewBox="0 0 40 30"
                fill="#666666"
                aria-hidden="true"
              >
                <path d="M0 0 L17 0 L17 30 L6 30 L0 20 Z" />
                <path d="M23 0 L40 0 L40 30 L29 30 L23 20 Z" />
              </svg>
              <SplitHeading
                text="Built to solve real problems — not chase trends. Clear thinking. Lasting design. Real value."
                style={h58Style}
              />
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 100 }}>
            <div className="lg:col-span-3">
              <ParallaxMedia index={1} ratio="1000 / 630" />
            </div>
            <BarcodeDecor style={{ right: 0, bottom: 0 }} />
          </div>
        </div>
      </section>

      {/* seam: dark belief → light partnership */}
      <Seam placement="top" heights={[10, 8, 6, 4, 2]} />

      {/* ================================ 05 partnership (light, pad 120) */}
      <section className="relative" style={{ background: "var(--color-light-bg)", padding: "120px 24px" }}>
        <GridLines />
        <div className="relative z-10">
          {/* H2 col1-3 | chip col4 right */}
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Reveal>
                <h2 style={h70Style}>
                  <span className="block" style={{ color: "var(--color-light-text)" }}>
                    Results shaped through
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    collaboration.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-1 flex justify-end">
              <Reveal delay={0.1}>
                <NumberChip n="05" label="Partnership" />
              </Reveal>
            </div>
          </div>

          {/* rule col2 self-end | desc col3 */}
          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 40 }}>
            <div className="hidden lg:block" aria-hidden="true" />
            <Reveal delay={0.15} className="lg:col-start-2 self-end">
              <RuleStar />
            </Reveal>
            <Reveal delay={0.2} className="lg:col-start-3">
              <p style={{ ...bodyDesc, color: "#686868", maxWidth: 330 }}>
                We partner with startups and established brands to design digital products and
                scalable brand systems — focused on clarity and usability.
              </p>
            </Reveal>
          </div>

          {/* "(2016-26©)" col1 | logo wall col2-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 100, rowGap: 40 }}>
            <div className="lg:col-span-1">
              <Reveal>
                <span style={monoLabel}>(2016-26©)</span>
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ columnGap: "5.5px", rowGap: 10 }}
              >
                {logoYears.map((year, i) => (
                  <Reveal key={year} delay={(i % 3) * 0.08}>
                    <LogoCard year={year} index={i} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SpikeDecor style={{ left: 24, bottom: 127 }} />
      </section>

      {/* seam: light partnership → dark awards */}
      <Seam placement="bottom" heights={[2, 4, 6, 8, 10]} />

      {/* ================================ 06 awards (dark, pad 120/24/164) */}
      <section
        className="relative"
        style={{ background: "var(--color-dark-bg)", padding: "120px 24px 164px" }}
      >
        <GridLines dark />
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Reveal>
                <NumberChip dark n="06" label="Awards" />
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <h2 style={h100Style}>
                  <span className="block" style={{ color: "#FFFFFF" }}>
                    Design work, recognized
                  </span>
                  <span className="block" style={{ color: "#9E9E9E" }}>
                    globally.
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 40 }}>
            <div className="hidden lg:block" aria-hidden="true" />
            <Reveal delay={0.15} className="lg:col-start-2 self-end">
              <RuleStar dark />
            </Reveal>
            <Reveal delay={0.2} className="lg:col-start-3">
              <p style={{ ...bodyDesc, color: "#9E9E9E", maxWidth: 330 }}>
                Awards and nominations from respected and trusted international design communities.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col" style={{ gap: 8, marginTop: 100 }}>
            {awards.map((award, i) => (
              <AwardRow key={award.n} award={award} delay={i * 0.08} />
            ))}
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ columnGap: 10, rowGap: 10, marginTop: 100 }}
          >
            <GalleryPanel label="Moments" index={2} />
            <GalleryPanel label="Archive" index={3} />
          </div>
        </div>
        <SpikeDecor dark style={{ right: 24, top: 124 }} />
      </section>

      {/* FAQ — inner variant, dark band teeth (section above is dark) */}
      <FAQ
        variant="inner"
        band={{
          color: "#080A10",
          lineHeights: [10, 8, 6, 4, 2],
          gapPx: 10,
          containerFrom: 70,
          containerTo: 30,
        }}
      />

      {/* ================================ insights (light, pad 120) */}
      <section className="relative" style={{ background: "var(--color-light-bg)", padding: "120px 24px" }}>
        <GridLines />
        <div className="relative z-10">
          <Reveal>
            <div className="inline-flex items-center" style={chipLight}>
              <span
                className="block"
                style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
              />
              <span style={monoLabel}>insights</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 12 }}>
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <h2 style={{ ...h70Style, maxWidth: 460 }}>
                  <span className="block" style={{ color: "var(--color-light-text)" }}>
                    Latest from
                  </span>
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    our studio.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-2">
              <Reveal delay={0.15}>
                <p style={{ ...bodyDesc, color: "#686868", maxWidth: 668 }}>
                  Notes on design, engineering and the decisions behind the products we ship every
                  week.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ marginTop: 40 }}>
                  <Link to="/blog" className="group" style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ ...btnStyle, width: "100%", maxWidth: "100%" }}>
                      <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                        <div className="btn-roll">
                          <span style={btnTxtStyle}>All articles</span>
                          <span style={btnTxtStyle}>All articles</span>
                        </div>
                      </div>
                      <BtnIcon className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 0, marginTop: 138 }}
          >
            {insights.map((article, i) => (
              <InsightCard key={article.title} title={article.title} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* seam: light insights → orange contact */}
      <Seam placement="bottom" heights={[2, 4, 6, 8, 10]} color="rgb(214, 54, 20)" />

      <Contact variant="inner" />
      <Footer />
    </div>
  );
}
