'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setEntityStatus } from '@/app/admin/actions'

export default function StatusToggle({
  entityKey,
  id,
  status,
}: {
  entityKey: string
  id: string
  status: string
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const published = status === 'published'

  const toggle = () => {
    startTransition(async () => {
      const next = published ? 'draft' : 'published'
      const res = await setEntityStatus(entityKey, id, next)
      if (res.ok) {
        toast.success(published ? 'Mis en brouillon.' : 'Publié.')
        router.refresh()
      } else {
        toast.error(res.error)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-brand hover:text-brand"
      title={published ? 'Mettre en brouillon' : 'Publier'}
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
      ) : published ? (
        <EyeOff className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Eye className="h-3.5 w-3.5" aria-hidden />
      )}
      {published ? 'Dépublier' : 'Publier'}
    </button>
  )
}
