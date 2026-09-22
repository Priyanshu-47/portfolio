import { Reveal } from "./Reveal";

const stats = [
  {
    value: "100%",
    label: "Client Satisfaction",
    description: "Trusted by growing\ndigital teams",
    icon: "▼",
  },
  {
    value: "3+",
    label: "Experience",
    description: "Designing scalable\ndigital products",
    icon: "✦",
  },
  {
    value: "10+",
    label: "Delivered Projects",
    description: "Across SaaS, AI &\ndigital platforms",
    icon: "✳",
  },
  {
    value: "+40%",
    label: "Growth Impact",
    description: "Average ROI growth\nafter new design",
    icon: "✚",
  },
];

export default function Stats() {
  return (
    <section className="bg-[var(--color-light-bg)] py-0 relative">
      {/* 5 vertical lines — lines 1&5 at edges, 2-4 equally spaced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
      </div>

      <div className="relative z-10">
        {/* 4 cards in single row, zigzag — Riwa style */}
        <div className="flex">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="relative shrink-0"
                style={{
                  width: "25vw",
                  marginTop: i % 2 === 1 ? "160px" : "0",
                }}
              >
                {/* White card — chip shape via exact Riwa SVGs */}
                <div
                  className="relative bg-white"
                  style={{ width: "100%", height: "380px" }}
                >
                  {/* Chip notch SVG — top-left corner */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{ top: "-1px", left: "-1px", width: "44px", height: "67px" }}
                    viewBox="0 0 43 67"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 34 11.083 L 43 0 L 0 0 L 0 67 L 34 30.226 Z"
                      fill="var(--color-light-bg)"
                    />
                  </svg>

                  {/* Vertical line decoration — right side */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{ top: "0", right: "0", width: "30px", height: "200px" }}
                    viewBox="0 0 30 200"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 19 186 L 30 200 L 30 0 L 0 0 L 19 15.328 Z"
                      fill="var(--color-light-bg)"
                    />
                  </svg>

                  {/* Bottom-right triangle */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{ bottom: "0", right: "0", width: "16px", height: "16px" }}
                    viewBox="0 0 15.83 16"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 0 L 0 16 L 15.83 16 L 0 0 Z"
                      fill="var(--color-light-bg)"
                    />
                  </svg>

                  {/* Card content */}
                  <div
                    className="absolute flex flex-col justify-between"
                    style={{ inset: "24px 28px" }}
                  >
                    {/* Label — IBM Plex Mono */}
                    <p className="font-[var(--font-mono)] text-[#686868] text-xs uppercase tracking-[0.12em] flex items-center gap-2">
                      <span className="text-[var(--color-orange)] text-[10px] leading-none">■</span>
                      {stat.label}
                    </p>

                    {/* Value — 54px IBM Plex Mono */}
                    <p
                      className="font-[var(--font-mono)] font-semibold text-[#0B0D14]"
                      style={{
                        fontSize: "54px",
                        letterSpacing: "-2px",
                        lineHeight: "60px",
                      }}
                    >
                      {stat.value}
                    </p>

                    {/* Divider */}
                    <div
                      className="w-full"
                      style={{
                        height: "1px",
                        backgroundColor: "var(--color-light-bg)",
                      }}
                    />

                    {/* Description + icon */}
                    <div className="flex items-end justify-between">
                      <p className="font-[var(--font-mono)] text-[#5E5E5E] text-xs leading-relaxed whitespace-pre-line">
                        {stat.description}
                      </p>
                      <span className="text-black/15 text-3xl leading-none">
                        {stat.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
