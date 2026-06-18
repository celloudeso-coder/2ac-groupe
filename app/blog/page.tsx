import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Blog & Actualités',
  description:
    'Conseils BTP, logistique internationale et import-export par l\'équipe 2AC SARL. Articles pratiques pour vos projets en Guinée et à l\'international.',
}

const CATEGORY_COLORS: Record<string, string> = {
  BTP: 'bg-blue-100 text-blue-700',
  Commerce: 'bg-amber-100 text-amber-700',
  Logistique: 'bg-emerald-100 text-emerald-700',
  'Import-Export': 'bg-violet-100 text-violet-700',
  Conseil: 'bg-rose-100 text-rose-700',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white md:py-24" aria-labelledby="blog-heading">
        <div className="container-base max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">Actualités & Conseil</p>
          <h1 id="blog-heading" className="font-display text-4xl font-extrabold md:text-5xl">Blog 2AC SARL</h1>
          <p className="mt-5 text-lg text-slate-300">
            Conseils pratiques, guides sectoriels et actualités de l'entreprise rédigés par notre équipe.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface" aria-label="Articles de blog">
        <div className="container-base">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="card-base group flex flex-col overflow-hidden">
                <div className="h-2 gradient-primary" aria-hidden />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.categories.map((cat) => (
                      <span key={cat} className={`badge ${CATEGORY_COLORS[cat] ?? 'bg-slate-100 text-slate-600'}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-lg font-bold leading-snug text-primary">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      {post.author}
                    </div>
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-600"
                  >
                    Lire l'article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Vous souhaitez contribuer ou suggérer un sujet ?{' '}
              <Link href="/contact" className="font-medium text-accent hover:underline">
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
