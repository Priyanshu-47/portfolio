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
  textTransform: "uppercase",
  color: "#666666",
  margin: 0,
};

const bodyDesc: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontSize: 18,
  lineHeight: "25.2px",
  margin: 0,
};

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: 334,
  height: 66,
  boxSizing: "border-box",
  borderRadius: 40,
  background: "#080A10",
  padding: "20px 20px 20px 24px",
  gap: 16,
  border: "1px solid rgba(255, 255, 255, 0.73)",
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

const STAR_PATH =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

/* notch clip-paths (paint-equivalent of Riwa's corner overlay divs) */
/* two-up 663×400: TR chamfer 26×17 + BL step 93×38 */
const TWO_CUT =
  "polygon(0 0, 96.078% 0, 100% 4.25%, 100% 100%, 14.027% 100%, 6.223% 95.125%, 2.215% 95.125%, 0 90.5%)";
/* team card 327×394: BR step (mirrored BL step, scaled ≈0.4) */
const TEAM_CUT =
  "polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 8px) calc(100% - 16px), calc(100% - 22px) calc(100% - 16px), calc(100% - 49px) 100%, 0 100%)";

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
        style={{ height: "125%", background: PLACEHOLDERS[index % PLACEHOLDERS.length], y }}
        aria-hidden="true"
      />
    </div>
  );
}

/* circle + orange asterisk button icon (26) */
function BtnIcon({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill={light ? "#080A10" : "#FFFFFF"} />
      <g stroke="rgb(214, 54, 20)" strokeWidth="1.8" strokeLinecap="round" transform="translate(13 13)">
        <line x1="0" y1="-5.5" x2="0" y2="5.5" />
        <line x1="0" y1="-5.5" x2="0" y2="5.5" transform="rotate(60)" />
        <line x1="0" y1="-5.5" x2="0" y2="5.5" transform="rotate(120)" />
      </g>
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

type TeamMember = { name: string; role: string; blurb: string; glyph: "dot" | "star" };

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <div
        className="relative"
        style={{ aspectRatio: "327 / 394", background: "#000000", clipPath: TEAM_CUT }}
      >
        <div
          className="absolute inset-0"
          style={{ background: PLACEHOLDERS[index % PLACEHOLDERS.length], filter: "grayscale(1)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,10,16,0) 30%, rgba(8,10,16,0.55) 60%, rgba(8,10,16,0.9) 100%)",
          }}
        />
        <div className="absolute" style={{ left: 16, right: 16, bottom: 16 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            {member.glyph === "dot" ? (
              <span
                className="block shrink-0"
                style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
              />
            ) : (
              <svg width="12" height="12" viewBox="0 0 19 19" className="shrink-0" aria-hidden="true">
                <path d={STAR_PATH} fill="rgb(214, 54, 20)" />
              </svg>
            )}
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 14,
                lineHeight: "17px",
                fontWeight: 500,
                letterSpacing: "-0.56px",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              {member.name}
            </span>
          </div>
          <p
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 16,
              lineHeight: "21px",
              color: "#FFFFFF",
              margin: 0,
              marginTop: 2,
            }}
          >
            {member.role}
          </p>
          <div style={{ marginTop: 10, borderTop: "1px dashed rgba(255, 255, 255, 0.35)" }} />
          <p
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 16,
              lineHeight: "21px",
              color: "#FFFFFF",
              margin: 0,
              marginTop: 12,
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
        style={{ height: 30, background: "#EBEBEB", padding: "6px 12px", gap: 16, boxSizing: "border-box" }}
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
    name: "Noah Carter",
    role: "Product Designer",
    blurb: "Designs flows and interfaces that feel intuitive and look effortlessly polished.",
    glyph: "star",
  },
  {
    name: "Maya Patel",
    role: "Visual Designer",
    blurb: "Transforms complex problems into clear, usable product experiences.",
    glyph: "dot",
  },
  {
    name: "Dylan Brooks",
    role: "UI/UX Designer",
    blurb: "Designs intuitive interfaces with a focus on usability and scalability.",
    glyph: "dot",
  },
  {
    name: "Lila Anderson",
    role: "Framer Developer",
    blurb: "Builds scalable, maintainable systems with clean architecture and performance in mind.",
    glyph: "star",
  },
];

const logoYears = ["2026", "2025", "2024", "2023", "2020", "2016"];

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

          <div className="flex flex-col justify-between" style={{ gap: 24 }}>
            <Reveal>
              <div className="flex justify-end lg:justify-end">
                <NumberChip dark n="01" label="Who we are" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ ...bodyDesc, color: "#8A8A8A", maxWidth: 334 }}>{profile.tagline}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center" style={{ gap: 10 }}>
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
                    behind what you see.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ marginTop: 40 }}>
                  <Link to="/contact" className="group" style={{ textDecoration: "none" }}>
                    <div style={btnStyle}>
                      <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                        <div className="btn-roll">
                          <span style={btnTxtStyle}>Work with us</span>
                          <span style={btnTxtStyle}>Work with us</span>
                        </div>
                      </div>
                      <BtnIcon className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ columnGap: 7, rowGap: 10 }}>
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

          <div className="grid grid-cols-1 lg:grid-cols-4" style={{ marginTop: 100 }}>
            <div className="lg:col-span-3">
              <ParallaxMedia index={1} ratio="1000 / 630" />
            </div>
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
                <div style={{ marginTop: 40 }} className="flex justify-center">
                  <Link to="/blog" className="group" style={{ textDecoration: "none" }}>
                    <div className="inline-flex items-center" style={{ gap: 16 }}>
                      <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                        <div className="btn-roll">
                          <span
                            style={{
                              fontFamily: '"Sora", sans-serif',
                              fontWeight: 600,
                              fontSize: 16,
                              lineHeight: "16px",
                              letterSpacing: "-0.64px",
                              textTransform: "uppercase",
                              color: "#0B0D14",
                            }}
                          >
                            All articles
                          </span>
                          <span
                            style={{
                              fontFamily: '"Sora", sans-serif',
                              fontWeight: 600,
                              fontSize: 16,
                              lineHeight: "16px",
                              letterSpacing: "-0.64px",
                              textTransform: "uppercase",
                              color: "#0B0D14",
                            }}
                          >
                            All articles
                          </span>
                        </div>
                      </div>
                      <BtnIcon light className="group-hover:rotate-45 transition-transform duration-300" />
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
