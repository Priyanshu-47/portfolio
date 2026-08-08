import { Briefcase, GitFork, GraduationCap, Mail, MapPin, FolderGit2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { profile } from '../data/resume'

type Fact = { icon: LucideIcon; label: string; value: string; href?: string }

const facts: Fact[] = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: Briefcase, label: 'Currently', value: 'Full Stack Engineer @ Hexaware' },
  { icon: GraduationCap, label: 'Education', value: 'B.E. Computer Science · 8.88 CGPA' },
  { icon: Mail, label: 'Email', value: profile.email },
  { icon: GitFork, label: 'GitHub', value: profile.githubStats.handle, href: profile.github },
  { icon: FolderGit2, label: 'Open source', value: `${profile.githubStats.repos} public repos · ${profile.githubStats.activity}` },
]

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="about" title="Engineer, builder, AI-accelerated." />
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-slate-300">{profile.summary}</p>
          <p className="mt-5 leading-relaxed text-slate-400">{profile.summaryExtra}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="card card-hover flex items-start gap-3.5 p-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-indigo-300">
                  <fact.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{fact.label}</p>
                  {fact.href ? (
                    <a
                      href={fact.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block truncate text-sm font-medium text-cyan-300 hover:text-cyan-200"
                      title={fact.value}
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="mt-1 truncate text-sm font-medium text-slate-200" title={fact.value}>
                      {fact.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
