import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";

/* Riwa footer — live-verified (riwa-footer.png pixel scans + DOM probes @vw1382):
   h604 overflow-clip, bg #080A10, inner pad "0 24px" (content 1334).
   Top row h308 = two 667px cols: LEFT pad-top 160 (head row pl12 + 12px icon
   gap 24 → text at +48, mono 500 14/17 -0.56 #9E9E9E; phone mt15 pl48 mono 16/19
   white; email pl48 Geist ~38/1.29 white, mt0) | RIGHT border-l/b 1px
   rgba(39,40,44,.5), pad-top 160, space-between 3 cols [259 nav pl48 | 259
   social pl48 | 128 back-to-top]: nav = 4 links Inter 16/19 gap7 (Riwa has no
   Contact link), social = 3 links + 14px ↗ arrow, btt at y160 = Sora600 16
   text-roll (window 16, .btn-roll) + 13×16 up arrow. Watermark y308 box
   1225×353 overflow-hidden: condensed "LODHA" (Sora700 827px, lh827, ls-0.06em,
   scaleX .427 → width 1225, cap 634, top -202 → letters cut at box top exactly
   like Riwa's cover-cropped wordmark image) + ® Sora700 145px at x1232/294;
   both #181A1E (RGB sampled from Riwa's watermark PNG). Diagonal hairline
   (359,-1)→(692,175): 377px line rotate 27.86° white 7%; 1px edge hairlines
   x24/x1357 rgba(39,40,44,.5) full height (DOM vfl slots). Copyright row y624
   (Geist 16/22 rgba(255,255,255,.5), terms x547, privacy x688) sits past 604 →
   CLIPPED on Riwa (dicto: kept in DOM, clipped at lg); stacks visibly on
   mobile. Head glyphs 12px orange dots/triangle/asterisk. */

const monoHead: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17px",
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#9E9E9E",
};

const linkStyle: CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "19px",
  color: "#FFFFFF",
  textDecoration: "none",
  display: "block",
};

const copyStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "22px",
  color: "rgba(255, 255, 255, 0.5)",
  textDecoration: "none",
};

const bttTextStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  color: "#FFFFFF",
  whiteSpace: "nowrap",
};

const ARROW_UR = "M 3 13 L 13 3 M 13 3 H 5.5 M 13 3 V 10.5";

const HAIRLINE: CSSProperties = {
  background: "rgba(39, 40, 44, 0.5)",
};

function HeadGlyph({ kind }: { kind: "dots" | "tri" | "ast" }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 14 14"
      fill="var(--color-orange)"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {kind === "dots" && (
        <>
          <circle cx="7" cy="2.4" r="2.3" />
          <circle cx="11.6" cy="7" r="2.3" />
          <circle cx="7" cy="11.6" r="2.3" />
          <circle cx="2.4" cy="7" r="2.3" />
        </>
      )}
      {kind === "tri" && <path d="M7 1 L13 13 H1 Z" />}
      {kind === "ast" && (
        <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" />
      )}
    </svg>
  );
}

function Head({ kind, label }: { kind: "dots" | "tri" | "ast"; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, paddingLeft: 12 }}>
      <HeadGlyph kind={kind} />
      <span style={monoHead}>{label}</span>
    </div>
  );
}

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span style={{ display: "block", overflow: "hidden", height: 16 }}>
        <span className="btn-roll">
          <span style={bttTextStyle}>Back to top</span>
          <span style={bttTextStyle}>Back to top</span>
        </span>
      </span>
      <svg
        width={13}
        height={16}
        viewBox="0 0 13 16"
        fill="none"
        className="transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
      >
        <path d="M 6.5 15 V 1.5 M 1.5 6.5 L 6.5 1.5 L 11.5 6.5" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    </button>
  );
}

export default function Footer() {
  /* Riwa footer nav = Home/About/Projects/Blog only (no Contact — dicto) */
  const navLinks: Array<{ to: string; label: string }> = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
  ];

  const socials: Array<{ href: string; label: string }> = [
    ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn" }] : []),
    ...(profile.github ? [{ href: profile.github, label: "GitHub" }] : []),
    { href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer
      className="relative overflow-hidden px-6 pt-[60px] pb-10 lg:pt-0 lg:pb-0 lg:h-[604px]"
      style={{ background: "var(--color-dark-bg)" }}
    >
      <div className="relative lg:h-full">
        {/* Top row h308: contact | nav/social/back-to-top */}
        <div className="lg:flex lg:h-[308px]">
          {/* LEFT: contact info (Riwa pad-top 160) */}
          <div className="lg:w-1/2 lg:pt-[160px]">
            <Head kind="dots" label="Contact" />
            <a
              href={`tel:${profile.phoneRaw}`}
              style={{
                display: "block",
                marginTop: 15,
                paddingLeft: 48,
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "19px",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              {profile.phone}
            </a>
            <a
              href={`mailto:${profile.email}`}
              style={{
                display: "block",
                paddingLeft: 48,
                fontFamily: '"Geist", sans-serif',
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 2.72vw, 38px)",
                lineHeight: 1.29,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                textDecoration: "none",
                wordBreak: "break-word",
              }}
            >
              {profile.email}
            </a>
          </div>

          {/* RIGHT: nav | social | back-to-top (Riwa border-l/b hairline) */}
          <div
            className="flex flex-col gap-8 mt-10 lg:mt-0 lg:mt-0 lg:w-1/2 lg:flex-row lg:justify-between lg:gap-0 lg:pt-[160px] lg:border-l lg:border-b"
            style={{ borderColor: "rgba(39, 40, 44, 0.5)" }}
          >
            <div className="lg:w-[259px] lg:pl-12">
              <Head kind="tri" label="Navigation" />
              <nav className="flex flex-col" style={{ gap: 7, marginTop: 15 }}>
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={linkStyle}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="lg:w-[259px] lg:pl-12">
              <Head kind="ast" label="Social" />
              <div className="flex flex-col" style={{ gap: 7, marginTop: 15 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center hover:opacity-70 transition-opacity"
                    style={{ ...linkStyle, display: "inline-flex", gap: 8 }}
                  >
                    {s.label}
                    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d={ARROW_UR} stroke="#FFFFFF" strokeWidth="1.5" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:w-[128px] flex items-start">
              <BackToTop />
            </div>
          </div>
        </div>

        {/* Giant watermark: box 1225×353 clipped (Riwa cover-crops the
            wordmark image; we cut the condensed text the same way) */}
        <div
          className="hidden lg:block absolute pointer-events-none select-none"
          style={{ left: 0, top: 308, width: 1225, height: 353, overflow: "hidden" }}
          aria-hidden="true"
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: -202,
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              fontSize: 827,
              lineHeight: "827px",
              letterSpacing: "-0.06em",
              textTransform: "uppercase",
              color: "#181A1E",
              whiteSpace: "nowrap",
              transform: "scaleX(0.427)",
              transformOrigin: "left top",
            }}
          >
            {profile.initials === "PL" ? "Lodha" : profile.initials}
          </span>
        </div>
        <span
          className="hidden lg:block absolute pointer-events-none select-none"
          style={{
            left: 1232,
            top: 294,
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: 145,
            lineHeight: "145px",
            color: "#181A1E",
          }}
          aria-hidden="true"
        >
          ®
        </span>

        {/* Copyright + legal row: y624 → past the 604 clip at lg (dicto —
            Riwa's own row is clipped); stacks visibly on mobile */}
        <div className="flex items-center justify-between mt-10 lg:mt-0 lg:absolute lg:left-0 lg:top-[624px] lg:w-full lg:h-[51px] lg:block">
          <p style={{ ...copyStyle, margin: 0 }}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center lg:absolute lg:left-[547px] lg:top-[2px]" style={{ gap: 14 }}>
            <Link to="/terms-of-service" style={copyStyle} className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" style={copyStyle} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Decor: edge hairlines x24/x1357 + diagonal (359,-1)→(692,175) */}
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ left: 0, top: 0, bottom: 0, width: 1, ...HAIRLINE }}
          aria-hidden="true"
        />
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ right: 0, top: 0, bottom: 0, width: 1, ...HAIRLINE }}
          aria-hidden="true"
        />
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{
            left: 335,
            top: -1,
            width: 377,
            height: 1,
            background: "rgba(255, 255, 255, 0.07)",
            transform: "rotate(27.86deg)",
            transformOrigin: "0 0",
          }}
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
