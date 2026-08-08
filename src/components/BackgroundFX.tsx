import { useReducedMotion } from 'framer-motion'

/* ---------------------------------------------------------------------------
   BackgroundFX — a fixed, faint structural grid that sits BEHIND the content
   sections (main is `relative z-10`). Everything is pointer-events-none.
--------------------------------------------------------------------------- */

export function BackgroundFX() {
  const reduced = !!useReducedMotion()
  if (reduced) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="bg-grid absolute inset-0 opacity-40" />
    </div>
  )
}
