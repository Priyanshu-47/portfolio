import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import AnimatedLinesBand from "../components/AnimatedLinesBand";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { PLACEHOLDERS } from "./ProjectsPage";
import { STAR_PATH } from "./AboutPage";

/* ---------------------------------------------------------------------------
   Shared photo-gallery layout — dicto Riwa /about/photo-archive +
   /about/photo-moments (live-probed @ iw1397, docH 3391 both pages):
   - light section #F0F0F0 pad "120 24", 5 white inset-24 quarter lines
   - row1: chip col1 (pill #E6E6E6 pad 8/14 r100 gap12, orange dot 10,
     mono 14 #686868 "/2025") | H1 col2–4 Sora 600 100/100 -6px uppercase,
     2 lines ("PHOTO" #0B0D14 / "ARCHIVE." #5E5E5E), y120 h200
   - row2 mt40: star + rule 1px #CCC w330 col2 (y364) | desc Geist 18/25.2
     #686868 w330 col3 (y360)
   - row3 mt100 (y485): full-width 2-col grid gap20, cards =
     label bar h29 (bg #EBEBEB, 1px #DEDEDE, pad 5/12: [dot10 #E53B17 +
     gap20 + "MOMENTS" mono14 uppercase #686868] | ["/" gap4 "photo-N"])
     + img aspect 657/491 cover
   - section ends 1665 → light seam strip h70 (orange teeth [2,4,6,8,10]
     gap10 70→30) → Contact inner (orange h1052) → Footer h604.
--------------------------------------------------------------------------- */

const monoLabel: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#686868",
};

const monoPlain: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  color: "#686868",
};

const bodyText: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "25.2px",
  color: "#686868",
  textWrap: "balance",
  margin: 0,
};

const h1Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(3.5rem, 7.16vw, 6.25rem)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  textTransform: "uppercase",
  margin: 0,
};

function PhotoCard({ n, delay }: { n: number; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col">
        {/* label bar — dicto Riwa "Project Header" */}
        <div
          className="flex items-center justify-between box-border"
          style={{ background: "#EBEBEB", border: "1px solid #DEDEDE", padding: "5px 12px" }}
        >
          <span className="inline-flex items-center" style={{ gap: 20 }}>
            <span
              className="block shrink-0"
              style={{
                width: 10,
                height: 10,
                borderRadius: "100%",
                background: "rgb(229, 59, 23)",
              }}
            />
            <span style={monoLabel}>Moments</span>
          </span>
          <span className="inline-flex items-center" style={{ gap: 4 }}>
            <span style={monoPlain}>/</span>
            <span style={monoPlain}>photo-{n}</span>
          </span>
        </div>
        {/* image — full-bleed under the bar */}
        <div className="group overflow-hidden" style={{ aspectRatio: "657 / 491" }}>
          <div
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ background: PLACEHOLDERS[(n - 1) % PLACEHOLDERS.length] }}
          />
        </div>
      </div>
    </Reveal>
  );
}

function PhotoPage({
  chip,
  titleDark,
  titleGray,
  desc,
}: {
  chip: string;
  titleDark: string;
  titleGray: string;
  desc: string;
}) {
  return (
    <div>
      <section
        className="bg-[var(--color-light-bg)] relative"
        style={{ padding: "120px 24px" }}
      >
        {/* 5 vertical white lines — 24 inset, quarter-spaced (dicto Riwa) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-px block bg-white" />
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4">
          {/* row 1 — chip col1 | H1 col2–4 */}
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
                <span
                  className="block"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "100%",
                    background: "rgb(214, 54, 20)",
                  }}
                />
                <span style={monoLabel}>{chip}</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <h1 style={h1Style}>
                <span className="block" style={{ color: "var(--color-light-text)" }}>
                  {titleDark}
                </span>
                <span className="block" style={{ color: "var(--color-light-muted)" }}>
                  {titleGray}
                </span>
              </h1>
            </Reveal>
          </div>

          {/* row 2 — star + rule (col2) | desc (col3) */}
          <div className="lg:col-start-2 lg:col-span-3" style={{ marginTop: 40 }}>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="relative" style={{ height: 25 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 12,
                      height: 1,
                      background: "#CCCCCC",
                    }}
                  />
                  <svg
                    style={{
                      position: "absolute",
                      left: -9.5,
                      top: 3,
                      width: 19,
                      height: 19,
                    }}
                    viewBox="0 0 19 19"
                    aria-hidden="true"
                  >
                    <path d={STAR_PATH} fill="var(--color-light-muted)" />
                  </svg>
                </div>
                <div className="lg:col-start-2">
                  <p style={bodyText}>{desc}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* row 3 — photo grid, full width mt100 */}
          <div className="lg:col-span-4" style={{ marginTop: 100 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20 }}>
              {[1, 2, 3, 4].map((n) => (
                <PhotoCard key={n} n={n} delay={n * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* seam: light strip h70 + Riwa teeth (orange [2,4,6,8,10]) → contact */}
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

export function PhotoArchivePage() {
  return (
    <PhotoPage
      chip="/2025"
      titleDark="photo"
      titleGray="archive."
      desc="Inside the studio"
    />
  );
}

export function PhotoMomentsPage() {
  return (
    <PhotoPage
      chip="/2026"
      titleDark="photo"
      titleGray="moments."
      desc="Work in progress"
    />
  );
}
