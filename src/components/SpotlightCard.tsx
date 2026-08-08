import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'

const REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type SpotlightCardProps = {
  children: ReactNode
  className?: string
}

/**
 * 2026-style interactive card: a radial "spotlight" tracks the cursor across
 * the surface while a subtle 3D perspective tilt follows the pointer.
 * Motion (tilt) is disabled under prefers-reduced-motion; the light remains.
 */
export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (REDUCED_MOTION) return
    const rx = ((y - rect.height / 2) / rect.height) * -5
    const ry = ((x - rect.width / 2) / rect.width) * 5
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }, [])

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}
