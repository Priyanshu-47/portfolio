import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      setProgress(max > 0 ? (root.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
