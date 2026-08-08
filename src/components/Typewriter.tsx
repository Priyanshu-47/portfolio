import { useEffect, useState } from 'react'

const TYPING_MS = 85
const DELETING_MS = 45
const HOLD_MS = 1900

type TypewriterProps = {
  words: string[]
  className?: string
}

/**
 * Cycles through a list of words with a type / hold / delete loop.
 * Respects prefers-reduced-motion by rendering all words statically.
 * The animated output is aria-hidden; pair this with a visually-hidden
 * static description at the call site for screen readers.
 */
export function Typewriter({ words, className = '' }: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words.join(' · '))
      return
    }

    const word = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? DELETING_MS : TYPING_MS,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words])

  return (
    <span className={className}>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="animate-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] rounded-full bg-cyan-300"
      />
    </span>
  )
}
