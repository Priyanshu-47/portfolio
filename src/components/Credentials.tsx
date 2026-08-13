import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { certifications, education } from '../data/resume'

export function Credentials() {
  return (
    <section id="credentials" className="section">
      <SectionHeading eyebrow="credentials" title="Education & certifications." />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Education */}
        <Reveal>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-2">
            <GraduationCap className="h-5 w-5 text-lavender-deep" />
            Education
          </h3>
          <div className="mt-5 space-y-5">
            {education.map((edu) => (
              <div key={edu.school} className="card p-6">
                <p className="inline-flex items-center gap-1.5 font-mono text-xs text-lavender-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  {edu.period}
                </p>
                <h4 className="mt-2.5 font-display text-base font-semibold text-ink-2">{edu.school}</h4>
                {edu.degree ? <p className="mt-1 text-sm text-slate-600">{edu.degree}</p> : null}
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {edu.location}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={100}>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-2">
            <Award className="h-5 w-5 text-peach-deep" />
            Certifications & achievements
          </h3>
          <div className="mt-5 space-y-5">
            {certifications.map((cert) => (
              <div key={cert.title} className="card card-hover flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white/50 text-lavender-deep">
                  <Award className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-slate-700">{cert.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                    <span>{cert.issuer}</span>
                    {cert.period ? (
                      <span className="inline-flex items-center gap-1 font-mono text-lavender-deep">
                        <Calendar className="h-3 w-3" />
                        {cert.period}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
