import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { path: "/about", label: "ABOUT" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/contact", label: "CONTACT" },
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const lightTop = LIGHT_TOP_ROUTES.includes(location.pathname);

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

  return (
    <>
      {/*
        PRIMARY NAV — inside hero, scrolls away with it.
        White text on orange, no mix-blend-mode.
      */}
      <div
        className="absolute top-0 left-0 right-0 z-50"
        style={{ pointerEvents: pastHero ? "none" : "auto" }}
      >
        <div className="flex items-center justify-between px-6" style={{ height: "50px" }}>
          {/* Logo — Riwa: Sora 600 26px at x24 (on grid line 1), bar h50 */}
          <Link
            to="/"
            className={`font-display font-semibold text-[26px] tracking-tight ${lightTop ? "text-[var(--color-light-text)]" : "text-white"}`}
          >
            PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
          </Link>

          {/* Desktop Nav links — LEFT-aligned at grid lines 2/3/4
              (calc(25% + 12px) = 24px + quarter of content), roll-hover
              via duplicated stacked spans (window 19.2, .btn-roll −16) */}
          <div className="hidden md:flex items-center absolute left-0 right-0">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group font-sans text-base font-normal leading-[19.2px] tracking-tight absolute ${lightTop ? "text-[var(--color-light-text)] hover:opacity-70" : "text-white hover:text-white/80"}`}
                style={{ left: `calc(${(i + 1) * 25}% + 12px)` }}
              >
                <span className="flex flex-col overflow-hidden" style={{ height: 19.2 }}>
                  <span className="btn-roll">
                    <span className="block">{link.label}</span>
                    <span className="block">{link.label}</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* Hamburger — Riwa bars w40 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden md:flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-10 h-[2px] ${lightTop ? "bg-[var(--color-light-text)]" : "bg-white"}`} />
            <span className={`block w-10 h-[2px] ${lightTop ? "bg-[var(--color-light-text)]" : "bg-white"}`} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-2xl ${lightTop ? "text-[var(--color-light-text)]" : "text-white"}`}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/*
        SECONDARY NAV — appears after hero scrolls away.
        Logo + hamburger only. Uses mix-blend-mode: difference
        so text auto-adapts (dark on light bg).
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
            <div className="flex items-center justify-between px-6" style={{ height: "50px" }}>
              {/* Logo — dark via blend mode (same metrics as primary: Sora 600 26) */}
              <Link
                to="/"
                className="font-display font-semibold text-white text-[26px] tracking-tight"
              >
                PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
              </Link>

              {/* Spacer to push hamburger right */}
              <div className="flex-1" />

              {/* Hamburger only — dark via blend mode, bars w40 */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="hidden md:flex flex-col gap-1.5 p-2"
              >
                <span className="block w-10 h-[2px] bg-white" />
                <span className="block w-10 h-[2px] bg-white" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-white text-2xl"
              >
                {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-dark-bg)] pt-20"
          >
            <div className="container-riwa flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display text-4xl font-semibold uppercase ${
                      location.pathname === link.path
                        ? "text-[var(--color-orange)]"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
