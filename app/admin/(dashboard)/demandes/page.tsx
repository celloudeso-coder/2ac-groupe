import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SubmissionCard, { type Submission } from '@/components/admin/SubmissionCard'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const FILTERS = [
  { value: 'all', label: 'Toutes' },
  { value: 'new', label: 'Nouvelles' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'closed', label: 'Traitées' },
]

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const active = FILTERS.some((f) => f.value === status) ? (status as string) : 'all'

  const supabase = await createClient()
  let query = supabase
    .from('contact_submissions')
    .select('id, type, full_name, email, phone, subject, message, status, created_at')
    .order('created_at', { ascending: false })
  if (active !== 'all') query = query.eq('status', active)
  const { data } = await query
  const rows = (data ?? []) as Submission[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Demandes</h1>
        <p className="mt-1 text-sm text-muted">Messages de contact et demandes de devis reçus via le site.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === 'all' ? '/admin/demandes' : `/admin/demandes?status=${f.value}`}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
              active === f.value
                ? 'border-brand bg-brand/15 text-brand'
                : 'border-line text-muted hover:text-ink'
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="card-glass glass--solid p-10 text-center">
          <p className="text-muted">Aucune demande dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((s) => (
            <SubmissionCard key={s.id} submission={s} />
          ))}
        </div>
      )}
    </div>
  )
}
