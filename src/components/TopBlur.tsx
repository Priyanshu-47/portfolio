{/*
  Riwa's exact top "progressive blur" band:
  8 stacked backdrop-filter layers inside a fixed 100px strip at the top of
  the page. Each layer is masked to a horizontal slice, and blur strength
  doubles per slice — 0.078px at the bottom of the band ramping up to 10px
  at the very top edge. Sits below the nav (z-40 < nav z-50), like Riwa's
  blur (z8) sits below its header (z9).
*/}
const LAYERS = [0.078125, 0.15625, 0.3125, 0.625, 1.25, 2.5, 5, 10];

function maskFor(i: number) {
  const a = i * 12.5;
  return `linear-gradient(to top, rgba(0, 0, 0, 0) ${a}%, rgb(0, 0, 0) ${
    a + 12.5
  }%, rgb(0, 0, 0) ${a + 25}%, rgba(0, 0, 0, 0) ${a + 37.5}%)`;
}

export default function TopBlur() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-40"
      style={{ height: 100 }}
    >
      <div className="relative h-full w-full">
        {LAYERS.map((b, i) => {
          const m = maskFor(i);
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${b}px)`,
                WebkitBackdropFilter: `blur(${b}px)`,
                maskImage: m,
                WebkitMaskImage: m,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
