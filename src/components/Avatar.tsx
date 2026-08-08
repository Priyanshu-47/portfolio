import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Award, Cloud, Code2, TrendingUp } from 'lucide-react'

type Accent = 'wave' | 'glasses' | 'terminal' | 'metrics' | 'cloud' | 'badge'

type Context = { id: string; label: string; accent: Accent }

const CONTEXTS: Context[] = [
  { id: 'home', label: "hi, I'm Priyanshu", accent: 'wave' },
  { id: 'about', label: 'full-stack engineer', accent: 'glasses' },
  { id: 'stack', label: '.NET · React · AWS · Python · Cursor', accent: 'glasses' },
  { id: 'experience', label: 'shipping enterprise apps', accent: 'terminal' },
  { id: 'projects', label: 'metrics trending up', accent: 'metrics' },
  { id: 'skills', label: 'cloud-native toolkit', accent: 'cloud' },
  { id: 'credentials', label: 'certified & award-winning', accent: 'badge' },
  { id: 'contact', label: "let's build something", accent: 'wave' },
]

const DEFAULT: Context = CONTEXTS[0]

function Accessory({ accent }: { accent: Accent }) {
  const base =
    'absolute -top-2.5 -right-2 flex h-6 w-6 items-center justify-center rounded-lg shadow-sm ring-2 ring-white/60'
  switch (accent) {
    case 'wave':
      return (
        <span className={`${base} bg-white/90 text-xl leading-none`} aria-hidden>
          👋
        </span>
      )
    case 'terminal':
      return (
        <span className={`${base} bg-ink-2 text-peach`} aria-hidden>
          <Code2 className="h-3.5 w-3.5" />
        </span>
      )
    case 'cloud':
      return (
        <span className={`${base} bg-sky-200/90 text-sky-700`} aria-hidden>
          <Cloud className="h-3.5 w-3.5" />
        </span>
      )
    case 'metrics':
      return (
        <span className={`${base} bg-sage text-sage-deep`} aria-hidden>
          <TrendingUp className="h-3.5 w-3.5" />
        </span>
      )
    case 'badge':
      return (
        <span className={`${base} bg-peach text-peach-deep`} aria-hidden>
          <Award className="h-3.5 w-3.5" />
        </span>
      )
    default:
      return null
  }
}

function Face({ glasses }: { glasses: boolean }) {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-deep to-peach-deep shadow-lg shadow-lavender-deep/30 ring-2 ring-white/60">
      <div className="flex items-center gap-1.5">
        {glasses ? (
          <>
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-white/90">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-white/90">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
          </>
        ) : (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </>
        )}
      </div>
      <span
        className="absolute bottom-3 left-1/2 h-1 w-2.5 -translate-x-1/2 rounded-b-full border-b-2 border-white/90"
        aria-hidden
      />
    </div>
  )
}

/**
 * Floating, scroll-linked developer avatar pinned to the bottom-right corner.
 *
 * - Greeting state at the top (gentle hover + wave), tilts into a kinetic
 *   "in-motion" pose as you scroll (useScroll / useTransform).
 * - An IntersectionObserver watches the page sections and swaps the avatar's
 *   accessory + caption so it reacts to whichever scope is on screen
 *   (.NET/AWS stack → glasses, experience → terminal, skills → cloud node,
 *   projects → metrics, contact → wave).
 * - Clicking the avatar glides back to the top.
 */
export function Avatar() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [context, setContext] = useState<Context>(DEFAULT)

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 1], [8, -10, 5])
  const rotateY = useTransform(scrollYProgress, [0, 0.4, 1], [-10, 12, -6])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.94, 1.04])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        let best: IntersectionObserverEntry | null = null
        for (const e of visible) {
          if (!best || e.boundingClientRect.top < best.boundingClientRect.top) best = e
        }
        const id = best?.target.id
        if (id) setContext(CONTEXTS.find((c) => c.id === id) ?? DEFAULT)
      },
      { threshold: 0.15 },
    )
    for (const c of CONTEXTS) {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const goTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-40 hidden select-none items-end gap-3 sm:flex"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Context caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={context.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.25 }}
          className="glass-soft mb-1 rounded-2xl rounded-br-sm px-3 py-1.5 text-xs font-medium text-ink"
        >
          {context.label}
        </motion.div>
      </AnimatePresence>

      <button type="button" onClick={goTop} aria-label="Back to top" className="relative">
        <motion.div
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div style={reduced ? undefined : { rotateX, rotateY, scale }} className="relative">
            <Face glasses={context.accent === 'glasses'} />
            <Accessory accent={context.accent} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-sage-deep ring-2 ring-white/70" />
          </motion.div>
        </motion.div>
      </button>
    </motion.div>
  )
}
