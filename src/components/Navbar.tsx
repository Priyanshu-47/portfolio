import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const probe = window.scrollY + 160
      let current = ''
      for (const link of links) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= probe) current = link.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/30 bg-white/40 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(122,112,158,0.35)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" onClick={() => setOpen(false)} className="font-display text-xl font-bold">
          <span className="text-gradient">PL</span>
          <span className="text-slate-400">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === link.id ? 'text-ink-2' : 'text-slate-500 hover:text-ink-2'
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-sage-deep via-lavender-deep to-peach-deep transition-opacity duration-300 ${
                  active === link.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg border border-white/40 bg-white/40 px-4 py-2 text-sm font-semibold text-ink-2 backdrop-blur-md transition hover:border-white/70 hover:bg-white/60 md:inline-flex"
          >
            Hire me
            <ArrowUpRight className="h-4 w-4 text-lavender-deep" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/40 bg-white/30 p-2 text-ink backdrop-blur-md transition hover:bg-white/50 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-white/30 bg-white/60 backdrop-blur-md transition-[max-height] duration-300 ease-out md:hidden ${
          open ? 'max-h-96 border-b' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === link.id ? 'bg-white/60 text-ink-2' : 'text-slate-500 hover:text-ink-2'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
