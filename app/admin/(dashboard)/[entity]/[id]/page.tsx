import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getEntity } from '@/lib/admin/entities'
import { createClient } from '@/lib/supabase/server'
import EntityForm from '@/components/admin/EntityForm'

export const dynamic = 'force-dynamic'

export default async function EntityEditPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>
}) {
  const { entity, id } = await params
  const config = getEntity(entity)
  if (!config) notFound()

  const isNew = id === 'new'
  let initial: Record<string, unknown> | null = null

  if (!isNew) {
    const supabase = await createClient()
    const { data } = await supabase.from(config.table).select('*').eq('id', id).maybeSingle()
    if (!data) notFound()
    initial = data as Record<string, unknown>
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/admin/${entity}`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour à la liste
      </Link>
      <h1 className="font-display text-2xl font-extrabold text-ink">
        {isNew ? `Nouveau : ${config.labelSingular}` : `Modifier : ${config.labelSingular}`}
      </h1>
      <EntityForm config={config} initial={initial} id={isNew ? null : id} />
    </div>
  )
}
