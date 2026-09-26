import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/resume";

/* ── Riwa header + hamburger menu — live DOM-probed ─────────────────────────
   HEADER: mobile h53 px16 / desktop h50 px24 (content vertically centered →
   logo y16/y14, burger y20/y18.5 dicto). Logo Sora600 26px, lh 0.8em
   (20.8px), ls −2px. Desktop links x = 24 + (i+1)·(CW−48)/4 →
   calc((i+1)*25% − (i+1)*12px + 24px), roll window h18 (A h18, y16).
   Burger = two ink bars 40×1.5, tops 11px apart (flex gap 9.5), p-2 hit pad;
   the SAME burger at every breakpoint, and it never becomes an X — Riwa keeps
   the bars while the menu is open. Logo/bars switch to white while the menu is
   open (even on light-top pages). Scrolled nav = mix-blend difference
   (Riwa "Header scroll": fixed, h53/h50, transparent).
   MENU PANEL: fixed inset-0 bg #080A10, overflow clip; grain (desktop:
   wrapper op .3 × inner img op .09 SVG noise; mobile: single .09 layer, no
   wrapper — live-probed); top blur strip h100 (backdrop blur .078px, desktop
   only — Riwa mobile has none); edge hairlines rgba(39,40,44,.5) inset 16
   (mobile) / 24 (desktop); diagonal
   (356,−1) w377 rot 27.86° white 7% — desktop only. No scroll lock (dicto).
   MOBILE (<lg): single centered column, top = calc(50% − 285px) — validated
   live at viewport heights 640/844/930 — px16, everything center-aligned:
     Contact head [plus glyph] (h18, gap12) → phone mt12 mono500 16/19.2 −.64 →
     email mt12 Geist500 24 (flow lh1.4, text lh1.29) → Navigation head mt52
     [swap glyph] → links mt14 gap16 (roll win18, Inter400 16/19.2 −.32 upper,
     no active color) → Social head mt40 [star glyph] → links mt14 gap14.8 (NO
     arrow on mobile — centered text-only, probed) → Back-to-top mt39 (A py2,
     win16, gap10 + 13×16 ↑, Sora600 16/16 −.04em) → copy-row mt20 (legal gap20
     centered, then © mt11 full-width center, pb16).
   DESKTOP (lg+): Riwa reuses its FOOTER layout full-screen ("Footer content"):
     Top row x24 y0 h308, cols 50/50, each pt160. LEFT: head pl12 gap24
     (text +48), phone mt14 pl48, email mt0 pl48 fs38 (flow 53.2, text lh1.29).
     RIGHT: border-l/b rgba(39,40,44,.5), flex justify-between
     [nav w256 | social w256 | btt w128], heads pl12, links pl48 gap8
     (pitch 26), socials + scribble arrow 10×9 gap10 fill #E8E8E8.
     Copyright row absolute bottom0 x24 h51 pb24 justify-between:
     [© | legal col w386 gap20 | spacer w168] — credits skipped per project
     rule, spacer keeps the legal group at Riwa's x563.
   Head glyphs fill #E53B17 (rgb 229,59,23): plus 12×12 / swap 12×11 /
   star 12×13 — exact Riwa SVG paths. */

const navLinks = [
  { path: "/about", label: "ABOUT" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/contact", label: "CONTACT" },
];

/* Riwa menu nav = Home/About/Projects/Blog (dicto, same as footer) */
const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
];

/* Pages whose top is a light section — Riwa renders the primary nav dark there */
const LIGHT_TOP_ROUTES = [
  "/projects",
  "/blog",
  "/terms-of-service",
  "/privacy-policy",
  "/about/photo-archive",
  "/about/photo-moments",
];

const HAIRLINE: CSSProperties = { background: "rgba(39, 40, 44, 0.5)" };

const NOISE =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`;

const monoHead: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17px",
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#9E9E9E",
};

const phoneStyle: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "19.2px",
  letterSpacing: "-0.64px",
  color: "#FFFFFF",
  textDecoration: "none",
};

const menuLinkStyle: CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "19.2px",
  letterSpacing: "-0.32px",
  textTransform: "uppercase",
  color: "#FFFFFF",
  textDecoration: "none",
};

const legalStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "22.4px",
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

const emailStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 500,
  color: "#FFFFFF",
  textDecoration: "none",
  wordBreak: "break-word",
};

/* Exact Riwa menu glyphs (fill rgb(229,59,23)) */
const GLYPH_PATHS: Record<string, { vb: string; h: number; d: string[] }> = {
  plus: {
    vb: "0 0 12 12",
    h: 12,
    d: [
      "M7.24202 0H4.75775C4.33572 0 4 0.336029 4 0.758463V3.24506C4 3.6675 4.33572 4.00352 4.75775 4.00352H7.24202C7.66406 4.00352 7.99978 3.6675 7.99978 3.24506V0.758463C7.99978 0.336029 7.65447 0 7.24202 0Z",
      "M4.75775 11.9996H7.24202C7.66406 11.9996 7.99978 11.6636 7.99978 11.2412V8.75455C7.99978 8.33212 7.66406 7.99609 7.24202 7.99609H4.75775C4.33572 7.99609 4 8.33212 4 8.75455V11.2412C4 11.654 4.34531 11.9996 4.75775 11.9996Z",
      "M8 4.74869V7.2353C8 7.65773 8.33572 7.99376 8.75775 7.99376H11.242C11.6641 7.99376 11.9998 7.65773 11.9998 7.2353V4.74869C11.9998 4.32626 11.6641 3.99023 11.242 3.99023H8.75775C8.33572 3.99023 8 4.33586 8 4.74869Z",
      "M0 4.74869V7.2353C0 7.65773 0.335715 7.99376 0.757755 7.99376H3.24203C3.66407 7.99376 3.99979 7.65773 3.99979 7.2353V4.74869C3.99979 4.32626 3.66407 3.99023 3.24203 3.99023H0.757755C0.345307 3.99023 0 4.33586 0 4.74869Z",
    ],
  },
  swap: {
    vb: "0 0 12 11",
    h: 11,
    d: [
      "M9.09049 10.2855H2.91452C2.15573 10.2855 1.54102 9.69797 1.54102 8.9728C1.54102 8.24763 2.15573 7.66016 2.91452 7.66016H9.09049C9.84928 7.66016 10.464 8.24763 10.464 8.9728C10.464 9.69797 9.84928 10.2855 9.09049 10.2855Z",
      "M10.636 7.72733C10.1654 7.72733 9.70437 7.48867 9.44503 7.0756L6.36185 1.97188C5.98726 1.34768 6.20817 0.539899 6.8613 0.181904C7.51444 -0.17609 8.35967 0.0350348 8.73427 0.659231L11.8175 5.76295C12.192 6.38715 11.9711 7.19493 11.318 7.55292C11.0971 7.67225 10.8666 7.72733 10.636 7.72733Z",
      "M1.36784 7.72359C1.13732 7.72359 0.897197 7.66852 0.685889 7.54919C0.0327536 7.19119 -0.197766 6.38341 0.186431 5.75921L3.26961 0.655497C3.6442 0.0313015 4.48944 -0.189003 5.14258 0.178171C5.79571 0.536166 6.02623 1.34395 5.64203 1.96814L2.55885 7.07186C2.30912 7.48493 1.84808 7.72359 1.36784 7.72359Z",
    ],
  },
  star: {
    vb: "0 0 12 13",
    h: 13,
    d: [
      "M6.7627 1.83798C6.7627 2.21198 7.25782 2.34466 7.44483 2.02078L8.18245 0.74332C8.2834 0.568485 8.50697 0.508586 8.6818 0.60953L9.36793 1.00566C9.54279 1.10662 9.60269 1.33024 9.5017 1.50509L8.82584 2.67521C8.63878 2.99906 9.00115 3.36159 9.32509 3.17467L10.4959 2.49906C10.6708 2.39818 10.8943 2.4581 10.9952 2.63291L11.3914 3.31913C11.4924 3.49398 11.4325 3.71757 11.2576 3.81851L10.0812 4.49753C9.75729 4.68451 9.88995 5.17969 10.264 5.17969H11.6344C11.8363 5.17969 12 5.34335 12 5.54525V6.33756C12 6.53946 11.8363 6.70312 11.6344 6.70312H10.1661C9.79211 6.70312 9.65944 7.19828 9.98335 7.38527L11.2575 8.12088C11.4324 8.22184 11.4923 8.44549 11.3913 8.62035L10.9953 9.30571C10.8943 9.48046 10.6708 9.54032 10.496 9.43945L9.32731 8.765C9.00337 8.57806 8.64097 8.94063 8.82807 9.26449L9.50165 10.4304C9.60267 10.6053 9.54278 10.8289 9.3679 10.9299L8.68185 11.326C8.507 11.4269 8.2834 11.367 8.18247 11.1922L7.44486 9.91426C7.25788 9.59032 6.7627 9.72298 6.7627 10.097V11.8757C6.7627 12.0775 6.59903 12.2412 6.39714 12.2412H5.60579C5.4039 12.2412 5.24023 12.0775 5.24023 11.8757V10.3967C5.24023 10.0227 4.74506 9.89005 4.55808 10.214L3.81754 11.4969C3.7166 11.6717 3.49301 11.7316 3.31816 11.6307L2.63193 11.2345C2.45712 11.1336 2.39719 10.91 2.49807 10.7352L3.17095 9.569C3.35784 9.24508 2.99535 8.88272 2.6715 9.06975L1.504 9.74398C1.32919 9.84493 1.10564 9.78508 1.00466 9.6103L0.608716 8.92502C0.507693 8.75017 0.567575 8.52653 0.742452 8.42556L2.54417 7.38526C2.86805 7.19826 2.73538 6.70312 2.36138 6.70312H0.36556C0.163667 6.70312 0 6.53946 0 6.33756V5.54525C0 5.34335 0.163667 5.17969 0.36556 5.17969H1.73548C2.10948 5.17969 2.24216 4.68457 1.91828 4.49755L0.742336 3.81853C0.567505 3.71758 0.507608 3.49401 0.60855 3.31918L1.00474 2.63296C1.10568 2.45813 1.32923 2.39822 1.50407 2.49914L2.67432 3.17465C2.9982 3.3616 3.36063 2.99918 3.17367 2.67529L2.49817 1.50505C2.39724 1.33021 2.45715 1.10665 2.63199 1.00571L3.3182 0.609524C3.49304 0.508583 3.7166 0.568477 3.81756 0.743305L4.5581 2.02575C4.74512 2.34962 5.24023 2.21694 5.24023 1.84295V0.36556C5.24023 0.163667 5.4039 0 5.60579 0H6.39714C6.59903 0 6.7627 0.163667 6.7627 0.36556V1.83798Z",
    ],
  },
};

function MenuGlyph({ kind }: { kind: "plus" | "swap" | "star" }) {
  const g = GLYPH_PATHS[kind];
  return (
    <svg
      width={12}
      height={g.h}
      viewBox={g.vb}
      fill="#E53B17"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {g.d.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function MenuHead({ kind, label }: { kind: "plus" | "swap" | "star"; label: string }) {
  return (
    <div className="flex h-[18px] items-center justify-center gap-3 lg:justify-start lg:gap-6 lg:pl-[12px] lg:pr-[22px]">
      <MenuGlyph kind={kind} />
      <span style={monoHead}>{label}</span>
    </div>
  );
}

/* Text-roll link — window 18, .btn-roll −16 (Riwa menu/header links) */
function RollLink({ label, style }: { label: string; style?: CSSProperties }) {
  return (
    <span className="flex flex-col overflow-hidden" style={{ height: 18 }}>
      <span className="btn-roll" style={style}>
        <span className="block">{label}</span>
        <span className="block">{label}</span>
      </span>
    </span>
  );
}

function MenuBackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group inline-flex items-center gap-[10px] ${className || ""}`}
      style={{ padding: "2px 0", background: "transparent", border: 0, cursor: "pointer" }}
    >
      <span className="flex flex-col overflow-hidden" style={{ height: 16 }}>
        <span className="btn-roll" style={bttTextStyle}>
          <span className="block">Back to top</span>
          <span className="block">Back to top</span>
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

/* Riwa desktop-menu social arrow — exact scribble path, 10×9, #E8E8E8 */
const SC_ARROW =
  "M 0 8.102 L 8.267 2.225 L 7.941 1.716 C 7.344 1.999 6.66 2.048 5.995 1.858 L 3.355 1.175 L 3.515 0 L 10.092 1.702 L 9.131 8.732 L 8.035 8.449 L 8.409 5.708 C 8.474 4.956 8.786 4.278 9.29 3.798 L 8.949 3.267 L 0.666 9.14 Z";

function SocialArrow() {
  return (
    <svg
      width={10}
      height={9}
      viewBox="0 0 10.092 9.14"
      fill="none"
      style={{ flexShrink: 0 }}
      className="hidden lg:block"
      aria-hidden="true"
    >
      <path d={SC_ARROW} fill="rgb(232,232,232)" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const lightTop = LIGHT_TOP_ROUTES.includes(location.pathname);
  /* Riwa renders logo/bars white whenever the menu is open (light pages too) */
  const topDark = lightTop && !mobileOpen;

  const socials: Array<{ href: string; label: string }> = [
    ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn" }] : []),
    ...(profile.github ? [{ href: profile.github, label: "GitHub" }] : []),
    { href: `mailto:${profile.email}`, label: "Email" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Once hero (100dvh) scrolls past, show secondary nav
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const BurgerButton = ({ dark }: { dark: boolean }) => (
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      className="flex flex-col gap-[9.5px] p-2 -mr-2"
    >
      <span className={`block h-[1.5px] w-10 ${dark ? "bg-[var(--color-light-text)]" : "bg-white"}`} />
      <span className={`block h-[1.5px] w-10 ${dark ? "bg-[var(--color-light-text)]" : "bg-white"}`} />
    </button>
  );

  return (
    <>
      {/*
        PRIMARY NAV — inside hero, scrolls away with it.
        mobile h53 px16 / desktop h50 px24, logo lh0.8 ls−2 (Riwa dicto).
      */}
      <div
        className="absolute top-0 left-0 right-0 z-50"
        style={{ pointerEvents: pastHero ? "none" : "auto" }}
      >
        <div className="flex h-[53px] md:h-[50px] items-center justify-between px-4 md:px-6">
          {/* Logo — Riwa: Sora 600 26 / lh0.8 / ls−2px, centered in the bar */}
          <Link
            to="/"
            className={`font-display font-semibold text-[26px] leading-[0.8em] tracking-[-2px] ${
              topDark ? "text-[var(--color-light-text)]" : "text-white"
            }`}
          >
            PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
          </Link>

          {/* Desktop Nav links — x = 24 + (i+1)·(CW−48)/4, roll window 18 */}
          <div className="hidden md:flex items-center absolute left-0 right-0">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group font-sans text-base font-normal leading-[19.2px] tracking-tight absolute ${
                  topDark
                    ? "text-[var(--color-light-text)] hover:opacity-70"
                    : "text-white hover:text-white/80"
                }`}
                style={{ left: `calc(${(i + 1) * 25}% - ${(i + 1) * 12}px + 24px)` }}
              >
                <RollLink label={link.label} />
              </Link>
            ))}
          </div>

          {/* Hamburger — Riwa: two 40×1.5 bars 11px apart; same at every
              breakpoint; never morphs into an X */}
          <BurgerButton dark={topDark} />
        </div>
      </div>

      {/*
        SECONDARY NAV — appears after hero scrolls away.
        Logo + burger only. Uses mix-blend-mode: difference
        so text auto-adapts (dark on light bg) — dicto Riwa "Header scroll".
      */}
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{ mixBlendMode: "difference" }}
          >
            <div className="flex h-[53px] md:h-[50px] items-center justify-between px-4 md:px-6">
              <Link
                to="/"
                className="font-display font-semibold text-white text-[26px] leading-[0.8em] tracking-[-2px]"
              >
                PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
              </Link>
              <BurgerButton dark={false} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* MENU — Riwa fullscreen panel (mobile centered stack / desktop footer layout) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-hidden"
            style={{ background: "var(--color-dark-bg)" }}
          >
            {/* grain — Riwa mobile: single .09 layer (no wrapper); desktop: wrapper .3 × inner .09 */}
            <div className="absolute inset-0 pointer-events-none opacity-100 lg:opacity-30" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{ opacity: 0.09, backgroundImage: NOISE, backgroundRepeat: "repeat" }}
              />
            </div>
            {/* frosted top strip h100 (backdrop blur .078px) — desktop only (Riwa mobile has none) */}
            <div
              className="hidden lg:block absolute top-0 left-0 right-0 h-[100px] pointer-events-none"
              style={{ backdropFilter: "blur(0.078px)", WebkitBackdropFilter: "blur(0.078px)" }}
              aria-hidden="true"
            />
            {/* edge hairlines — inset 16 mobile / 24 desktop */}
            <div className="absolute top-0 bottom-0 left-4 w-px lg:left-6 pointer-events-none" style={HAIRLINE} aria-hidden="true" />
            <div className="absolute top-0 bottom-0 right-4 w-px lg:right-6 pointer-events-none" style={HAIRLINE} aria-hidden="true" />
            {/* diagonal hairline — desktop only (Riwa has no mobile diagonal) */}
            <div
              className="hidden lg:block absolute pointer-events-none"
              style={{
                left: 356,
                top: -1,
                width: 377,
                height: 1,
                background: "rgba(255, 255, 255, 0.07)",
                transform: "rotate(27.86deg)",
                transformOrigin: "0 0",
              }}
              aria-hidden="true"
            />

            {/* ── MOBILE (<lg): centered stack, top = calc(50% − 285px) ── */}
            <div
              className="lg:hidden"
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                top: "calc(50% - 285px)",
                textAlign: "center",
              }}
            >
              {/* Contact */}
              <MenuHead kind="plus" label="Contact" />
              <a href={`tel:${profile.phoneRaw}`} className="block mt-3" style={phoneStyle}>
                {profile.phone}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="block mt-3 text-[24px] leading-[1.4]"
                style={emailStyle}
              >
                <span className="block leading-[1.29]">{profile.email}</span>
              </a>

              {/* Navigation — head mt52 (Riwa: email end 229 → head row 281) */}
              <div className="mt-[52px]">
                <MenuHead kind="swap" label="Navigation" />
              </div>
              <nav className="mt-[14px] flex flex-col items-center" style={{ gap: 16 }}>
                {menuLinks.map((l) => (
                  <Link key={l.path} to={l.path} className="group hover:opacity-70 transition-opacity">
                    <RollLink label={l.label} style={menuLinkStyle} />
                  </Link>
                ))}
              </nav>

              {/* Social — no arrow on mobile (dicto) */}
              <div className="mt-[40px]">
                <MenuHead kind="star" label="Social" />
              </div>
              <div className="mt-[14px] flex flex-col items-center" style={{ gap: 14.8 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    style={menuLinkStyle}
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Back to top — mt39 (Riwa: socials end 592 → button 631) */}
              <div className="mt-[39px] flex justify-center">
                <MenuBackToTop />
              </div>

              {/* Legal + copyright (row: links first, © below, pb16) */}
              <div className="mt-[20px] flex flex-col items-center" style={{ paddingBottom: 16 }}>
                <div className="flex justify-center" style={{ gap: 20 }}>
                  <Link to="/terms-of-service" style={legalStyle} className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/privacy-policy" style={legalStyle} className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </div>
                <p className="w-full" style={{ ...legalStyle, textAlign: "center", margin: "11px 0 0" }}>
                  © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
              </div>
            </div>

            {/* ── DESKTOP (lg+): Riwa footer layout full-screen ── */}
            <div className="hidden lg:block">
              {/* Top row x24 y0 h308, cols 50/50, pt160 */}
              <div className="absolute flex" style={{ left: 24, right: 24, top: 0, height: 308 }}>
                {/* LEFT: contact */}
                <div className="w-1/2 pt-[160px]">
                  <MenuHead kind="plus" label="Contact" />
                  <a href={`tel:${profile.phoneRaw}`} className="block mt-[14px] pl-12" style={phoneStyle}>
                    {profile.phone}
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="block pl-12 text-[38px] leading-[1.4]"
                    style={emailStyle}
                  >
                    <span className="block leading-[1.29]">{profile.email}</span>
                  </a>
                </div>

                {/* RIGHT: nav | social | back-to-top (border-l/b hairline) */}
                <div
                  className="w-1/2 flex justify-between border-l border-b pt-[160px]"
                  style={{ borderColor: "rgba(39, 40, 44, 0.5)" }}
                >
                  <div className="w-[256px]">
                    <MenuHead kind="swap" label="Navigation" />
                    <nav className="mt-[14px] flex flex-col items-start pl-12" style={{ gap: 8 }}>
                      {menuLinks.map((l) => (
                        <Link key={l.path} to={l.path} className="group hover:opacity-70 transition-opacity">
                          <RollLink label={l.label} style={menuLinkStyle} />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="w-[256px]">
                    <MenuHead kind="star" label="Social" />
                    <div className="mt-[14px] flex flex-col items-start pl-12" style={{ gap: 6.8 }}>
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-[10px] hover:opacity-70 transition-opacity"
                          style={menuLinkStyle}
                        >
                          {s.label}
                          <SocialArrow />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="w-[128px] flex items-start">
                    <MenuBackToTop />
                  </div>
                </div>
              </div>

              {/* Copyright row — bottom-pinned, legal at x563 via w386 col + w168 spacer */}
              <div
                className="absolute flex items-center justify-between"
                style={{
                  left: 24,
                  right: 24,
                  bottom: 0,
                  height: 51,
                  paddingBottom: 24,
                  boxSizing: "border-box",
                }}
              >
                <p style={{ ...legalStyle, margin: 0, whiteSpace: "nowrap" }}>
                  © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
                <div className="flex items-center w-[386px]" style={{ gap: 20 }}>
                  <Link to="/terms-of-service" style={legalStyle} className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/privacy-policy" style={legalStyle} className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </div>
                {/* Riwa's credits column — skipped, spacer preserves legal x563 */}
                <div aria-hidden="true" className="w-[168px] shrink-0" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
