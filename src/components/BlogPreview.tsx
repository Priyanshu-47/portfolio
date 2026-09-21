import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'

const posts = [
  { slug: 'ai-in-enterprise', title: 'AI in Enterprise: What I Learned Building RAG Pipelines', date: 'Aug 2026', category: 'AI/ML' },
  { slug: 'dotnet-react-patterns', title: 'Patterns for .NET + React Full-Stack Apps', date: 'Jul 2026', category: 'Engineering' },
  { slug: 'aws-deployment-guide', title: 'Deploying to AWS: From ECS to Lambda', date: 'Jun 2026', category: 'Cloud' },
  { slug: 'cursor-ai-workflow', title: 'How I Use Cursor AI Daily as a Full-Stack Engineer', date: 'May 2026', category: 'Tools' },
]

export function BlogPreview() {
  return (
    <section className="riwa-section border-t border-[#1e2128]">
      <Reveal>
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="section-label">09 — insights</p>
            <h2 className="section-heading">
              Latest from my
              <br />
              <span className="text-[#9e9e9e]">engineering journal.</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-2 text-[0.8rem] font-medium text-[#9e9e9e] transition-colors hover:text-white accent-underline"
          >
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="space-y-0">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80}>
            <Link
              to="/blog"
              className="group flex items-start justify-between gap-6 border-t border-[#1e2128] py-7 transition-colors hover:bg-[#14171d]/50 -mx-6 px-6 lg:-mx-10 lg:px-10"
            >
              <div className="flex items-start gap-6 lg:gap-10">
                <span className="font-mono text-[0.75rem] text-[#686868] mt-1 shrink-0">
                  {String(i + 1).padStart(3, '0')}
                </span>
                <div>
                  <span className="inline-flex items-center rounded-full border border-[#27282c] bg-[#0e1015] px-3 py-0.5 text-[0.6rem] font-medium text-[#686868] uppercase mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-display text-[1rem] lg:text-[1.15rem] font-semibold text-white group-hover:text-[#e9681e] transition-colors tracking-[-0.01em]">
                    {post.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:block text-[0.7rem] text-[#686868] font-mono">{post.date}</span>
                <ArrowRight className="h-4 w-4 text-[#686868] group-hover:text-[#e9681e] transition-colors" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
