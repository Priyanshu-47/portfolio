const items = [
  "React",
  ".NET",
  "TypeScript",
  "AWS",
  "Python",
  "PostgreSQL",
  "Docker",
  "Cursor AI",
  "Tailwind CSS",
  "Node.js",
  "REST APIs",
  "CI/CD",
];

export default function Marquee() {
  return (
    <div className="py-6 overflow-hidden" style={{ backgroundColor: "var(--color-light-bg, #F0F0F0)" }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 font-[var(--font-mono)] text-sm text-[var(--color-dark-muted)] whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
