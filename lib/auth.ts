import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AuthState {
  userId: string | null
  email: string | null
  fullName: string | null
  isAdmin: boolean
}

/**
 * État d'authentification courant (mémorisé par requête).
 * Vérifie l'utilisateur via `getUser()` puis son drapeau `is_admin` en base.
 */
export const getAuthState = cache(async (): Promise<AuthState> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { userId: null, email: null, fullName: null, isAdmin: false }

  const { data } = await supabase
    .from('profiles')
    .select('is_admin, full_name')
    .eq('id', user.id)
    .maybeSingle()

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: data?.full_name ?? null,
    isAdmin: Boolean(data?.is_admin),
  }
})

/** Garde de page : redirige vers /admin/login si non connecté ou non-admin. */
export async function requireAdmin(): Promise<AuthState> {
  const state = await getAuthState()
  if (!state.userId) redirect('/admin/login')
  if (!state.isAdmin) redirect('/admin/login?error=forbidden')
  return state
}
