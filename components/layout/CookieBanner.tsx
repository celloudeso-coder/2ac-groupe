'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = '2ac_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Paramètres des cookies"
      className="glass glass-edge fixed inset-x-0 bottom-0 z-50 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">Ce site utilise des cookies</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Nous utilisons des cookies essentiels et analytiques pour améliorer votre expérience.{' '}
            <Link href="/politique-confidentialite" className="text-brand underline hover:text-brand-dark">
              En savoir plus
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={accept} className="btn-brand px-4 py-2 text-xs">
              Accepter
            </button>
            <button type="button" onClick={decline} className="btn-outline px-4 py-2 text-xs">
              Refuser
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={decline}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-faint hover:bg-ink/10 hover:text-ink"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
