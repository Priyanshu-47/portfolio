import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { profile } from "../data/resume";

/* ── Riwa header + fullscreen orange menu — live screenshots + DOM probes ──
   HEADER: mobile h53 px16 / desktop h50 px24 (content vertically centered →
   logo y16/y14, burger y20/y18.5 dicto). Logo Sora600 26px, lh 0.8em
   (20.8px), ls −2px. Desktop links x = 24 + (i+1)·(CW−48)/4 →
   calc((i+1)*25% − (i+1)*12px + 24px), roll window h18 (A h18, y16).
   Burger = two ink bars 40×1.5, tops 11px apart (flex gap 9.5), p-2 hit pad;
   the SAME burger at every breakpoint — Riwa never morphs it (the X lives
   inside the menu). Logo/bars switch to white while the menu is open.
   Scrolled nav = mix-blend difference (Riwa "Header scroll": h53/h50).

   MENU (probe-verified @390/810/1024/1200/1382 — screenshots riwa-*):
   full-screen overlay ABOVE the header; the menu renders its own logo +
   Close X (40×13, two crossing 1.5px bars: M0 0 L40 11.5 L40 13 L0 1.5 Z +
   vertical flip). Background = Riwa's static hero PNG + rgba(8,10,16,.4) +
   backdrop blur(10px) — SAME on every page; we render our hero gradient +
   5% grain as the equivalent asset. Vertical grid lines: 2 @ inset16
   (<810) / 5-line inset24 quarter grid wrapped at opacity .3 (≥810).
   Layout = one column, justify-between, pb30:
     [top row h36: logo | close X]  [giant nav centered]  [contact+socials]
   Giant nav — Sora600 uppercase white, pitch = 52 (<810, fs52 lh52) /
   90 (810–1199, fs80 lh80 → mt10) / 90 (≥1200, fs100 lh100 → mt−10);
   active page dims to rgba(255,255,255,.5) only ≥810 (mobile probed full
   white); hover dims to the same .5 at every size.
   Bottom <810: centered tel (mono500 16/19.2 −.64) → mail Geist500 fs24
   mt12 (lh1.4) → socials col mt30, row pitch 38, each label + scribble
   arrow (mobile shows arrows too — screenshot-proven).
   Bottom ≥810: row justify-between items-end — left tel + mail (fs30
   lh1.4 mt7 + mb5 at 810–1199; fs38 mt1 at ≥1200), right socials row
   gap30, right-aligned to px24.
   Socials: Inter400 16/19.2 uppercase −.32, roll window 19.2 (btn-roll
   --roll −19.2), scribble arrow 10×9 #E8E8E8.
   Entrance: panel slides up y100%→0 (0.5s [0.22,1,0.36,1]) while nav links
   stagger up (y140→0, .06 stagger); logo/close/contact ride the panel.
   Exit: panel slides down, children ride it exactly (mid-frame probe).
   No scroll lock (dicto); closes on route change. */

const navLinks = [
  { path: "/about", label: "ABOUT" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/contact", label: "CONTACT" },
];

/* Riwa giant menu nav = Home/About/Projects/Blog/Contact */
const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
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

const NOISE =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`;

const phoneStyle: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "19.2px",
  letterSpacing: "-0.64px",
  color: "#FFFFFF",
  textDecoration: "none",
};

const emailStyle: CSSProperties = {
  fontFamily: '"Geist", sans-serif',
  fontWeight: 500,
  color: "#FFFFFF",
  textDecoration: "none",
  wordBreak: "break-word",
};

const socialStyle: CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "19.2px",
  letterSpacing: "-0.32px",
  textTransform: "uppercase",
  color: "#FFFFFF",
  textDecoration: "none",
};

/* roll window 19.2 → btn-roll shifts −19.2 (index.css uses var(--roll)) */
const socialRollStyle: CSSProperties = {
  ...socialStyle,
  ["--roll" as string]: "-19.2px",
} as CSSProperties;

/* Riwa social arrow — exact scribble path, 10×9, #E8E8E8 */
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
      aria-hidden="true"
    >
      <path d={SC_ARROW} fill="rgb(232,232,232)" />
    </svg>
  );
}

/* Text-roll link — window 18, .btn-roll −16 (Riwa header links) */
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

/* Menu animation variants — panel slides on y, links stagger up (probed) */
const menuPanelV: Variants = {
  hidden: { y: "100%" },
  show: { y: 0 },
  exit: { y: "100%" },
};

const menuNavV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const menuLinkV: Variants = {
  hidden: { y: 140 },
  show: { y: 0 },
};

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

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path + "/"));

  /* social row: roll label + scribble arrow (shared mobile column / desktop row) */
  const socialRows = socials.map((s) => (
    <a
      key={s.label}
      href={s.href}
      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-[10px] hover:text-white/50 transition-colors duration-200"
      style={socialStyle}
    >
      <span className="flex flex-col overflow-hidden" style={{ height: 19.2 }}>
        <span className="btn-roll" style={socialRollStyle}>
          <span className="block">{s.label}</span>
          <span className="block">{s.label}</span>
        </span>
      </span>
      <SocialArrow />
    </a>
  ));

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
              breakpoint; never morphs into an X (the X lives in the menu) */}
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

      {/*
        MENU — Riwa fullscreen orange overlay (giant nav), z above header:
        panel slides up, links stagger; exit slides down (live-probed).
      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuPanelV}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] overflow-hidden"
            style={{ width: "100vw" /* Riwa panel spans the scrollbar too (w391 @vw390) */ }}
          >
            {/* Static hero bg (Riwa: hero PNG) + grain */}
            <div className="absolute inset-0 bg-[#D63614]" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D63614] via-[#D85A20] to-[#C8501E]" />
              <div
                className="absolute inset-0"
                style={{ opacity: 0.05, backgroundImage: NOISE, backgroundRepeat: "repeat" }}
              />
            </div>
            {/* rgba(8,10,16,.4) + backdrop blur(10px) — Riwa menu dim layer */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(8, 10, 16, 0.4)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              aria-hidden="true"
            />
            {/* Grid lines — 2 @ inset16 (<810); 5-line inset24 quarter grid
                at 0.3 (≥810), dicto Riwa */}
            <div
              className="absolute inset-y-0 left-4 right-4 flex justify-between min-[810px]:hidden pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>
            <div
              className="absolute inset-y-0 left-6 right-6 hidden min-[810px]:flex justify-between opacity-30 pointer-events-none"
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              ))}
            </div>

            {/* 3-group column, justify-between, pb30 */}
            <div
              className="absolute inset-0 flex flex-col justify-between"
              style={{ paddingBottom: 30 }}
            >
              {/* Top row h36 — logo | Close X (40×13, two crossing 1.5px bars) */}
              <div className="flex h-[36px] items-start justify-between px-4 min-[810px]:px-6 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="mt-[9px] font-display font-semibold text-white text-[26px] leading-[0.8em] tracking-[-2px]"
                >
                  PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="mt-[15.5px]"
                  style={{ width: 40, height: 13, padding: 0, background: "transparent", border: 0, cursor: "pointer" }}
                >
                  <svg width={40} height={13} viewBox="0 0 40 13" fill="#FFFFFF" aria-hidden="true" style={{ display: "block" }}>
                    <path d="M0 0 L40 11.5 L40 13 L0 1.5 Z" />
                    <path d="M0 13 L40 1.5 L40 0 L0 11.5 Z" />
                  </svg>
                </button>
              </div>

              {/* Giant nav — fs52 pitch52 / fs80 pitch90 / fs100 pitch90 */}
              <motion.nav
                variants={menuNavV}
                initial="hidden"
                animate="show"
                className="flex w-full flex-col items-center px-4 text-center shrink-0"
              >
                {menuLinks.map((l, i) => (
                  <motion.div
                    key={l.path}
                    variants={menuLinkV}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={i > 0 ? "min-[810px]:mt-[10px] min-[1200px]:mt-[-10px]" : ""}
                  >
                    <Link
                      to={l.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block font-display font-semibold uppercase tracking-[-0.06em] transition-colors duration-200 hover:text-white/50 text-[52px] leading-[52px] min-[810px]:text-[80px] min-[810px]:leading-[80px] min-[1200px]:text-[100px] min-[1200px]:leading-[100px] ${
                        isActive(l.path)
                          ? "text-white min-[810px]:text-white/50"
                          : "text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom — <810 centered column / ≥810 split row */}
              <div className="flex flex-col items-center px-4 min-[810px]:hidden shrink-0">
                <a href={`tel:${profile.phoneRaw}`} className="block" style={phoneStyle}>
                  {profile.phone}
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-[12px] block text-[24px] leading-[1.4]"
                  style={emailStyle}
                >
                  {profile.email}
                </a>
                <div className="mt-[30px] flex flex-col items-center" style={{ gap: 18.8 }}>
                  {socialRows}
                </div>
              </div>

              <div className="hidden min-[810px]:flex items-end justify-between px-6 shrink-0">
                <div className="flex flex-col min-[810px]:max-[1199px]:mb-[5px]">
                  <a href={`tel:${profile.phoneRaw}`} className="block" style={phoneStyle}>
                    {profile.phone}
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-[10px] min-[1200px]:mt-[4px] block text-[30px] min-[1200px]:text-[38px] leading-[1.4]"
                    style={emailStyle}
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-end" style={{ gap: 30 }}>
                  {socialRows}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
