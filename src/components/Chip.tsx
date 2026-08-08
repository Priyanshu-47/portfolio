import type { ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  className?: string
}

export function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 ${className}`}
    >
      {children}
    </span>
  )
}
