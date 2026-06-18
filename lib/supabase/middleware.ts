import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Rafraîchit la session Supabase à chaque requête (recommandé en SSR) et protège
 * la zone `/admin/**` : tout utilisateur non connecté est redirigé vers la page
 * de connexion. La vérification fine `is_admin()` est faite côté serveur dans le
 * layout du back-office (défense en profondeur), en plus des politiques RLS.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Supabase non configuré : ne jamais bloquer la navigation publique.
  if (!url || !key) return supabaseResponse

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
      ) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set({ name, value, ...options })
        )
      },
    },
  })

  // IMPORTANT : ne rien exécuter entre createServerClient et getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isProtectedAdmin = path.startsWith('/admin') && path !== '/admin/login'

  if (isProtectedAdmin && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    redirectUrl.searchParams.set('next', path)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
