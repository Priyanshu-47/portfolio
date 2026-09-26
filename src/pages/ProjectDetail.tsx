import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AnimatedLinesBand from "../components/AnimatedLinesBand";
import { projects, profile } from "../data/resume";
import { projectDetails } from "../data/projectDetails";
import type { ProjectDetail as ProjectDetailData } from "../data/projectDetails";
import { slugify, PLACEHOLDERS, CARD_ICON_MASK } from "./ProjectsPage";

/* Riwa /projects/:slug — live-verified (rp-det-1..4 + DOM probes @ vw1398):
   dark header #080A10 y0 h1728 pad "160 24 120", 5 lines white@15%:
     chip col1 y160 — dark #21242B pad8/14 gap12 (dot10 orange + category
       mono 500 14/17 uppercase #CCCCCC),
     H1 row y213 (mt20) — flex space-between items-end: "/" Sora600 100/100
       -0.06em #5E5E5E gap10 + title white; date right (mono 500 14/17
       uppercase #9E9E9E ls-0.56, bottom-aligned to the H1 box → y296),
     grid y413 (mt100) [col1 button | col2 empty | col3-4 right]:
       button w334 h66 r40 bg #080A10 pad "20 20 20 24" gap16 justify-center,
         border 0.73px white (rgba .73 at 1px), text Sora600 16/16 uppercase
         ls-0.64 white roll (.btn-roll, two stacked copies, window 16) +
         icon 26 (white circle + orange asterisk),
       desc Geist 18/25.2 #9E9E9E (2 lines),
       rows mt40 — 3 rows pitch68 (h47 pad14 gap10, alignItems center):
         label block flex-1 mono 500 14/17 uppercase rgba(255,255,255,.75),
         value block flex-1 mono 500 16/19.2 right rgba(255,255,255,.75);
         container gap21 + pb21 (= 204, rows end 708),
     media y808 (grid+100) — aspect 1333/800 black, img 125% slack with
       scroll parallax (y 0 → -20%), clip TR notch 35×23 (section bg shows),
     dark ends media+120 → 1728.
   seam1 1728-1798: light strip h70, band placement "top", dark teeth
     [10,8,6,4,2] gap10, container 70 → 30.
   light A #F0F0F0 pt160 pb120, 5 lines white: 4 sections gap100 —
     row1 chip col1 (E6E6E6: dot+num gap4 | label gap12, mono 500 14
       uppercase #686868) + H3 col2-4 Sora600 48/48 -0.06em uppercase solid
       #0B0D14 (01 Challenge 3 lines h144 / 02 Approach / 03 Result /
       04 Takeaway 2 lines h96),
     row2 mt40 — col2 rule 1px #CCC anchored bottom-12 + 19px sparkle
       (#CCC) hanging left -9 | col3-4 desc Geist 18/25.2 #686868 3 lines,
     media mt80 gap8: 01/02 = two-up (aspect 663/400, clip TR 26×17 +
       BL step 93×38) + full (1333/800, clip TR 35×23); 03 = two-up;
       04 = full. Body media static (only header media parallaxes).
   seam2 7208-7278: band placement "bottom", dark teeth [2,4,6,8,10].
   testimonial dark y7278 h784 pad "120 24", lines white@15%:
     col1 chip05 "05 FEEDBACK" + desc mt40 (Geist 18/25.2 #9E9E9E 4 lines);
     col3-4 pl56: quote Sora600 58/58 uppercase #666 (8 lines), author mt40
       — avatar 40 round + gap8: name mono 500 14/17 uppercase
       rgba(255,255,255,.75) + role Geist 15/21 #9E9E9E (stack gap2).
   light B #F0F0F0 pt190 pb120: chip06 "06 PORTFOLIO" → H2 mt20 Sora600
     80/80 -0.06em two-tone (More #0B0D14 / Projects. #5E5E5E) maxW668 →
     cards mt100 grid-2 gap20: strip #EBEBEB pad6/12 (glyph14 orange mask
     + title mono uppercase #686868 | "/ tag" mono lowercase) + image
     657/491 grayscale, hover scale 105.
   seam3 9205-9275: band placement "bottom", orange teeth [2,4,6,8,10] →
     <Contact variant="inner"/> y9275 h1052 → footer (Riwa docH 10948).
   Content: real copy from projectDetails until (line-count-matched rhythm) until the final
   content pass; title/category/period/client/meta from user's data. */

/* --- notch clip-paths (paint-equivalent of Riwa's corner overlay divs) --- */
/* hero/full 1333×800: TR chamfer 35×23 + BL step piece 122×63
   ("M 0 0 L 0 63 L 122 63 L 54.12 24.128 L 19.263 24.128 Z" at 0,737 —
   section bg shows through the clip, dark on the header, light on body) */
const FULL_CUT =
  "polygon(0 0, 97.374% 0, 100% 2.875%, 100% 100%, 9.152% 100%, 4.060% 95.141%, 1.445% 95.141%, 0 92.125%)";
/* two-up 663×400: TR chamfer 26×17 + BL step 93×38 */
const TWO_CUT =
  "polygon(0 0, 96.078% 0, 100% 4.25%, 100% 100%, 14.027% 100%, 6.223% 95.125%, 2.215% 95.125%, 0 90.5%)";

const STAR_PATH =
  "M 19 9.5 L 12.066 12.066 L 9.5 19 L 6.934 12.066 L 0 9.5 L 6.934 6.934 L 9.5 0 L 12.066 6.934 Z";

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

const monoCat: CSSProperties = { ...monoLabel, textTransform: "none" };

const darkChipLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "17px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#CCCCCC",
};

const chipBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 14px",
  borderRadius: 100,
  gap: 12,
};

const chipDarkStyle: CSSProperties = { ...chipBase, background: "#21242B" };
const chipLightStyle: CSSProperties = { ...chipBase, background: "#E6E6E6" };
const chipDot: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "100%",
  background: "rgb(214, 54, 20)",
  flexShrink: 0,
};

const h1Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(2.5rem, 7.16vw, 6.25rem)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  textTransform: "uppercase",
  margin: 0,
};

const dateStyle: CSSProperties = {
  ...darkChipLabel,
  color: "#9E9E9E",
  marginLeft: "auto",
};

const h3Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(32px, 4vw, 48px)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  textTransform: "uppercase",
  color: "var(--color-light-text)",
  margin: 0,
};

const h2Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(40px, 5.73vw, 80px)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  textTransform: "uppercase",
  color: "#9E9E9E",
  margin: 0,
  maxWidth: 668,
};

const bodyDesc: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontSize: 18,
  lineHeight: "25.2px",
  margin: 0,
};

const heroDescStyle: CSSProperties = { ...bodyDesc, color: "#9E9E9E" };
const secDescStyle: CSSProperties = { ...bodyDesc, color: "#686868" };

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

const rowValueStyle: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 16,
  lineHeight: "19.2px",
  fontWeight: 500,
  letterSpacing: "-0.64px",
  color: "rgba(255, 255, 255, 0.75)",
  textAlign: "right",
};

const quoteStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(32px, 4.15vw, 58px)",
  lineHeight: 1,
  textTransform: "uppercase",
  color: "#666666",
  margin: 0,
};

const authorRoleStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontSize: 15,
  lineHeight: "21px",
  color: "#9E9E9E",
};

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

function NumberChip({
  n,
  label,
  dark = false,
}: {
  n: string;
  label: string;
  dark?: boolean;
}) {
  const lbl = dark ? darkChipLabel : monoLabel;
  return (
    <span
      className="inline-flex items-center"
      style={dark ? chipDarkStyle : chipLightStyle}
    >
      <span className="inline-flex items-center" style={{ gap: 4 }}>
        <span style={chipDot} />
        <span style={lbl}>{n}</span>
      </span>
      <span style={lbl}>{label}</span>
    </span>
  );
}

/* header media — img carries 125% slack; scroll parallax 0 → -20% */
function HeroMedia({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "1333 / 800",
        background: "#000000",
        clipPath: FULL_CUT,
      }}
    >
      <motion.div
        className="absolute left-0 top-0 w-full"
        style={{
          height: "125%",
          y,
        }}
        aria-hidden="true"
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

/* body media — static cover, notched corners (section bg shows through) */
function StaticMedia({
  src,
  cut,
  ratio,
}: {
  src: string;
  cut: string;
  ratio: string;
}) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        aspectRatio: ratio,
        background: "#000000",
        clipPath: cut,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ content */

type SectionSpec = {
  n: string;
  label: string;
  h3: string;
  desc: string;
  layout: "two-full" | "two" | "full";
  /** running start index into project.media.body (3+3+2+1 slots = 9) */
  slot: number;
};

/* Sections 01-04 built per-project from projectDetails (real copy) */
function buildSections(project: ProjectDetailData): SectionSpec[] {
  const [h1, h2, h3, h4] = project.heads;
  let slot = 0;
  const take = (layout: SectionSpec["layout"]) => {
    const start = slot;
    slot += layout === "two-full" ? 3 : layout === "two" ? 2 : 1;
    return start;
  };
  const layouts: SectionSpec["layout"][] = ["two-full", "two-full", "two", "full"];
  const heads = [h1, h2, h3, h4];
  const labels = ["Challenge", "Approach", "Result", "Takeaway"];
  const copy = [
    project.challenge,
    project.approach,
    project.result,
    project.takeaway,
  ];
  return layouts.map((layout, i) => ({
    n: String(i + 1).padStart(2, "0"),
    label: labels[i],
    h3: heads[i],
    desc: copy[i],
    layout,
    slot: take(layout),
  }));
}

const TESTIMONIAL_DESC =
  "A short note on the work — how the build changed the process it was made for.";

/* -------------------------------------------------------------------- page */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project =
    projectDetails.find((p) => p.slug === slug) ?? projectDetails[0];

  const sections = buildSections(project);

  const more = projects
    .filter((p) => slugify(p.title) !== slug)
    .slice(0, 2);

  const metaRows: [string, string][] = [
    ["Client", project.client],
    ["Industry", project.category],
    ["Timeline", project.period],
  ];

  // Real testimonial where one exists; otherwise the project takeaway stands
  // in as the author's own note (line-count-matched to Riwa's quote block).
  const quote = project.testimonial?.quote ?? project.takeaway;
  const author = project.testimonial?.author ?? profile.name;
  const authorRole = project.testimonial?.role ?? project.role;

  return (
    <div className="relative">
      {/* ============================ dark project header (y0 h1728) */}
      <section
        className="relative"
        style={{ background: "#080A10", padding: "160px 24px 120px" }}
      >
        <GridLines dark />

        <div className="relative z-10">
          {/* category pill */}
          <Reveal>
            <span className="inline-flex items-center" style={chipDarkStyle}>
              <span style={chipDot} />
              <span style={darkChipLabel}>{project.category}</span>
            </span>
          </Reveal>

          {/* "/" + title | date (bottom-aligned to the H1 box) */}
          <Reveal delay={0.08}>
            <div
              className="flex flex-wrap items-end justify-between lg:flex-nowrap"
              style={{ marginTop: 20, gap: 20 }}
            >
              <div className="flex items-start" style={{ gap: 10, minWidth: 0 }}>
                <span
                  aria-hidden="true"
                  style={{ ...h1Style, color: "#5E5E5E", flexShrink: 0 }}
                >
                  /
                </span>
                <h1 style={{ ...h1Style, color: "#FFFFFF" }}>
                  {project.title}
                </h1>
              </div>
              <span style={dateStyle}>{project.period}</span>
            </div>
          </Reveal>

          {/* [col1 visit button | col2 empty | col3-4 desc + meta rows] */}
          <div
            className="grid grid-cols-1 lg:grid-cols-4"
            style={{ marginTop: 100, rowGap: 40 }}
          >
            <div>
              <Reveal>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group"
                  style={btnStyle}
                >
                  <span
                    className="flex flex-col overflow-hidden"
                    style={{ height: 16 }}
                  >
                    <span className="btn-roll">
                      <span className="block" style={btnTxtStyle}>
                        Visit Website
                      </span>
                      <span className="block" style={btnTxtStyle}>
                        Visit Website
                      </span>
                    </span>
                  </span>
                  <span
                    className="block shrink-0"
                    style={{ width: 26, height: 26 }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="13" cy="13" r="13" fill="#FFFFFF" />
                      <path
                        d="M13 5.5V20.5M5.5 13H20.5M7.7 7.7L18.3 18.3M18.3 7.7L7.7 18.3"
                        stroke="rgb(214, 54, 20)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>
            </div>

            <div className="hidden lg:block" aria-hidden="true" />

            <div className="lg:col-span-2">
              <Reveal delay={0.05}>
                <p style={heroDescStyle}>{project.description}</p>

                <div
                  style={{
                    marginTop: 40,
                    display: "flex",
                    flexDirection: "column",
                    gap: 21,
                    paddingBottom: 21,
                  }}
                >
                  {metaRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex"
                      style={{ padding: 14, gap: 10, alignItems: "center" }}
                    >
                      <span
                        style={{ ...rowLabelStyle, flex: "1 1 0", minWidth: 0 }}
                      >
                        {label}/
                      </span>
                      <span
                        style={{ ...rowValueStyle, flex: "1 1 0", minWidth: 0 }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* media1 — parallax hero (125% slack), TR notch */}
          <div style={{ marginTop: 100 }}>
            <Reveal>
              <HeroMedia src={project.media.hero} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* seam1: dark → light (top-anchored dark teeth 10/8/6/4/2) */}
      <div
        className="relative"
        style={{ height: 70, background: "var(--color-light-bg)" }}
      >
        <AnimatedLinesBand
          placement="top"
          color="#080A10"
          lineHeights={[10, 8, 6, 4, 2]}
          gapPx={10}
          containerFrom={70}
          containerTo={30}
          gapColor="transparent"
        />
      </div>

      {/* ============================ light sections 01-04 (pt160 pb120) */}
      <section
        className="relative"
        style={{
          background: "var(--color-light-bg)",
          padding: "160px 24px 120px",
        }}
      >
        <GridLines />

        <div className="relative z-10">
          {sections.map((s, idx) => (
            <div key={s.n} style={{ marginTop: idx === 0 ? 0 : 100 }}>
              {/* row1: chip col1 | H3 col2-4 */}
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div>
                  <Reveal>
                    <NumberChip n={s.n} label={s.label} />
                  </Reveal>
                </div>
                <div className="lg:col-span-3">
                  <Reveal delay={0.05}>
                    <h3 style={h3Style}>{s.h3}</h3>
                  </Reveal>
                </div>
              </div>

              {/* row2: rule+star col2 (anchored to desc's last line) | desc col3-4 */}
              <div
                className="grid grid-cols-1 lg:grid-cols-4"
                style={{ marginTop: 40 }}
              >
                <div className="hidden lg:block" aria-hidden="true" />
                <div className="lg:col-start-2 self-end">
                  <div
                    className="relative"
                    style={{ height: 19, marginBottom: 2 }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 9,
                        height: 1,
                        background: "#CCCCCC",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: -9,
                        top: 0,
                        width: 19,
                        height: 19,
                        color: "#CCCCCC",
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
                </div>
                <div className="lg:col-start-3 lg:col-span-2">
                  <Reveal delay={0.1}>
                    <p style={secDescStyle}>{s.desc}</p>
                  </Reveal>
                </div>
              </div>

              {/* media: two-up (+full) / full only */}
              <Reveal delay={0.15}>
                <div
                  style={{
                    marginTop: 80,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {s.layout !== "full" && (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2"
                      style={{ gap: 8 }}
                    >
                      <StaticMedia
                        src={project.media.body[s.slot]}
                        cut={TWO_CUT}
                        ratio="663 / 400"
                      />
                      <StaticMedia
                        src={project.media.body[s.slot + 1]}
                        cut={TWO_CUT}
                        ratio="663 / 400"
                      />
                    </div>
                  )}
                  {s.layout !== "two" && (
                    <StaticMedia
                      src={
                        project.media.body[
                          s.layout === "full" ? s.slot : s.slot + 2
                        ]
                      }
                      cut={FULL_CUT}
                      ratio="1333 / 800"
                    />
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* seam2: light → dark (bottom-anchored dark teeth 2/4/6/8/10) */}
      <div
        className="relative"
        style={{ height: 70, background: "var(--color-light-bg)" }}
      >
        <AnimatedLinesBand
          placement="bottom"
          color="#080A10"
          lineHeights={[2, 4, 6, 8, 10]}
          gapPx={10}
          containerFrom={70}
          containerTo={30}
          gapColor="transparent"
        />
      </div>

      {/* ============================ dark testimonial 05 (pad 120) */}
      <section
        className="relative"
        style={{ background: "#080A10", padding: "120px 24px" }}
      >
        <GridLines dark />

        <div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-4"
          style={{ rowGap: 40 }}
        >
          <div className="lg:col-span-1">
            <Reveal>
              <NumberChip n="05" label="Feedback" dark />
            </Reveal>
            <Reveal delay={0.05}>
              <p style={{ ...heroDescStyle, marginTop: 40 }}>
                {TESTIMONIAL_DESC}
              </p>
            </Reveal>
          </div>

          <div
            className="lg:col-start-3 lg:col-span-2"
            style={{ paddingLeft: 56 }}
          >
            <Reveal>
              <p style={quoteStyle}>{quote}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div
                className="flex items-center"
                style={{ gap: 8, marginTop: 40 }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    flexShrink: 0,
                    background:
                      "radial-gradient(circle at 35% 30%, #4A4A4A, #1D1D1D)",
                  }}
                />
                <span
                  className="flex flex-col"
                  style={{ gap: 2, minWidth: 0 }}
                >
                  <span style={rowLabelStyle}>{author}</span>
                  <span style={authorRoleStyle}>{authorRole}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ MORE PROJECTS 06 (pt190 pb120) */}
      <section
        className="relative"
        style={{
          background: "var(--color-light-bg)",
          padding: "190px 24px 120px",
        }}
      >
        <GridLines />

        <div className="relative z-10">
          <Reveal>
            <div>
              <NumberChip n="06" label="Portfolio" />
            </div>
            <h2 style={{ ...h2Style, marginTop: 20 }}>
              <span className="block" style={{ color: "var(--color-light-text)" }}>
                More
              </span>
              <span className="block" style={{ color: "var(--color-light-muted)" }}>
                Projects.
              </span>
            </h2>
          </Reveal>

          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: 20, marginTop: 100 }}
          >
            {more.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  to={`/projects/${slugify(p.title)}`}
                  className="group block"
                >
                  <div
                    className="flex items-center justify-between"
                    style={{
                      background: "#EBEBEB",
                      padding: "6px 12px",
                      gap: 16,
                    }}
                  >
                    <span className="flex items-center min-w-0" style={{ gap: 16 }}>
                      <span
                        className="block shrink-0"
                        style={{
                          width: 14,
                          height: 14,
                          background: "rgb(214, 54, 20)",
                          WebkitMaskImage: CARD_ICON_MASK,
                          maskImage: CARD_ICON_MASK,
                          WebkitMaskSize: "auto, auto",
                          maskSize: "auto, auto",
                          WebkitMaskPosition: "50% 50%",
                          maskPosition: "50% 50%",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                        }}
                      />
                      <span
                        style={{
                          ...monoLabel,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.title}
                      </span>
                    </span>
                    <span
                      className="flex items-center shrink-0"
                      style={{ gap: 4 }}
                    >
                      <span style={monoCat}>/ {p.tags[0]}</span>
                    </span>
                  </div>

                  <div
                    className="overflow-hidden bg-black"
                    style={{ aspectRatio: "657 / 491" }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                        style={{
                          background: PLACEHOLDERS[i % PLACEHOLDERS.length],
                        }}
                      />
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* seam3: light → orange contact (bottom-anchored orange teeth) */}
      <div
        className="relative"
        style={{ height: 70, background: "var(--color-light-bg)" }}
      >
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
