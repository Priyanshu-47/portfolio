import { Calendar, MapPin } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Chip } from './Chip'
import { experience } from '../data/resume'

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="career"
        title="Where I've worked."
        description="From AI internships to enterprise platforms serving institutional investors — the journey so far."
      />

      <div className="relative">
        <div
          className="absolute bottom-4 left-[7px] top-2 w-px bg-gradient-to-b from-indigo-500/70 via-white/10 to-transparent sm:left-[9px]"
          aria-hidden
        />
        <div className="space-y-10">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.role}`} delay={i * 90}>
              <article className="relative pl-10 sm:pl-14">
                <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-indigo-400/60 bg-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                </span>

                <div className="card card-hover p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="font-display text-lg font-semibold text-white">{job.role}</h3>
                    <span className="text-indigo-300">{job.company}</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                      {job.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/80" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
