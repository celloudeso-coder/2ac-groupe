import Link from 'next/link'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BLOG_POSTS_DATA } from '@/lib/data'
import { formatDate } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  BTP: 'bg-blue-100 text-blue-700',
  Commerce: 'bg-amber-100 text-amber-700',
  Logistique: 'bg-emerald-100 text-emerald-700',
  'Import-Export': 'bg-violet-100 text-violet-700',
  Conseil: 'bg-rose-100 text-rose-700',
}

export default function BlogPreview() {
  return (
    <section className="section-padding bg-white" aria-labelledby="blog-heading">
      <div className="container-base">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Blog & Actualités"
            title="Conseils & expertise"
            description="Articles pratiques rédigés par notre équipe pour vous aider dans vos projets."
            align="left"
          />
          <Link href="/blog" className="btn-outline shrink-0 text-sm">
            Tous les articles
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS_DATA.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <article className="card-base group flex flex-col overflow-hidden">
                {/* Category stripe */}
                <div className="h-2 w-full gradient-primary" aria-hidden />

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className={`badge ${CATEGORY_COLORS[cat] ?? 'bg-slate-100 text-slate-600'}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-base font-bold leading-snug text-primary line-clamp-2 group-hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      {post.author}
                    </div>
                    {post.published_at && (
                      <time dateTime={post.published_at} className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        {formatDate(post.published_at)}
                      </time>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
