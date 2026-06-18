import Link from 'next/link'
import { Pencil, Plus, Check, Minus } from 'lucide-react'
import type { EntityConfig, ListColumn } from '@/lib/admin/entities'
import { formatDate } from '@/lib/utils'
import StatusToggle from '@/components/admin/StatusToggle'

type Row = Record<string, unknown>

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25',
  draft: 'bg-ink/10 text-muted border-line',
  archived: 'bg-amber-500/15 text-amber-300 border-amber-400/25',
}
const STATUS_LABELS: Record<string, string> = {
  published: 'Publié',
  draft: 'Brouillon',
  archived: 'Archivé',
}

function Cell({ col, row }: { col: ListColumn; row: Row }) {
  const value = row[col.key]
  switch (col.type) {
    case 'status':
      return (
        <span className={`badge border ${STATUS_STYLES[String(value)] ?? 'border-line bg-ink/10 text-muted'}`}>
          {STATUS_LABELS[String(value)] ?? String(value)}
        </span>
      )
    case 'boolean':
      return value ? (
        <Check className="h-4 w-4 text-emerald-400" aria-label="Oui" />
      ) : (
        <Minus className="h-4 w-4 text-faint" aria-label="Non" />
      )
    case 'date':
      return <span className="text-muted">{value ? formatDate(String(value)) : '—'}</span>
    case 'image':
      return value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(value)} alt="" className="h-10 w-10 rounded-lg border border-line object-cover" />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface/40 text-[10px] text-faint">
          —
        </span>
      )
    default:
      return <span className="text-ink">{value ? String(value) : '—'}</span>
  }
}

export default function EntityList({ config, rows }: { config: EntityConfig; rows: Row[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">{config.labelPlural}</h1>
          <p className="mt-1 text-sm text-muted">
            {rows.length} élément{rows.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link href={`/admin/${config.key}/new`} className="btn-brand px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" aria-hidden />
          Ajouter
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="card-glass glass--solid p-10 text-center">
          <p className="text-muted">Aucun élément. Cliquez sur « Ajouter » pour commencer.</p>
        </div>
      ) : (
        <div className="card-glass glass--solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-faint">
                <tr>
                  {config.listColumns.map((col) => (
                    <th key={col.key} className="px-4 py-3 font-semibold">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => (
                  <tr key={String(row.id)} className="transition-colors hover:bg-ink/5">
                    {config.listColumns.map((col) => (
                      <td key={col.key} className="px-4 py-3 align-middle">
                        <Cell col={col} row={row} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {'status' in row && (
                          <StatusToggle entityKey={config.key} id={String(row.id)} status={String(row.status)} />
                        )}
                        <Link
                          href={`/admin/${config.key}/${String(row.id)}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden />
                          Éditer
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
