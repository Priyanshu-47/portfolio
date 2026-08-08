import type { ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  className?: string
}

export function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/40 px-3 py-1 font-mono text-xs text-slate-600 backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  )
}
