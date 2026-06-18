import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, User } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getBlogPosts } from '@/lib/content'
import { formatDate, categoryBadgeClass } from '@/lib/utils'

export default async function BlogPreview() {
  const posts = (await getBlogPosts()).slice(0, 3)
  return (
    <section className="section-padding bg-surface" aria-labelledby="blog-heading">
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
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <article className="card-glass hover-glow group flex h-full flex-col overflow-hidden">
                {/* Couverture ou liseré de marque */}
                {post.cover_image ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-1.5 w-full gradient-brand" aria-hidden />
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.categories.slice(0, 2).map((cat, idx) => (
                      <span key={cat} className={categoryBadgeClass(idx === 0)}>
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-base font-bold leading-snug text-ink line-clamp-2 transition-colors group-hover:text-brand">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted">
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
