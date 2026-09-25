import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

/* Riwa /contact — DOM-verified (page h2714):
   orange Contact (inner variant: orange chip, no number, 3-line heading,
   faint 5-line overlay) y0 h1052 → light FAQ (inner variant: orange
   AnimatedLinesBand at top seam, chip dot+"FAQ" no number, "BEFORE YOU /
   START." 80px two-tone, NO CTA pill, cards x691 w666) y1052 h1059 →
   footer y2111 h604.
   No logo wall, no white divider — the seam is carried by the orange
   band at the FAQ section's top edge (bars rgb(214,54,20)). */

export default function ContactPage() {
  return (
    <div>
      <Contact variant="inner" />
      <FAQ variant="inner" />
      <Footer />
    </div>
  );
}
