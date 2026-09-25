import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stats = [
  { target: 100, prefix: "", suffix: "%", label: "Client Satisfaction", description: "Trusted by growing\ndigital teams", icon: "▼" },
  { target: 3, prefix: "", suffix: "+", label: "Experience", description: "Designing scalable\ndigital products", icon: "✦" },
  { target: 10, prefix: "", suffix: "+", label: "Delivered Projects", description: "Across SaaS, AI &\ndigital platforms", icon: "✳" },
  { target: 40, prefix: "+", suffix: "%", label: "Growth Impact", description: "Average ROI growth\nafter new design", icon: "✚" },
];

// Riwa's exact label icon: rounded-square-with-circular-hole used as a mask
const LABEL_ICON_MASK =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M 2 12 C 0.895 12 0 11.105 0 10 L 0 2 C 0 0.895 0.895 0 2 0 L 10 0 C 11.105 0 12 0.895 12 2 L 12 10 C 12 11.105 11.105 12 10 12 Z M 6 9 C 7.657 9 9 7.657 9 6 C 9 4.343 7.657 3 6 3 C 4.343 3 3 4.343 3 6 C 3 7.657 4.343 9 6 9 Z' fill='black' transform='translate(1 1)'/%3E%3C/svg%3E")`;

function useCountUp(target: number, active: boolean, duration = 2500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic — matches Riwa's decelerating count
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatCard({ stat, index, active }: { stat: (typeof stats)[number]; index: number; active: boolean }) {
  const value = useCountUp(stat.target, active);
  return (
    <Reveal delay={index * 0.1}>
      <div
        className="relative bg-white h-[346px]"
        style={{ marginTop: index % 2 === 1 ? "160px" : "0" }}
      >
        {/* Chip cutouts — exact Riwa SVG shapes (fill #F0F0F0) */}
        <svg className="absolute" style={{ left: 0, top: 0 }} width="43" height="67" viewBox="0 0 43 67" fill="none">
          <path d="M 34 11.083 L 43 0 L 0 0 L 0 67 L 34 30.226 Z" fill="#F0F0F0" />
        </svg>
        <svg className="absolute" style={{ right: 0, top: 0 }} width="30" height="200" viewBox="0 0 30 200" fill="none">
          <path d="M 19 186 L 30 200 L 30 0 L 0 0 L 19 15.328 Z" fill="#F0F0F0" />
        </svg>
        <svg className="absolute" style={{ right: 0, bottom: 0 }} width="16" height="16" viewBox="0 0 15.83 16" fill="none">
          <path d="M 0 0 L 0 16 L 15.83 16 L 0 0 Z" fill="#F0F0F0" />
        </svg>

        {/* Label row: icon at x50 (24 pad + 26), text at x76 */}
        <div className="absolute flex items-center" style={{ top: 10, left: 24, height: 18, paddingRight: 12, paddingLeft: 26 }}>
          <span
            className="block shrink-0"
            style={{
              width: 14,
              height: 14,
              background: "rgb(214, 54, 20)",
              WebkitMaskImage: LABEL_ICON_MASK,
              maskImage: LABEL_ICON_MASK,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <span
            style={{
              marginLeft: 12,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 14,
              lineHeight: "16.8px",
              fontWeight: 500,
              letterSpacing: "-0.56px",
              textTransform: "uppercase",
              color: "#686868",
              whiteSpace: "nowrap",
            }}
          >
            {stat.label}
          </span>
        </div>

        {/* Number */}
        <p
          className="absolute"
          style={{
            top: 149,
            left: 24,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 54,
            lineHeight: "60px",
            fontWeight: 600,
            letterSpacing: "-2px",
            color: "#0B0D14",
            fontFeatureSettings: '"tnum", "zero"',
          }}
        >
          {stat.prefix}
          {value}
          {stat.suffix}
        </p>

        {/* Divider */}
        <div className="absolute" style={{ top: 257, left: 24, right: 24, height: 1, background: "#E6E6E6" }} />

        {/* Description */}
        <p
          className="absolute whitespace-pre-line"
          style={{
            top: 287,
            left: 24,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 12,
            lineHeight: "14.4px",
            color: "#5E5E5E",
          }}
        >
          {stat.description}
        </p>

        {/* Decorative icon */}
        <span
          className="absolute select-none"
          style={{ top: 280, right: 24, fontSize: 36, lineHeight: "40px", color: "rgba(0,0,0,0.15)" }}
        >
          {stat.icon}
        </span>
      </div>
    </Reveal>
  );
}

export default function Stats({ hideLines = false }: { hideLines?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // col = (100% - 48px padding - 21px gaps) / 4 — lines centered in the gaps between cards
  const col = "calc((100% - 69px) / 4)";
  return (
    <section ref={ref} className="bg-[var(--color-light-bg)] py-0 relative">
      {/* 5 vertical lines — edges at 17px, middles centered in card gaps */}
      {!hideLines && (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: `calc(24px + ${col} + 3.5px)` }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: `calc(24px + ${col} * 2 + 10.5px)` }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: `calc(24px + ${col} * 3 + 17.5px)` }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>
      )}

      {/* 4-column grid, 7px gaps, 24px section padding — exact Riwa geometry */}
      <div className="relative z-10 grid grid-cols-4" style={{ padding: "0 24px", columnGap: "7px" }}>
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} active={active} />
        ))}
      </div>
    </section>
  );
}
