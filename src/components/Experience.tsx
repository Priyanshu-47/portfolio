import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle2, ChevronDown, Cloud, Code2, Eye } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { sendAvatarCommand } from './Avatar3D'
import { Chip } from './Chip'
import { experience } from '../data/resume'
import type { Job, SceneMode } from '../data/resume'

/* Tiny developer avatar that reacts to the milestone's scene:
   cloud deploy, AI pipeline terminal, or computer-vision model. */
function SceneGlyph({ mode }: { mode: SceneMode }) {
  const base =
    'absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-md ring-1 ring-white/70'
  if (mode === 'cloud')
    return (
      <span className={`${base} bg-sky-200 text-sky-700`} aria-hidden>
        <Cloud className="h-2.5 w-2.5" />
      </span>
    )
  if (mode === 'vision')
    return (
      <span className={`${base} bg-sage text-sage-deep`} aria-hidden>
        <Eye className="h-2.5 w-2.5" />
      </span>
    )
  return (
    <span className={`${base} bg-ink-2 text-peach`} aria-hidden>
      <Code2 className="h-2.5 w-2.5" />
    </span>
  )
}

function MiniAvatar({ job }: { job: Job }) {
  const scene = job.scene
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/40 bg-white/40 p-3 backdrop-blur-sm">
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lavender-deep to-peach-deep ring-2 ring-white/60">
        <span className="h-1 w-1 rounded-full bg-white" aria-hidden />
        <span className="ml-1 h-1 w-1 rounded-full bg-white" aria-hidden />
        {scene ? <SceneGlyph mode={scene.mode} /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase">
          mini-me · {scene ? scene.label : 'on the job'}
        </p>
        <p className="truncate font-mono text-xs font-medium text-ink">{scene ? scene.line : job.period}</p>
      </div>
    </div>
  )
}

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="career"
        title="Where I've worked."
        description="From AI internships to enterprise platforms serving institutional investors — hover a card to dive into the milestones."
      />

      <div className="relative z-10 isolate mx-auto flex max-w-3xl flex-col gap-4">
        {experience.map((job, i) => {
          const open = expanded === i
          return (
            <Reveal key={`${job.company}-${job.role}`} delay={i * 90}>
              <motion.article
                layout
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onMouseEnter={() => {
                  setExpanded(i)
                  sendAvatarCommand({ type: 'point', cardId: job.company })
                }}
                onMouseLeave={() => {
                  setExpanded(0)
                  sendAvatarCommand({ type: 'unpoint' })
                }}
                onFocus={() => setExpanded(i)}
                onBlur={() => setExpanded(0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setExpanded(open ? null : i)
                  }
                }}
                onClick={() => setExpanded(open ? null : i)}
                className={`group relative cursor-pointer rounded-2xl border p-5 backdrop-blur-md transition-colors duration-300 sm:p-6 ${
                  open
                    ? 'z-20 border-white/70 bg-white/55 shadow-[0_20px_44px_-26px_rgba(122,112,158,0.45)]'
                    : 'z-10 border-white/40 bg-white/40 hover:border-white/60 hover:bg-white/50'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-ink-2">{job.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-lavender-deep">{job.company}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="inline-flex items-center gap-1.5 font-mono text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-lavender-deep" />
                      {job.period}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* expand cue */}
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                  <span>{open ? '● showing details' : '○ hover to expand'}</span>
                  <motion.span
                    className="ml-auto"
                    animate={reduced ? undefined : { rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 text-lavender-deep" />
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: 'easeInOut' }}
                      className={`overflow-hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                      <div className="pt-4">
                        <ul className="space-y-2">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep/80" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                          ))}
                        </div>
                        <MiniAvatar job={job} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
