import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content'
import { formatDate, categoryBadgeClass } from '@/lib/utils'
import LiquidBackground from '@/components/ui/LiquidBackground'
import CtaBanner from '@/components/home/CtaBanner'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getBlogPosts()
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <article aria-labelledby="post-heading">
        {/* Hero */}
        <div className="relative overflow-hidden bg-background py-16 md:py-20">
          <LiquidBackground density="subtle" className="opacity-70" />
          <div className="container-base relative z-10 max-w-3xl">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Retour au blog
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((cat, idx) => (
                <span key={cat} className={categoryBadgeClass(idx === 0)}>{cat}</span>
              ))}
            </div>
            <h1 id="post-heading" className="font-display text-3xl font-extrabold text-balance text-ink md:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden />
                  {post.author}
                </div>
              )}
              {post.published_at && (
                <time dateTime={post.published_at} className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden />
                  {formatDate(post.published_at)}
                </time>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding bg-background">
          <div className="container-base max-w-3xl">
            {post.cover_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
                <Image src={post.cover_image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
              </div>
            )}

            {post.excerpt && (
              <p className="mb-8 border-l-4 border-brand pl-6 text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>
            )}

            {post.body ? (
              <div className="prose-2ac" dangerouslySetInnerHTML={{ __html: post.body }} />
            ) : (
              <div className="card-glass p-8 text-center">
                <p className="text-muted">Le contenu complet de cet article sera disponible prochainement.</p>
                <Link href="/contact" className="btn-brand mt-4 inline-flex">
                  Nous contacter
                </Link>
              </div>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 border-t border-line pt-10">
                <h2 className="mb-5 font-display text-xl font-bold text-ink">Articles similaires</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="card-glass hover-glow p-5">
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {p.categories.slice(0, 1).map((cat) => (
                          <span key={cat} className={categoryBadgeClass(true)}>{cat}</span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-ink line-clamp-2">{p.title}</h3>
                      <p className="mt-1.5 text-xs text-muted line-clamp-2">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  )
}
