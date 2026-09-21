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

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
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
