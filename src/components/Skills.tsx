import { Reveal } from "./Reveal";
import { skillGroups } from "../data/resume";
import AnimatedLinesBand from "./AnimatedLinesBand";

/* Riwa 06 benefits section — light #F0F0F0 section with the 5-line page
   overlay showing through, chip left col (25%) beside a big two-tone
   heading + centered description (gap 40), then a white card masonry
   grid: 3 equal columns, gap 8, pad 24, radius 0, corner cuts carving
   the card with the section bg (same svg cuts as the workflow cards).
   Card title = IBM Plex Mono 500/16/19.2 -0.64px #0B0D14 (not uppercase
   in Riwa). Skill pills keep our tag content, restyled for white cards. */

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

type Group = (typeof skillGroups)[number];

export default function Skills() {
  /* 7 groups → masonry columns 3 / 2 / 2 (Riwa: 3 cols, gap 8) */
  const columns: Group[][] = [[], [], []];
  skillGroups.forEach((group, i) => columns[i % 3].push(group));

  return (
    <section
      className="bg-[var(--color-light-bg)] relative"
      style={{ padding: "120px 24px" }}
    >
      {/* 5 vertical white lines — dicto Riwa benefits (same overlay as
          Experience/Projects: 17 / 25 / 50 / 75 / right17) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      <div className="relative z-10">
        {/* Header row — Riwa: chip col 25% | heading + desc col 75%, gap 40 */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-start">
          <div className="lg:w-1/4 shrink-0">
            <Reveal>
              {/* Riwa chip dicto: bg #E6E6E6, r100, pad 8/14, mono 14,
                  orange dot (section-label::before), text #686868 */}
              <div
                className="section-label"
                style={{
                  background: "#E6E6E6",
                  padding: "8px 14px",
                  borderRadius: 100,
                  fontSize: 14,
                  marginBottom: 0,
                }}
              >
                <span className="section-label-number" style={{ fontSize: 14 }}>
                  06
                </span>
                skills &amp; tools
              </div>
            </Reveal>
          </div>

          <div className="lg:w-3/4 flex flex-col" style={{ gap: 40 }}>
            <Reveal>
              <h2
                className="section-heading section-heading-light"
                style={{ letterSpacing: "-0.06em" }}
              >
                Tech <span className="section-heading-muted">Stack</span>
              </h2>
            </Reveal>
            <Reveal>
              <div className="mx-auto" style={{ width: 330, maxWidth: "100%" }}>
                <p
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontSize: 18,
                    lineHeight: "25.2px",
                    color: "#686868",
                    margin: 0,
                  }}
                >
                  The stack behind everything I ship — typed backends, AI-native
                  features, and cloud infrastructure that stays up in production.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cards — Riwa grid: flex, gap 8, white cards top-aligned in
            independent columns (masonry), 100px below the header block */}
        <div className="flex flex-col md:flex-row gap-2 mt-[100px]">
          {columns.map((column, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-2">
              {column.map((group, gi) => (
                <Reveal key={group.title} delay={(ci + gi) * 0.08}>
                  <div className="relative bg-white" style={{ padding: 24 }}>
                    {CARD_CUTS.map((cut) => (
                      <svg
                        key={cut.pos}
                        width={cut.w}
                        height={cut.h}
                        viewBox={`0 0 ${cut.w} ${cut.h}`}
                        fill="none"
                        className={`absolute ${cut.pos} pointer-events-none`}
                      >
                        <path d={cut.d} fill="var(--color-light-bg)" />
                      </svg>
                    ))}
                    <h4
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: "19.2px",
                        letterSpacing: "-0.64px",
                        color: "#0B0D14",
                        margin: 0,
                      }}
                    >
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
                      {group.skills.map((skill) => (
                        <span
                          key={skill.label}
                          className="riwa-btn riwa-btn-outline-light text-xs py-2 px-3"
                        >
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* band: 06 (light) → 07 (dark testimonials) — dark bars on the light backdrop */}
      <AnimatedLinesBand />
    </section>
  );
}
