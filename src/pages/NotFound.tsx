import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

/* ---------------------------------------------------------------------------
   Riwa /404 — live-probed (iw1397, docH 2498):
   - orange hero rgb(214,54,20) h836 pad "120 24" + faint white 5-line
     overlay (inset 24); container col2–3 (x357 w667) flex-col items-center
     gap20:
       chip pill #E9681E r100 pad 8/14 gap12 [white dot 10 + "PAGE NOT
         FOUND" mono 14 white uppercase] y120 h33 (centered x611 w160)
       H1 "404" white Sora 600, visual fs ≈340 (Riwa = fs100 inside a 3.4×
         scaled SVG), lh 1, ls -0.06em, left-aligned, y173 h340
       desc + button block gap40: p w320 center Geist 16/19.2 white y533
         h77 | <a href="./"> full-width h66 white r40 1px #E6E6E6, centered
         "BACK TO HOME PAGE" Sora 600 16 #0B0D14 (text-roll) + icon 26
         (circle #21242B, arrows + diamond #CCCCCC) y650
   - FAQ inner y836 (orange band teeth [10,8,6,4,2] gap10 70→30 at top,
     pad 190 → chip y1026, H2 y1079, cards x691 w666); NO seam below FAQ
     → footer h604. No orange contact section on 404.
--------------------------------------------------------------------------- */

const chipText: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const h1Style: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(96px, 24.34vw, 343px)",
  lineHeight: 1,
  letterSpacing: "-0.06em",
  color: "#FFFFFF",
  margin: 0,
  width: "100%",
  textAlign: "left",
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

/* circle + 4-way arrows button icon (dicto Riwa 404 sprite svg1830319720_908) */
function BackBtnIcon({ className = "" }: { className?: string }) {
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
        fill="#21242B"
      />
      <path
        d="M 13 21.667 L 13 17.333 C 13 14.94 11.06 13 8.667 13 L 4.333 13 M 21.667 13 L 17.333 13 C 14.94 13 13 14.94 13 17.333 L 13 21.667 M 13 4.333 L 13 8.667 C 13 11.06 14.94 13 17.333 13 L 21.667 13 M 4.333 13 L 8.667 13 C 11.06 13 13 11.06 13 8.667 L 13 4.333"
        fill="transparent"
        stroke="#CCCCCC"
        strokeWidth={1}
        strokeMiterlimit={10}
      />
      <path d="M 13 15.708 L 10.292 13 L 13 9.75 L 15.708 13 Z" fill="#CCCCCC" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div>
      <section
        className="relative"
        style={{ background: "rgb(214, 54, 20)", padding: "120px 24px" }}
      >
        {/* faint white 5-line overlay (orange sections) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-px block"
                style={{ background: "rgba(255, 255, 255, 0.15)" }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-start-2 lg:col-span-2">
            <div className="flex flex-col" style={{ gap: 20 }}>
              <Reveal className="flex justify-center">
                <div
                  className="inline-flex items-center"
                  style={{
                    background: "rgb(233, 104, 30)",
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
                      background: "#FFFFFF",
                    }}
                  />
                  <span style={chipText}>Page not found</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 style={h1Style}>404</h1>
              </Reveal>

              <Reveal delay={0.15}>
                <div
                  className="flex flex-col items-center"
                  style={{ gap: 40, width: "100%" }}
                >
                  <p
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "19.2px",
                      color: "#FFFFFF",
                      textAlign: "center",
                      maxWidth: 320,
                      margin: 0,
                    }}
                  >
                    It seems you&rsquo;ve reached a page that doesn&rsquo;t
                    exist. Head back to the homepage or use the navigation above
                    to continue exploring.
                  </p>

                  <Link
                    to="/"
                    className="group"
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <div
                      className="flex items-center justify-center box-border"
                      style={{
                        height: 66,
                        gap: 16,
                        padding: "20px 20px 20px 24px",
                        borderRadius: 40,
                        background: "#FFFFFF",
                        border: "1px solid #E6E6E6",
                      }}
                    >
                      <div
                        className="flex flex-col overflow-hidden"
                        style={{ height: 16 }}
                      >
                        <div className="btn-roll">
                          <span style={btnTextStyle}>Back to home page</span>
                          <span style={btnTextStyle}>Back to home page</span>
                        </div>
                      </div>
                      <BackBtnIcon className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ inner — orange band teeth at the hero seam (dicto Riwa 404) */}
      <FAQ
        variant="inner"
        band={{
          color: "rgb(214, 54, 20)",
          lineHeights: [10, 8, 6, 4, 2],
          gapPx: 10,
          containerFrom: 70,
          containerTo: 30,
        }}
      />
      <Footer />
    </div>
  );
}
