'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, LogIn, Mail, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

export default function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') ?? '/admin'
  const forbidden = params.get('error') === 'forbidden'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(forbidden ? "Ce compte n'a pas accès au back-office." : '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError || !data.user) {
        setError('Email ou mot de passe incorrect.')
        setLoading(false)
        return
      }
      // Vérifier le rôle admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .maybeSingle()
      if (!profile?.is_admin) {
        await supabase.auth.signOut()
        setError("Ce compte n'a pas les droits d'administration.")
        setLoading(false)
        return
      }
      router.replace(next.startsWith('/admin') ? next : '/admin')
      router.refresh()
    } catch {
      setError('Connexion impossible. Vérifiez votre connexion internet.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo height={44} priority />
        <h1 className="mt-6 font-display text-2xl font-extrabold text-ink">Espace d&apos;administration</h1>
        <p className="mt-2 text-sm text-muted">Connectez-vous pour gérer le contenu du site.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-glass glass--solid space-y-5 p-6 sm:p-8" noValidate>
        <div>
          <label htmlFor="login-email" className="label-base">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base pl-10"
              placeholder="admin@2ac-gn.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-password" className="label-base">Mot de passe</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-base pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-brand w-full py-3.5">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Connexion…
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" aria-hidden />
              Se connecter
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-faint">
        Accès réservé à l&apos;équipe 2AC GROUPE.
      </p>
    </div>
  )
}
