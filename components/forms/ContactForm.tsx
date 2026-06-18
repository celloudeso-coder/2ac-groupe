'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  'Renseignements généraux',
  'BTP — Construction / Rénovation',
  'Commerce général — Carreaux & finition',
  'Logistique & Transport international',
  'Import-Export',
  'Conseil & Services',
  'Autre',
]

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
    // honeypot — must stay empty
    website: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return
    if (form.website) return // honeypot triggered

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          consent: form.consent,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur serveur')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-xl bg-emerald-50 px-6 py-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-emerald-500" aria-hidden />
        <h3 className="font-display text-lg font-bold text-emerald-900">Message envoyé !</h3>
        <p className="mt-2 text-sm text-emerald-700">
          Merci pour votre message. Notre équipe vous répondra dans les 24 heures ouvrées.
        </p>
        <button
          onClick={() => { setStatus('idle'); setForm({ full_name: '', email: '', phone: '', subject: '', message: '', consent: false, website: '' }) }}
          className="mt-6 btn-primary px-6 py-2.5 text-sm"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label-base">
            Nom complet <span className="text-red-500" aria-label="requis">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className="input-base"
            placeholder="Mamadou Diallo"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="label-base">
            Email <span className="text-red-500" aria-label="requis">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={200}
            autoComplete="email"
            className="input-base"
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="label-base">Téléphone</label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={30}
            autoComplete="tel"
            className="input-base"
            placeholder="+224 6XX XX XX XX"
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className="label-base">Sujet</label>
          <select
            id="cf-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="input-base"
          >
            <option value="">Choisir un sujet…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label-base">
            Message <span className="text-red-500" aria-label="requis">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="input-base resize-none"
            placeholder="Décrivez votre demande ou projet…"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-primary-DEFAULT"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              J'accepte que 2AC SARL collecte et traite mes données pour répondre à ma demande, conformément à notre{' '}
              <a href="/politique-confidentialite" className="underline hover:text-primary" target="_blank" rel="noopener">
                politique de confidentialité
              </a>
              . <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === 'loading' || !form.consent}
          className="btn-primary w-full py-3.5 sm:w-auto sm:px-10"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Envoyer le message
            </>
          )}
        </button>
      </div>
    </form>
  )
}
