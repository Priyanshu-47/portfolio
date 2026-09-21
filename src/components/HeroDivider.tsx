/**
 * Horizontal orange lines divider — matches Riwa's "Horizontal animated lines 1"
 * 3 bars with decreasing height: 10px, 8px, 6px
 * Color: rgb(214, 54, 20) — same as hero orange
 */
export default function HeroDivider() {
  return (
    <div className="w-full flex flex-col" style={{ gap: "10px" }}>
      <div className="w-full" style={{ height: "10px", backgroundColor: "rgb(214, 54, 20)" }} />
      <div className="w-full" style={{ height: "8px", backgroundColor: "rgb(214, 54, 20)" }} />
      <div className="w-full" style={{ height: "6px", backgroundColor: "rgb(214, 54, 20)" }} />
    </div>
  );
}
