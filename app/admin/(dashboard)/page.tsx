import Link from 'next/link'
import { Building2, Newspaper, Inbox, Layers, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = await createClient()
  const published = (table: string) =>
    supabase.from(table).select('*', { count: 'exact', head: true }).eq('status', 'published')

  const [services, projects, posts, demandes, recent] = await Promise.all([
    published('services'),
    published('projects'),
    published('blog_posts'),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('contact_submissions')
      .select('id, type, full_name, subject, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  return {
    services: services.count ?? 0,
    projects: projects.count ?? 0,
    posts: posts.count ?? 0,
    demandes: demandes.count ?? 0,
    recent: (recent.data ?? []) as {
      id: string
      type: string
      full_name: string
      subject: string | null
      created_at: string
      status: string
    }[],
  }
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nouveau',
  in_progress: 'En cours',
  closed: 'Traité',
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Services publiés', value: stats.services, icon: Layers, href: '/admin/services' },
    { label: 'Réalisations publiées', value: stats.projects, icon: Building2, href: '/admin/realisations' },
    { label: 'Articles publiés', value: stats.posts, icon: Newspaper, href: '/admin/blog' },
    { label: 'Demandes en attente', value: stats.demandes, icon: Inbox, href: '/admin/demandes' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted">Vue d&apos;ensemble du contenu et des demandes.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <Link key={c.label} href={c.href} className="card-glass glass--solid hover-glow p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <ArrowRight className="h-4 w-4 text-faint" aria-hidden />
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold text-ink">{c.value}</p>
              <p className="mt-1 text-sm text-muted">{c.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="card-glass glass--solid overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Dernières demandes</h2>
          <Link href="/admin/demandes" className="text-sm font-semibold text-brand hover:underline">
            Tout voir
          </Link>
        </div>
        {stats.recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">Aucune demande pour le moment.</p>
        ) : (
          <ul className="divide-y divide-line">
            {stats.recent.map((s) => (
              <li key={s.id}>
                <Link href="/admin/demandes" className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink/5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {s.full_name}
                      <span className="ml-2 text-xs uppercase text-faint">{s.type}</span>
                    </p>
                    <p className="truncate text-xs text-muted">{s.subject ?? 'Sans objet'}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className={s.status === 'new' ? 'badge-brand' : 'badge border border-line bg-ink/10 text-muted'}>
                      {STATUS_LABELS[s.status] ?? s.status}
                    </span>
                    <time className="hidden text-xs text-faint sm:block" dateTime={s.created_at}>
                      {formatDate(s.created_at)}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
