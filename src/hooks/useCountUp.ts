import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to `target` with cubic ease-out once `start` flips true.
 * Jumps straight to the target under prefers-reduced-motion.
 */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}
