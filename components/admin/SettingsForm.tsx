'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { updateSettings } from '@/app/admin/actions'

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: settings.company.name,
    tagline: settings.company.tagline,
    address: settings.company.address,
    phones: settings.company.phones.join('\n'),
    emails: settings.company.emails.join('\n'),
    years_experience: String(settings.company.years_experience ?? 10),
    mon_fri: settings.hours.mon_fri,
    sat: settings.hours.sat,
    sun: settings.hours.sun,
  })

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await updateSettings({
      company: {
        name: form.name,
        tagline: form.tagline,
        address: form.address,
        phones: lines(form.phones),
        emails: lines(form.emails),
        years_experience: Number(form.years_experience) || 0,
      },
      hours: { mon_fri: form.mon_fri, sat: form.sat, sun: form.sun },
    })
    if (res.ok) {
      toast.success('Paramètres enregistrés.')
      router.refresh()
    } else {
      toast.error(res.error)
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="card-glass glass--solid space-y-5 p-6">
        <h2 className="font-display text-lg font-bold text-ink">Entreprise</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="s-name" className="label-base">Nom commercial</label>
            <input id="s-name" value={form.name} onChange={(e) => set('name', e.target.value)} className="input-base" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="s-tagline" className="label-base">Slogan</label>
            <input id="s-tagline" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className="input-base" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="s-address" className="label-base">Adresse</label>
            <input id="s-address" value={form.address} onChange={(e) => set('address', e.target.value)} className="input-base" />
          </div>
          <div>
            <label htmlFor="s-phones" className="label-base">Téléphones</label>
            <textarea id="s-phones" rows={2} value={form.phones} onChange={(e) => set('phones', e.target.value)} className="input-base resize-y" />
            <p className="mt-1 text-xs text-faint">Un numéro par ligne.</p>
          </div>
          <div>
            <label htmlFor="s-emails" className="label-base">Emails</label>
            <textarea id="s-emails" rows={2} value={form.emails} onChange={(e) => set('emails', e.target.value)} className="input-base resize-y" />
            <p className="mt-1 text-xs text-faint">Un email par ligne.</p>
          </div>
          <div>
            <label htmlFor="s-years" className="label-base">Années d&apos;expérience</label>
            <input id="s-years" type="number" min={0} value={form.years_experience} onChange={(e) => set('years_experience', e.target.value)} className="input-base" />
          </div>
        </div>
      </section>

      <section className="card-glass glass--solid space-y-5 p-6">
        <h2 className="font-display text-lg font-bold text-ink">Horaires d&apos;ouverture</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="s-monfri" className="label-base">Lundi – Vendredi</label>
            <input id="s-monfri" value={form.mon_fri} onChange={(e) => set('mon_fri', e.target.value)} className="input-base" placeholder="08h00 – 18h00" />
          </div>
          <div>
            <label htmlFor="s-sat" className="label-base">Samedi</label>
            <input id="s-sat" value={form.sat} onChange={(e) => set('sat', e.target.value)} className="input-base" placeholder="09h00 – 13h00" />
          </div>
          <div>
            <label htmlFor="s-sun" className="label-base">Dimanche</label>
            <input id="s-sun" value={form.sun} onChange={(e) => set('sun', e.target.value)} className="input-base" placeholder="Fermé" />
          </div>
        </div>
      </section>

      <button type="submit" disabled={saving} className="btn-brand px-6 py-3">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
        Enregistrer les paramètres
      </button>
    </form>
  )
}
