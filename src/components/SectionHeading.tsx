import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-sm font-medium tracking-wide text-lavender-deep">
        <span className="mr-2 text-peach-deep">{'//'}</span>
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-tight text-ink-2 sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </Reveal>
  )
}
