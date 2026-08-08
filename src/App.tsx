import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Avatar } from './components/Avatar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { CoreStack } from './components/CoreStack'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Credentials } from './components/Credentials'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream text-ink antialiased">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lavender-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <Avatar />
      <main>
        <Hero />
        <About />
        <CoreStack />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
      </main>
      <Footer />
    </div>
  )
}
