import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'

type StatCounterProps = {
  value: string
  label: string
}

/**
 * A stat tile that reveals on scroll and animates its number upward.
 * Parses "2+" into a countable number (2) plus a suffix ("+").
 */
export function StatCounter({ value, label }: StatCounterProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const count = useCountUp(target, visible)

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-700 ease-out hover:border-indigo-400/40 hover:bg-white/[0.07] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="font-display text-2xl font-bold text-gradient">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-xs leading-tight text-slate-400">{label}</div>
    </div>
  )
}
