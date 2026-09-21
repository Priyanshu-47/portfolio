import { motion, useScroll, useTransform } from "framer-motion";

/**
 * 5 horizontal orange lines with white gaps that merge on scroll.
 * Gaps shrink uniformly as user scrolls, lines merge into one solid block.
 */
export default function AnimatedLines() {
  const { scrollY } = useScroll();

  // Lines hidden at top, appear when scrolling starts
  const linesOpacity = useTransform(scrollY, [0, 30, 150], [0, 1, 1]);
  // Gap height shrinks from 6px to 0
  const gapHeight = useTransform(scrollY, [50, 500], [6, 0]);
  // Container compresses
  const containerHeight = useTransform(scrollY, [50, 500], [64, 28]);

  const lineHeights = [12, 10, 8, 5, 1];
  const gapCount = lineHeights.length - 1;

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none overflow-hidden"
      style={{ height: containerHeight, opacity: linesOpacity }}
    >
      {lineHeights.map((h, i) => (
        <div key={`line-${i}`}>
          {/* Orange line */}
          <div
            style={{
              height: `${h}px`,
              backgroundColor: "rgb(214, 54, 20)",
            }}
          />
          {/* White gap between lines (not after last line) */}
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
  );
}
