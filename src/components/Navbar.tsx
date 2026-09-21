import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { path: "/", label: "ABOUT" },
  { path: "/projects", label: "PROJECTS" },
  { path: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();

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
        <div className="container-riwa flex items-center justify-between" style={{ height: "70px" }}>
          {/* Logo */}
          <Link
            to="/"
            className="font-[var(--font-display)] font-bold text-white text-xl tracking-tight"
          >
            PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
          </Link>

          {/* Desktop Nav links — only in hero */}
          <div className="hidden md:flex items-center justify-between flex-1 mx-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-[var(--font-sans)] text-base font-normal tracking-tight text-white hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden md:flex flex-col gap-1.5 p-2"
          >
            <span className="block w-7 h-[2px] bg-white" />
            <span className="block w-7 h-[2px] bg-white" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl"
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
            <div className="container-riwa flex items-center justify-between" style={{ height: "70px" }}>
              {/* Logo — dark via blend mode */}
              <Link
                to="/"
                className="font-[var(--font-display)] font-bold text-white text-xl tracking-tight"
              >
                PRIYANSHU<span className="text-[var(--color-orange)]">®</span>
              </Link>

              {/* Spacer to push hamburger right */}
              <div className="flex-1" />

              {/* Hamburger only — dark via blend mode */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="hidden md:flex flex-col gap-1.5 p-2"
              >
                <span className="block w-7 h-[2px] bg-white" />
                <span className="block w-7 h-[2px] bg-white" />
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
                    className={`font-[var(--font-display)] text-4xl font-semibold uppercase ${
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
