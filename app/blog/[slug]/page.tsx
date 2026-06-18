import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'
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
        <div className="gradient-hero py-16 text-white md:py-20">
          <div className="container-base max-w-3xl">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Retour au blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span key={cat} className="badge bg-accent/20 text-accent-300">{cat}</span>
              ))}
            </div>
            <h1 id="post-heading" className="font-display text-3xl font-extrabold text-balance md:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
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
        <div className="section-padding bg-white">
          <div className="container-base max-w-3xl">
            {post.excerpt && (
              <p className="mb-8 text-lg leading-relaxed text-slate-600 border-l-4 border-accent-DEFAULT pl-6">
                {post.excerpt}
              </p>
            )}

            {post.body ? (
              <div
                className="prose prose-slate prose-headings:font-display prose-headings:text-primary prose-a:text-accent prose-blockquote:border-accent max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            ) : (
              <div className="rounded-xl bg-surface p-8 text-center">
                <p className="text-slate-500">Le contenu complet de cet article sera disponible prochainement.</p>
                <Link href="/contact" className="btn-primary mt-4 inline-flex">
                  Nous contacter
                </Link>
              </div>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 border-t border-slate-200 pt-10">
                <h2 className="font-display text-xl font-bold text-primary mb-5">Articles similaires</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="card-base p-5 hover:-translate-y-0.5 transition-transform"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.categories.slice(0, 1).map((cat) => (
                          <span key={cat} className="badge bg-primary-50 text-primary-700">{cat}</span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-primary line-clamp-2">{p.title}</h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{p.excerpt}</p>
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
