import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedLines from "./AnimatedLines";

// 4-pointed star SVG path — matches Riwa's sparkle shape
const StarSVG = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
  </svg>
);

// Generate sparkle positions — Riwa has ~50 scattered stars
function generateSparkles(count: number) {
  const sparkles = [];
  for (let i = 0; i < count; i++) {
    sparkles.push({
      id: i,
      left: `${(i * 37 + 13) % 95 + 2}%`,
      top: `${(i * 29 + 7) % 85 + 5}%`,
      size: 8 + (i % 4) * 4,
      delay: (i * 0.4) % 3,
      duration: 2.5 + (i % 3) * 0.5,
      opacity: 0.3 + (i % 3) * 0.2,
    });
  }
  return sparkles;
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const sparkles = useMemo(() => generateSparkles(50), []);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax — hero content moves up on scroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -200]);

  return (
    <section ref={heroRef} className="relative" style={{ height: "100dvh" }}>
      {/* Full-bleed orange background */}
      <div className="absolute inset-0 bg-[#D63614]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D63614] via-[#D85A20] to-[#C8501E]" />
      </div>

      {/* Parallax container — moves up on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ y: heroY }}
      >
        {/* Giant background text — uses rem so zoom scales it */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden z-[1]">
          <span
            className="font-[var(--font-display)] font-bold uppercase text-center whitespace-nowrap"
            style={{
              fontSize: "16rem",
              lineHeight: 0.82,
              letterSpacing: "-0.01em",
              color: "rgba(11, 13, 20, 0.12)",
              marginTop: "3rem",
              marginLeft: "1.5rem",
              transform: "scaleY(1.6)",
              transformOrigin: "top center",
            }}
          >
            PRIYANSHU
          </span>
        </div>

        {/* Portrait — uses rem so zoom scales it */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-[2]">
          <img
            src="./portrait.png"
            alt="Priyanshu Lodha"
            className="object-contain object-bottom"
            style={{
              height: "36rem",
              width: "auto",
              filter: "saturate(1.3) brightness(0.95) contrast(1.05)",
              maskImage: "radial-gradient(ellipse 75% 85% at 50% 55%, black 30%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 55%, black 30%, transparent 72%)",
            }}
          />
        </div>

        {/* Sparkle decorations — Riwa: ~50 scattered static 4-pointed star SVGs */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute"
            style={{
              left: s.left,
              top: s.top,
              zIndex: 10,
              pointerEvents: "none",
              opacity: s.opacity,
            }}
          >
            <StarSVG size={s.size} color="#E9681E" />
          </div>
        ))}
      </motion.div>

      {/* Bottom-left content — also parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{ paddingBottom: "2.5rem", y: heroY }}
      >
        <div className="container-riwa">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ maxWidth: "28rem" }}
          >
            <p className="text-white uppercase mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600, letterSpacing: "-0.32px", lineHeight: "19px" }}>
              LESS NOISE. MORE IMPACT.
            </p>
            <p className="text-white/90 leading-relaxed mb-5" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "14px", fontWeight: 500, letterSpacing: "-0.56px", lineHeight: "17px" }}>
              Full-stack engineer building secure, scalable products — .NET &amp;
              React at the core, deployed on AWS, and accelerated by AI.
            </p>

            {/* Riwa-style animated button + avatar — single aligned component */}
            <Link
              to="/contact"
              className="inline-flex items-center relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="relative bg-white flex items-center cursor-pointer"
                style={{
                  gap: "1rem",
                  paddingLeft: "40px",
                  paddingRight: "52px",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  borderRadius: "40px",
                }}
                animate={{ paddingRight: isHovered ? 56 : 52 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden">
                  <motion.span
                    className="text-[#080A10] font-semibold whitespace-nowrap block"
                    style={{ fontSize: "16px", fontFamily: "Sora, sans-serif", fontWeight: 600, letterSpacing: "-0.64px", textTransform: "uppercase" }}
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    BOOK A CALL
                  </motion.span>
                </div>
                <motion.div
                  className="w-9 h-9 rounded-full bg-[#080A10] flex items-center justify-center text-white shrink-0"
                  animate={{ rotate: isHovered ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {isHovered ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <span className="text-xs">✦</span>
                  )}
                </motion.div>
                {/* Avatar — overlaps right edge of white box */}
                <motion.div
                  className="absolute top-1/2 w-12 h-12 rounded-full overflow-hidden border-[3px] border-white z-10"
                  style={{ right: "-6px", transform: "translateY(-50%)" }}
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src="./portrait.png"
                    alt="Priyanshu"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      {/* Animated horizontal lines — merge on scroll like Riwa */}
      <AnimatedLines />
      {/* White transition below lines — smooth blend to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{ height: "4px", backgroundColor: "white" }}
      />
    </section>
  );
}
