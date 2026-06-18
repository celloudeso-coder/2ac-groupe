'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Phone, ChevronDown, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { setSubmissionStatus, deleteSubmission } from '@/app/admin/actions'

export interface Submission {
  id: string
  type: string
  full_name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: 'new' | 'in_progress' | 'closed'
  created_at: string
}

const STATUSES: { value: Submission['status']; label: string }[] = [
  { value: 'new', label: 'Nouveau' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'closed', label: 'Traité' },
]

export default function SubmissionCard({ submission }: { submission: Submission }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [deleting, startDelete] = useTransition()

  const changeStatus = (status: Submission['status']) => {
    if (status === submission.status) return
    startTransition(async () => {
      const res = await setSubmissionStatus(submission.id, status)
      if (res.ok) {
        toast.success('Statut mis à jour.')
        router.refresh()
      } else toast.error(res.error)
    })
  }

  const remove = () => {
    if (!window.confirm('Supprimer définitivement cette demande ?')) return
    startDelete(async () => {
      const res = await deleteSubmission(submission.id)
      if (res.ok) {
        toast.success('Demande supprimée.')
        router.refresh()
      } else toast.error(res.error)
    })
  }

  return (
    <div className="card-glass glass--solid overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            {submission.full_name}
            <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">
              {submission.type}
            </span>
          </p>
          <p className="mt-0.5 truncate text-xs text-muted">{submission.subject ?? 'Sans objet'}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <time className="hidden text-xs text-faint sm:block" dateTime={submission.created_at}>
            {formatDate(submission.created_at)}
          </time>
          <ChevronDown className={cn('h-4 w-4 text-faint transition-transform', open && 'rotate-180')} aria-hidden />
        </div>
      </button>

      {open && (
        <div className="space-y-4 border-t border-line px-5 py-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${submission.email}`} className="inline-flex items-center gap-1.5 text-muted hover:text-brand">
              <Mail className="h-4 w-4" aria-hidden />
              {submission.email}
            </a>
            {submission.phone && (
              <a href={`tel:${submission.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-muted hover:text-brand">
                <Phone className="h-4 w-4" aria-hidden />
                {submission.phone}
              </a>
            )}
          </div>

          <div className="rounded-xl border border-line bg-surface/40 p-4 text-sm leading-relaxed text-ink/90">
            {submission.message}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-xl border border-line p-1" role="group" aria-label="Changer le statut">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  disabled={pending}
                  onClick={() => changeStatus(s.value)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                    submission.status === s.value ? 'bg-brand text-white' : 'text-muted hover:text-ink'
                  )}
                  aria-pressed={submission.status === s.value}
                >
                  {pending && submission.status !== s.value ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : s.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={remove}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:border-red-500 hover:text-red-200"
            >
              {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Trash2 className="h-3.5 w-3.5" aria-hidden />}
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
