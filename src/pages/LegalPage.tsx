import type { CSSProperties } from "react";
import { Reveal } from "../components/Reveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { BarcodeDecor, STAR_PATH } from "./AboutPage";

/* ---------------------------------------------------------------------------
   Shared legal layout — dicto Riwa /terms-of-service + /privacy-policy.

   Probe facts (Riwa live, iw1044):
   - section pad "120px 24px", bg #F0F0F0, 5 vertical white lines inset-24
     quarter-spaced (BlogPage overlay)
   - chip "LEGAL" x24 y120 h33 (pill #E6E6E6 pad 8/14 r100 gap12, orange
     dot 10, mono 14)
   - H1 col2–4: Sora 600, clamp(5rem, 7.16vw, 6.25rem), lh 1.0, ls -0.06em,
     uppercase, dark #0B0D14 + gray span rgb(94,94,94); privacy = forced
     break (PRIVACY / POLICY.), terms = one line
   - barcode decor 26×146 at right 24, top 120 (same as AboutPage barcode)
   - last-updated row mt40: star(19) centered on col2 line + 1px #CCCCCC
     rule col2→col3 | "Last Updated:" + date at col3, gap ~8, Geist 18/25.2
     #686868
   - intro mt100, Geist 18/25.2 #686868, text-wrap: balance, col2–right
   - sections: H4 (Sora 600 24/24 #0B0D14, mt40) → content mt20; body
     Geist 18/25.2 #686868 balance; ul disc pl24, li contiguous lh25.2
   - ends: 30px light gap → Contact inner → Footer
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

const bodyText: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "25.2px",
  color: "#686868",
  textWrap: "balance",
  margin: 0,
};

type LegalSection = {
  heading: string;
  paragraph?: string;
  items?: string[];
};

type LegalDoc = {
  titleDark: string;
  titleGray: string;
  titleBreak: boolean;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const TERMS: LegalDoc = {
  titleDark: "Terms of",
  titleGray: "Use.",
  titleBreak: false,
  updated: "Dec 20, 2025",
  intro:
    "It is a legal agreement that outlines the rules, responsibilities, and expectations between a website, app, or service provider and its users.",
  sections: [
    {
      heading: "1. Introduction",
      paragraph:
        'Welcome to the Priyanshu Lodha portfolio (the "Website"). By accessing and using this Website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use this Website.',
    },
    {
      heading: "2. About This Website",
      paragraph:
        "This Website is a personal portfolio presenting projects, writing, and contact details. Content is provided for informational purposes and may be updated, replaced, or removed at any time without notice.",
    },
    {
      heading: "3. User Responsibilities",
      items: [
        "Use the Website only for lawful purposes.",
        "Attempt to gain unauthorized access to our systems or hosting infrastructure.",
        "Copy, reproduce, or redistribute content without permission.",
        "Scrape or index the site in a way that degrades its availability.",
        "Misrepresent your identity when reaching out through the contact form.",
      ],
    },
    {
      heading: "4. Correspondence",
      items: [
        "Messages sent through the contact form are used only to respond to your enquiry.",
        "No account is created and no credentials are stored by this Website.",
        "Correspondence may be retained for as long as follow-up is relevant.",
      ],
    },
    {
      heading: "5. Intellectual Property",
      items: [
        "Project screenshots, writing, and code samples remain the property of their respective owners.",
        "Original content on this Website may not be resold or presented as someone else's work.",
        "Third-party trademarks, logos, and libraries belong to their respective owners.",
      ],
    },
    {
      heading: "6. Limitation of Liability",
      paragraph:
        "This Website is provided \"as is\" without warranties of any kind. I am not liable for any damages, including lost profits or data, resulting from the use of, or inability to use, this Website. I do not guarantee that it will be error-free or uninterrupted.",
    },
    {
      heading: "7. Termination",
      paragraph:
        "Access may be restricted, suspended, or terminated at any time, including for conduct that violates these Terms of Use.",
    },
    {
      heading: "8. Changes to These Terms",
      paragraph:
        "These Terms of Use may be updated from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of the Website after changes are posted constitutes your acceptance of the new terms.",
    },
    {
      heading: "9. Governing Law",
      paragraph:
        "These Terms of Use shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Pune, Maharashtra.",
    },
  ],
};

const PRIVACY: LegalDoc = {
  titleDark: "Privacy",
  titleGray: "Policy.",
  titleBreak: true,
  updated: "Dec 20, 2025",
  intro:
    "It is a legal document that explains how a website collects, uses, stores, and protects user data.",
  sections: [
    {
      heading: "1. Introduction",
      paragraph:
        'Welcome to the Priyanshu Lodha portfolio (the "Website"). Your privacy matters to me. This Privacy Policy explains how information is collected, used, disclosed, and safeguarded when you visit this Website.',
    },
    {
      heading: "2. Information We Collect",
      items: [
        "Personal information you provide directly, such as your name and email address.",
        "Usage data, including pages visited and time spent on the Website.",
        "Device and browser information collected through cookies.",
        "Information you submit through contact or inquiry forms.",
      ],
    },
    {
      heading: "3. How Your Information Is Used",
      items: [
        "To provide, operate, and improve this Website.",
        "To communicate with you and respond to your inquiries.",
        "To analyze usage trends and enhance the experience.",
        "To comply with legal obligations and protect my rights.",
      ],
    },
    {
      heading: "4. Cookies and Tracking Technologies",
      paragraph:
        "Cookies and similar technologies may be used to track activity on this Website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    },
    {
      heading: "5. Third-Party Services",
      paragraph:
        "Information may be processed by third-party service providers that assist in operating this Website — for example hosting and form delivery — provided those parties agree to keep the information confidential.",
    },
    {
      heading: "6. Data Security",
      paragraph:
        "Administrative and technical safeguards are used to protect personal information. However, no method of transmission over the Internet is 100% secure, and absolute security cannot be guaranteed.",
    },
    {
      heading: "7. Your Rights",
      paragraph:
        "Depending on your location, you may have the right to access, update, or delete the personal information held about you at any time by getting in touch through the contact page.",
    },
    {
      heading: "8. Children's Privacy",
      paragraph:
        "This Website is not intended for use by children under the age of 13, and personal information from children is not knowingly collected.",
    },
    {
      heading: "9. Changes to This Policy",
      paragraph:
        "This Privacy Policy may be updated from time to time. Changes will be effective when posted on this page with an updated revision date.",
    },
    {
      heading: "10. Contact",
      paragraph:
        "If you have questions or concerns about this Privacy Policy, please reach out through the contact page of this Website.",
    },
  ],
};

function LegalDocPage({ doc }: { doc: LegalDoc }) {
  return (
    <div>
      <section
        className="bg-[var(--color-light-bg)] relative"
        style={{ padding: "120px 24px" }}
      >
        {/* 5 vertical white lines — 24 inset, quarter-spaced, pure white */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-px block bg-white" />
            ))}
          </div>
        </div>

        {/* barcode ornament — right:24, top:120 (dicto Riwa legal hero) */}
        <BarcodeDecor style={{ right: 24, top: 120 }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4">
          {/* row 1 — chip col1 | heading col2–4 */}
          <div className="lg:col-span-1">
            <Reveal>
              <div
                className="inline-flex items-center"
                style={{ background: "#E6E6E6", padding: "8px 14px", borderRadius: 100, gap: 12 }}
              >
                <span
                  className="block"
                  style={{ width: 10, height: 10, borderRadius: "100%", background: "rgb(214, 54, 20)" }}
                />
                <span style={monoLabel}>Legal</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <h1
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(5rem, 7.16vw, 6.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                <span style={{ color: "var(--color-light-text)" }}>{doc.titleDark}</span>
                {doc.titleBreak ? (
                  <span className="block" style={{ color: "var(--color-light-muted)" }}>
                    {doc.titleGray}
                  </span>
                ) : (
                  <span style={{ color: "var(--color-light-muted)" }}> {doc.titleGray}</span>
                )}
              </h1>
            </Reveal>
          </div>

          {/* row 2 — star + rule (col2) | Last Updated + date (col3) */}
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
                <div className="flex items-center lg:col-start-2" style={{ gap: 8 }}>
                  <p style={bodyText}>Last Updated:</p>
                  <p style={bodyText}>{doc.updated}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* row 3 — intro, col2–4, mt100 */}
          <div className="lg:col-start-2 lg:col-span-3" style={{ marginTop: 100 }}>
            <Reveal>
              <p style={bodyText}>{doc.intro}</p>
            </Reveal>
          </div>

          {/* row 4 — sections, col2–4 */}
          <div className="lg:col-start-2 lg:col-span-3">
            {doc.sections.map((sec) => (
              <Reveal key={sec.heading}>
                <div>
                  <h4
                    style={{
                      fontFamily: '"Sora", sans-serif',
                      fontWeight: 600,
                      fontSize: 24,
                      lineHeight: "24px",
                      color: "var(--color-light-text)",
                      textTransform: "uppercase",
                      marginTop: 40,
                      marginBottom: 0,
                    }}
                  >
                    {sec.heading}
                  </h4>
                  {sec.paragraph && (
                    <p style={{ ...bodyText, marginTop: 20 }}>{sec.paragraph}</p>
                  )}
                  {sec.items && (
                    <ul
                      style={{
                        listStyle: "disc",
                        paddingLeft: 24,
                        marginTop: 20,
                        marginBottom: 0,
                      }}
                    >
                      {sec.items.map((item) => (
                        <li key={item}>
                          <p style={bodyText}>{item}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 30px light gap → orange contact (dicto Riwa legal ending) */}
      <div style={{ height: 30, background: "var(--color-light-bg)" }} />
      <Contact variant="inner" />
      <Footer />
    </div>
  );
}

export function TermsPage() {
  return <LegalDocPage doc={TERMS} />;
}

export function PrivacyPage() {
  return <LegalDocPage doc={PRIVACY} />;
}
