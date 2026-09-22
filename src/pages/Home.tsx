import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Stats from "../components/Stats";
import Projects from "../components/Projects";
import Services from "../components/Services";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Credentials from "../components/Credentials";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Reveal } from "../components/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />

      {/* Riwa-style "Why Choose Me" heading section — between marquee and stats */}
      <section className="bg-[var(--color-light-bg)] pt-24 pb-16 relative">
        {/* 5 vertical lines — Riwa: lines 1&5 at edges, 2-4 equally spaced */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ left: "17px" }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "25%" }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "50%" }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: "75%" }} />
          <div className="absolute top-0 bottom-0 w-[2px] bg-white" style={{ right: "17px" }} />
        </div>

        {/* Label — at line 1 (17px from left), vertically aligned with heading */}
        <Reveal>
          <div className="absolute z-10" style={{ left: "17px", top: "96px" }}>
            <div className="section-label section-label-dark">
              01  WHY CHOOSE ME
            </div>
          </div>
        </Reveal>

        {/* Barcode decoration — top right (Riwa design element) */}
        <div className="absolute top-8 right-8 z-10 hidden lg:flex flex-col items-end gap-[3px]">
          {[40,55,30,65,45,70,35,50,60,25,55,40,65,30,50,45,60,35,55,70,40,25,50,65,30,55,45].map((w, i) => (
            <div key={i} className="h-[2px] bg-black/8" style={{ width: `${w}px` }} />
          ))}
        </div>

        <div className="container-riwa relative z-10">
          {/* Massive heading — left-aligned to line 2 (25% of viewport) */}
          <Reveal delay={0.1}>
            <h2 className="font-[var(--font-display)] font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-[var(--color-light-text)] ml-[calc(25vw-24px)] md:ml-[calc(25vw-48px)] xl:ml-[calc(570px-25vw)]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}>
              <span className="block">Crafting</span>
              <span className="block">Scalable</span>
              <span className="block text-[var(--color-light-muted)]">Products</span>
              <span className="block text-[var(--color-light-muted)]">That Last.</span>
            </h2>
          </Reveal>

          {/* Description — left-aligned starting from line 3 (50% of viewport) */}
          <div className="mt-10">
            <Reveal delay={0.2}>
              <div className="ml-[50%] max-w-md">
                <p className="text-[var(--color-light-secondary)] text-base leading-relaxed">
                  I blend engineering, performance, and clean architecture to create
                  full-stack applications — and keep them running smoothly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Sparkle line — ✦ on line 2, line ends at right edge of "smoothly." */}
        <div className="absolute flex items-center gap-2" style={{ left: "calc(25vw - 10px)", top: "607px", width: "calc(25vw + 7px)" }}>
          <span className="text-[var(--color-light-muted)] text-2xl">✦</span>
          <div className="h-px bg-black/15 flex-1" />
        </div>
      </section>

      <Stats />
      <Projects />
      <Services />
      <About />
      <Experience />
      <Skills />
      <Credentials />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
