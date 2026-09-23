import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven horizontal lines band for section boundaries.
 *
 * Riwa reference (verified live): their "Lines 1" band sits exactly at the
 * projects -> what-we-do boundary (chip 02 -> 03): a 70px-tall container with
 * 5 stacked bars (heights 2/4/6/8/10, ~10px gaps at rest) whose bars
 * separate/merge as the boundary crosses the viewport.
 *
 * Bar color = NEXT section's background (Riwa band kids are rgb(8, 10, 16) =
 * what-we-do's dark bg, painted over the light projects section). Not the
 * hero orange — the hero band is the exception (brand orange accent).
 *
 * Otherwise the same effect/spec as the hero band ("first and section 2"):
 * 5 bars heights 12/10/8/5/1, white gaps 6px -> 0, container 64px -> 28px,
 * fade-in on entry — progress tied to this band's own viewport crossing so
 * it plays at any scroll depth (the hero version uses global scrollY, which
 * only works at page top).
 *
 * `placement` = which section edge the band hugs (the seam stays the anchor
 * of the compression): "bottom" (default) sits at a section's bottom edge
 * (Projects -> Services), "top" sits at a section's top edge (About ->
 * Experience — Riwa paints "Lines 2" after the dark About block ends, on the
 * next section's light backdrop, so the bars live at the top of the light
 * section to be visible).
 */
export default function AnimatedLinesBand({
  placement = "bottom",
}: {
  placement?: "top" | "bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // p=0: band top touches viewport bottom. Fade in as it enters.
  const linesOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  // White gaps shrink from 6px to 0 while the band travels the viewport.
  const gapHeight = useTransform(scrollYProgress, [0.06, 0.62], [6, 0]);
  // Container compresses 64 -> 28 (same merge as the hero band), anchored
  // at the bottom edge = toward the section seam / next section.
  const containerHeight = useTransform(scrollYProgress, [0.06, 0.62], [64, 28]);

  const lineHeights = [12, 10, 8, 5, 1];
  const gapCount = lineHeights.length - 1;

  return (
    <div
      ref={ref}
      className={`absolute ${
        placement === "top" ? "top-0" : "bottom-0"
      } left-0 right-0 h-16 z-[6] pointer-events-none`}
      aria-hidden="true"
    >
      <motion.div
        className={`absolute ${
          placement === "top" ? "top-0" : "bottom-0"
        } left-0 right-0 overflow-hidden`}
        style={{ height: containerHeight, opacity: linesOpacity }}
      >
        {lineHeights.map((h, i) => (
          <div key={`line-${i}`}>
            <div
              style={{
                height: `${h}px`,
                backgroundColor: "rgb(8, 10, 16)",
              }}
            />
            {i < gapCount && (
              <motion.div
                style={{
                  height: gapHeight,
                  backgroundColor: "white",
                }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
