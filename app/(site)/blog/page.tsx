import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { User, ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/content'
import { formatDate, categoryBadgeClass } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Blog & Actualités',
  description:
    'Conseils BTP, logistique internationale et import-export par l\'équipe 2AC GROUPE. Articles pratiques pour vos projets en Guinée et à l\'international.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <>
      <PageHero
        eyebrow="Actualités & Conseil"
        title="Blog 2AC GROUPE"
        description="Conseils pratiques, guides sectoriels et actualités de l'entreprise rédigés par notre équipe."
      />

      <section className="section-padding bg-background" aria-label="Articles de blog">
        <div className="container-base">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="card-glass hover-glow group flex flex-col overflow-hidden">
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
                  <div className="h-1.5 gradient-brand" aria-hidden />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.categories.map((cat, idx) => (
                      <span key={cat} className={categoryBadgeClass(idx === 0)}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-lg font-bold leading-snug text-ink">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      {post.author}
                    </div>
                    {post.published_at && (
                      <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted">
              Vous souhaitez contribuer ou suggérer un sujet ?{' '}
              <Link href="/contact" className="font-medium text-brand hover:underline">
                Contactez-nous
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
