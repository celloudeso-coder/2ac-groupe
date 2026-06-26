'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { EntityConfig, FieldDef } from '@/lib/admin/entities'
import { saveEntity, deleteEntity } from '@/app/admin/actions'
import ImageUpload from '@/components/admin/ImageUpload'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { cn } from '@/lib/utils'

type Values = Record<string, unknown>

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function initValue(f: FieldDef, initial: Values | null): unknown {
  const v = initial?.[f.name]
  switch (f.type) {
    case 'toggle':
      return Boolean(v)
    case 'tags':
      return Array.isArray(v) ? (v as string[]).join('\n') : ''
    case 'number':
      return v === null || v === undefined ? '' : String(v)
    case 'select':
      return (v as string) ?? (f.name === 'status' ? 'draft' : '')
    case 'datetime':
      return v ? String(v).slice(0, 16) : ''
    case 'date':
      return v ? String(v).slice(0, 10) : ''
    default:
      return (v as string) ?? ''
  }
}

export default function EntityForm({
  config,
  initial,
  id,
}: {
  config: EntityConfig
  initial: Values | null
  id: string | null
}) {
  const router = useRouter()
  const [values, setValues] = useState<Values>(() => {
    const v: Values = {}
    for (const f of config.fields) v[f.name] = initValue(f, initial)
    return v
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [autoSlug, setAutoSlug] = useState(!id)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const set = (name: string, value: unknown) => setValues((p) => ({ ...p, [name]: value }))

  const handleChange = (f: FieldDef, value: unknown) => {
    set(f.name, value)
    // Génération automatique du slug à partir du champ source (création uniquement).
    if (autoSlug) {
      const slugField = config.fields.find((x) => x.type === 'slug' && x.slugFrom === f.name)
      if (slugField) set(slugField.name, slugify(String(value)))
    }
  }

  const buildPayload = (): Values => {
    const out: Values = {}
    for (const f of config.fields) {
      const v = values[f.name]
      if (f.type === 'number') out[f.name] = v === '' ? null : Number(v)
      else if (f.type === 'toggle') out[f.name] = Boolean(v)
      else if (f.type === 'tags')
        out[f.name] = String(v)
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      else out[f.name] = v
    }
    return out
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    const result = await saveEntity(config.key, id, buildPayload())
    if (result.ok) {
      toast.success(id ? 'Modifications enregistrées.' : `${config.labelSingular} créé(e).`)
      router.push(`/admin/${config.key}`)
      router.refresh()
    } else {
      setErrors(result.fieldErrors ?? {})
      toast.error(result.error)
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    if (!window.confirm(`Supprimer définitivement « ${config.labelSingular} » ? Cette action est irréversible.`)) return
    setDeleting(true)
    const result = await deleteEntity(config.key, id)
    if (result.ok) {
      toast.success('Élément supprimé.')
      router.push(`/admin/${config.key}`)
      router.refresh()
    } else {
      toast.error(result.error)
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="card-glass glass--solid grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
        {config.fields.map((f) => (
          <div key={f.name} className={cn(f.colSpan === 2 || f.type === 'richtext' ? 'sm:col-span-2' : '')}>
            <Field
              f={f}
              value={values[f.name]}
              error={errors[f.name]}
              onChange={(v) => handleChange(f, v)}
              onSlugEdited={() => f.type === 'slug' && setAutoSlug(false)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-brand px-6 py-3">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
            Enregistrer
          </button>
          <Link href={`/admin/${config.key}`} className="btn-ghost px-4 py-3">
            Annuler
          </Link>
        </div>
        {id && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="btn-outline border-red-500/40 px-4 py-3 text-red-300 hover:border-red-500 hover:text-red-200">
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Trash2 className="h-4 w-4" aria-hidden />}
            Supprimer
          </button>
        )}
      </div>
    </form>
  )
}

function Field({
  f,
  value,
  error,
  onChange,
  onSlugEdited,
}: {
  f: FieldDef
  value: unknown
  error?: string
  onChange: (v: unknown) => void
  onSlugEdited: () => void
}) {
  const labelEl = (
    <label htmlFor={`f-${f.name}`} className="label-base">
      {f.label} {f.required && <span className="text-brand">*</span>}
    </label>
  )
  const help = f.help && <p className="mt-1 text-xs text-faint">{f.help}</p>
  const errEl = error && <p className="mt-1 text-xs text-red-300">{error}</p>

  if (f.type === 'image') {
    return (
      <div>
        {labelEl}
        <ImageUpload bucket={f.bucket ?? 'brand'} value={(value as string) || null} onChange={(url) => onChange(url ?? '')} />
        {help}
        {errEl}
      </div>
    )
  }

  if (f.type === 'richtext') {
    return (
      <div>
        {labelEl}
        <RichTextEditor value={(value as string) || ''} onChange={(html) => onChange(html)} placeholder={f.placeholder} />
        {help}
        {errEl}
      </div>
    )
  }

  if (f.type === 'toggle') {
    return (
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 rounded border-line accent-brand"
          />
          <span className="text-sm text-ink">{f.label}</span>
        </label>
        {help}
      </div>
    )
  }

  if (f.type === 'select') {
    return (
      <div>
        {labelEl}
        <select id={`f-${f.name}`} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className="input-base">
          {!f.required && <option value="">—</option>}
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {help}
        {errEl}
      </div>
    )
  }

  if (f.type === 'textarea') {
    return (
      <div>
        {labelEl}
        <textarea id={`f-${f.name}`} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} placeholder={f.placeholder} className="input-base resize-y" />
        {help}
        {errEl}
      </div>
    )
  }

  if (f.type === 'tags') {
    return (
      <div>
        {labelEl}
        <textarea id={`f-${f.name}`} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} placeholder={f.placeholder ?? 'Un élément par ligne…'} className="input-base resize-y" />
        {help ?? <p className="mt-1 text-xs text-faint">Un élément par ligne.</p>}
        {errEl}
      </div>
    )
  }

  const inputType = f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'datetime' ? 'datetime-local' : f.type === 'url' ? 'url' : 'text'

  return (
    <div>
      {labelEl}
      <input
        id={`f-${f.name}`}
        type={inputType}
        value={(value as string) ?? ''}
        placeholder={f.placeholder}
        min={f.min}
        max={f.max}
        onChange={(e) => {
          if (f.type === 'slug') onSlugEdited()
          onChange(e.target.value)
        }}
        className="input-base"
      />
      {help}
      {errEl}
    </div>
  )
}
