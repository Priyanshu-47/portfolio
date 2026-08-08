import { ArrowUp, Download, Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { Reveal } from './Reveal'
import { profile, socials } from '../data/resume'

function FooterSocial({ label }: { label: string }) {
  const href =
    label === 'LinkedIn'
      ? profile.linkedin
      : label === 'GitHub'
        ? profile.github
        : `mailto:${profile.email}`
  const Icon = label === 'LinkedIn' ? FaLinkedin : label === 'GitHub' ? FaGithub : Mail
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="social-btn"
    >
      <Icon className="h-4 w-4" />
    </a>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/40">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        style={{ maskImage: 'radial-gradient(ellipse at center, black, transparent 72%)' }}
        aria-hidden
      />
      <div
        className="animate-orb pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-lavender-deep/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-2 sm:text-5xl">
            Let&rsquo;s build something
            <br />
            <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-slate-600">
            I&rsquo;m open to full-stack engineering roles and interesting problems — especially where .NET,
            React and AI-assisted development come together. Reach out anytime.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={`mailto:${profile.email}`} className="btn-primary" aria-label="Send email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download className="h-4 w-4" />
              Download resume
            </a>
            {socials.map((s) => (
              <FooterSocial key={s.label} label={s.label} />
            ))}
            <a
              href={`tel:+91${profile.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/40 px-3.5 py-2.5 text-sm text-slate-600 backdrop-blur-md transition-colors hover:border-lavender-deep/50 hover:text-ink-2"
            >
              <Phone className="h-4 w-4 text-lavender-deep" />
              {profile.phone}
            </a>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/40 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript &amp; Tailwind CSS.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-2"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
