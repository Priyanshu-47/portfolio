import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ---------------------------------------------------------------------------
   BackgroundFX — a fixed, scroll-parallax layer of soft pastel orbs + a faint
   grid that sits BEHIND the content sections (main is `relative z-10`). Because
   the section cards use backdrop-blur, the drifting orbs show through as a
   smooth, deep glassmorphism wash as you scroll.
--------------------------------------------------------------------------- */

type Orb = {
  color: string
  size: number
  x: number // vw
  y: number // vh
  parallax: number // vh of travel per full scroll
  delay: number
}

const ORBS: Orb[] = [
  { color: 'rgba(223, 234, 221, 0.9)', size: 34, x: 8, y: 6, parallax: 26, delay: 0 },
  { color: 'rgba(233, 226, 250, 0.85)', size: 30, x: 72, y: 20, parallax: -34, delay: 0.5 },
  { color: 'rgba(251, 231, 220, 0.9)', size: 26, x: 40, y: 64, parallax: 22, delay: 1.1 },
  { color: 'rgba(220, 239, 230, 0.85)', size: 38, x: 84, y: 78, parallax: -18, delay: 1.6 },
]

export function BackgroundFX() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    let raf = 0
    let current = 0

    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const target = max > 0 ? window.scrollY / max : 0
      current += (target - current) * 0.08 // smooth trailing parallax
      const vh = window.innerHeight
      ORBS.forEach((orb, i) => {
        const el = orbRefs.current[i]
        if (!el) return
        el.style.transform = `translate3d(0, ${(-current * orb.parallax * vh) / 100}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${orb.size}vw`,
            height: `${orb.size}vw`,
            left: `${orb.x}vw`,
            top: `${orb.y}vh`,
            background: `radial-gradient(circle at 35% 30%, ${orb.color}, transparent 70%)`,
            willChange: 'transform',
          }}
        />
      ))}
      {/* Faint structural grid for the "developer canvas" feel */}
      <div className="bg-grid absolute inset-0 opacity-40" />
    </div>
  )
}
