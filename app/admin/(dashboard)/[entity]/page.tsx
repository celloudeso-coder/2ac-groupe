import { notFound } from 'next/navigation'
import { getEntity } from '@/lib/admin/entities'
import { createClient } from '@/lib/supabase/server'
import EntityList from '@/components/admin/EntityList'

export const dynamic = 'force-dynamic'

export default async function EntityListPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params
  const config = getEntity(entity)
  if (!config) notFound()

  const supabase = await createClient()
  const { data } = await supabase
    .from(config.table)
    .select('*')
    .order(config.orderBy.column, { ascending: config.orderBy.ascending })

  return <EntityList config={config} rows={data ?? []} />
}
