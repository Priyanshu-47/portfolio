import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, Mail, Phone, ChevronDown, Download } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { Reveal } from './Reveal'
import { Typewriter } from './Typewriter'
import { StatCounter } from './StatCounter'
import { coreStack, profile, socials } from '../data/resume'

const floatPositions: CSSProperties[] = [
  { top: '6%', left: '-8%', animationDelay: '0s' },
  { top: '16%', right: '-10%', animationDelay: '0.7s' },
  { bottom: '24%', left: '-12%', animationDelay: '1.4s' },
  { bottom: '8%', right: '-8%', animationDelay: '2.1s' },
  { top: '46%', right: '-14%', animationDelay: '2.8s' },
]

function SocialIcon({ label }: { label: string }) {
  if (label === 'LinkedIn') return <FaLinkedin className="h-4 w-4" />
  if (label === 'GitHub') return <FaGithub className="h-4 w-4" />
  return <Mail className="h-4 w-4" />
}

export function Hero() {
  const stackNames = useMemo(() => coreStack.map((t) => t.name), [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* Background layers */}
      <div
        className="bg-grid absolute inset-0"
        style={{ maskImage: 'radial-gradient(ellipse 65% 55% at 50% 32%, black, transparent)' }}
        aria-hidden
      />
      <div className="animate-orb absolute -left-32 -top-32 h-96 w-96 rounded-full bg-lavender/70 blur-3xl" aria-hidden />
      <div className="animate-orb absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-peach/80 blur-3xl [animation-delay:-9s]" aria-hidden />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sage/70 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: copy */}
        <div>
          <Reveal>
            <p className="font-mono text-sm font-medium tracking-wide text-lavender-deep">
              <span className="mr-2 text-peach-deep">{'//'}</span>hey, I&rsquo;m
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] text-ink-2 sm:text-6xl xl:text-7xl">
              Priyanshu
              <br />
              <span className="text-gradient">Lodha</span>
            </h1>
            <p className="mt-5 font-display text-xl font-medium text-slate-700 sm:text-2xl">
              {profile.role}
            </p>
            <p className="mt-3 font-mono text-sm text-slate-500 sm:text-base">
              <span className="text-sage-deep">$</span>
              <span className="ml-2 text-slate-500">builds&nbsp;with</span>{' '}
              <Typewriter words={stackNames} className="font-semibold text-gradient" />
              <span className="sr-only">Core stack: {stackNames.join(', ')}</span>
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">{profile.tagline}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn-primary">
                View my work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={profile.resumeUrl} download className="btn-ghost">
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="social-btn"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
              <a
                href={`tel:+91${profile.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/40 px-3 py-2 text-sm text-slate-600 backdrop-blur-md transition-colors hover:border-lavender-deep/50 hover:text-ink-2"
              >
                <Phone className="h-4 w-4 text-lavender-deep" />
                {profile.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: identity card */}
        <Reveal delay={150} className="hidden lg:block">
          <div className="relative mx-auto w-80">
            <div
              className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-sage/60 via-lavender/60 to-peach/60 blur-2xl"
              aria-hidden
            />
            <div className="glass relative rounded-3xl px-8 py-12 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-deep to-peach-deep font-display text-5xl font-bold text-white shadow-lg shadow-lavender-deep/40">
                {profile.initials}
              </div>
              <p className="mt-6 font-display text-xl font-semibold text-ink-2">{profile.name}</p>
              <p className="mt-1 text-sm text-slate-600">Full Stack · Pune</p>
              <div className="mt-6 flex justify-center gap-2.5">
                {coreStack.map((tech) => (
                  <span
                    key={tech.name}
                    title={tech.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/40 bg-white/50 text-lg text-ink-2"
                  >
                    <tech.icon />
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            {coreStack.map((tech, i) => (
              <span
                key={tech.name}
                style={floatPositions[i % floatPositions.length]}
                className="animate-float absolute z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-2xl text-ink-2 shadow-none backdrop-blur-md"
                title={tech.name}
              >
                <tech.icon />
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-ink-2 md:flex"
      >
        <span className="font-mono text-[11px] tracking-widest uppercase">scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
