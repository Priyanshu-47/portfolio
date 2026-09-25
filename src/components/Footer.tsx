import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";

/* Riwa footer — live-verified (footer-final, h~604):
   bg #080A10, pad 60/37/74, cols x37 / x611 / x1030 (43.9% / 32% / auto),
   faint diagonal hairline top-left + circle arc decor, vertical hairline
   divider before col2. Rows: mono 500 14 #9E9E9E uppercase heads (+orange
   glyph) → contact: phone Geist 18 + big email Sora/Geist ~40 white;
   navigation + social: Geist 15 white links gap 11; BACK TO TOP Sora 600 16
   uppercase white + up arrow top-right; giant watermark (Sora, bg+~4
   #111418) clipped at bottom. Content: profile links. */

const monoHead: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "16.8px",
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#9E9E9E",
};

const linkStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 15,
  lineHeight: "21px",
  color: "#FFFFFF",
  textDecoration: "none",
  display: "block",
};

const ARROW_UR = "M 3 13 L 13 3 M 13 3 H 5.5 M 13 3 V 10.5";

function HeadGlyph({ kind }: { kind: "dots" | "tri" | "ast" }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="var(--color-orange)"
      aria-hidden="true"
      style={{ marginRight: 8, verticalAlign: "-2px" }}
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

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center"
      style={{
        gap: 10,
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
        fontFamily: '"Sora", sans-serif',
        fontWeight: 600,
        fontSize: 16,
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
        color: "#FFFFFF",
      }}
    >
      Back to top
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
      >
        <path d="M 3 13 L 13 3 M 13 3 H 5.5 M 13 3 V 10.5" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-45 8 8)" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const navLinks: Array<{ to: string; label: string }> = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const socials: Array<{ href: string; label: string }> = [
    ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn" }] : []),
    ...(profile.github ? [{ href: profile.github, label: "GitHub" }] : []),
    { href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--color-dark-bg)", padding: "60px 37px 74px" }}
    >
      {/* decor: faint diagonal hairline top-left (Riwa) */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          left: 120,
          top: -60,
          width: 1,
          height: 420,
          background: "rgba(255, 255, 255, 0.06)",
          transform: "rotate(-56deg)",
          transformOrigin: "top center",
        }}
        aria-hidden="true"
      />

      {/* vertical divider before col2 (Riwa x941 hairline) */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          left: "50%",
          top: 0,
          height: 340,
          width: 1,
          background: "rgba(255, 255, 255, 0.08)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid lg:grid-cols-[43.9%_32%_auto] row-gap-48">
        {/* col1: contact — brand + phone + big email */}
        <div>
          <div style={monoHead}>
            <HeadGlyph kind="dots" />
            Contact
          </div>
          <a
            href={`tel:${profile.phoneRaw}`}
            style={{
              ...linkStyle,
              fontSize: 18,
              lineHeight: "25.2px",
              marginTop: 30,
            }}
          >
            {profile.phone}
          </a>
          <a
            href={`mailto:${profile.email}`}
            style={{
              fontFamily: '"Geist", sans-serif',
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textDecoration: "none",
              display: "block",
              marginTop: 16,
              wordBreak: "break-word",
            }}
          >
            {profile.email}
          </a>
        </div>

        {/* col2: navigation */}
        <div>
          <div style={monoHead}>
            <HeadGlyph kind="tri" />
            Navigation
          </div>
          <nav className="flex flex-col" style={{ gap: 11, marginTop: 30 }}>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} style={linkStyle} className="hover:opacity-70 transition-opacity">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* col3: social + back to top */}
        <div className="flex flex-col justify-between" style={{ gap: 32 }}>
          <div className="flex flex-col" style={{ gap: 16 }}>
            <div style={monoHead}>
              <HeadGlyph kind="ast" />
              Social
            </div>
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

          <BackToTop />
        </div>
      </div>

      {/* copyright */}
      <p
        className="relative z-10"
        style={{
          fontFamily: '"Geist", sans-serif',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: "18px",
          color: "#5E5E5E",
          margin: 0,
          marginTop: 48,
        }}
      >
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>

      {/* giant watermark clipped at the bottom (Riwa RIVVA®) */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: 0, lineHeight: 0, textAlign: "center" }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: "clamp(4rem, 15vw, 17rem)",
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "#111418",
            lineHeight: 0.78,
            display: "inline-block",
            transform: "translateY(18%)",
            whiteSpace: "nowrap",
          }}
        >
          {profile.initials === "PL" ? "Lodha" : profile.initials}®
        </span>
      </div>
    </footer>
  );
}
