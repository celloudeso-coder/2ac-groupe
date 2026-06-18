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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur shadow-section p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md md:rounded-2xl md:border md:shadow-xl"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">Ce site utilise des cookies</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Nous utilisons des cookies essentiels et analytiques pour améliorer votre expérience.{' '}
            <Link href="/politique-confidentialite" className="underline hover:text-primary">
              En savoir plus
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={accept} className="btn-primary px-4 py-2 text-xs">
              Accepter
            </button>
            <button onClick={decline} className="btn-outline px-4 py-2 text-xs">
              Refuser
            </button>
          </div>
        </div>
        <button
          onClick={decline}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
