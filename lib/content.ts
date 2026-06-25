/**
 * Couche d'accès au contenu — Server Components uniquement.
 *
 * Chaque fonction interroge Supabase (client serveur) en filtrant `status = 'published'`
 * et en appliquant les tris côté requête. Si Supabase n'est pas configuré ou renvoie une
 * erreur, on retombe gracieusement sur les données statiques de `lib/data.ts` (jeu de
 * secours) afin que le site ne plante jamais — l'erreur est loguée côté serveur.
 *
 * Les appels sont mémorisés par requête via `cache()` (React) pour éviter les requêtes
 * dupliquées quand plusieurs composants demandent la même ressource.
 */
import { cache } from 'react'
import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  FEATURED_PROJECTS,
  TESTIMONIALS_DATA,
  BLOG_POSTS_DATA,
  TEAM_DATA,
  SITE_CONFIG,
} from '@/lib/data'
import type {
  Service,
  Project,
  Testimonial,
  BlogPost,
  TeamMember,
  SiteSettings,
} from '@/lib/types'

// --- Helpers ---------------------------------------------------------------

function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  )
}

/**
 * Client de lecture seule (clé publishable/anon, sans cookies).
 *
 * Volontairement PAS le client SSR basé sur les cookies : le contenu public ne
 * dépend pas de l'utilisateur, donc éviter `cookies()` permet le rendu statique
 * + ISR (revalidate) au lieu d'un rendu dynamique à chaque requête. La RLS
 * (rôle anon) n'expose de toute façon que les lignes `status = 'published'`.
 */
let readClient: SupabaseClient | null = null
function getReadClient(): SupabaseClient {
  if (!readClient) {
    readClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )
  }
  return readClient
}

/** Complète les données statiques (Omit<…>) avec des champs synthétiques. */
function withMeta<T extends { slug?: string }>(items: T[]): (T & {
  id: string
  created_at: string
  updated_at: string
})[] {
  return items.map((item, i) => ({
    ...item,
    id: item.slug ?? String(i),
    created_at: '',
    updated_at: '',
  }))
}

// Jeux de secours typés
const fallbackServices = withMeta(SERVICES_DATA) as Service[]
const fallbackProjects = withMeta(PROJECTS_DATA) as Project[]
const fallbackFeatured = withMeta(FEATURED_PROJECTS) as Project[]
const fallbackTestimonials = TESTIMONIALS_DATA.map((t, i) => ({
  ...t,
  id: String(i),
  created_at: '',
})) as Testimonial[]
const fallbackBlog = withMeta(BLOG_POSTS_DATA) as BlogPost[]
const fallbackTeam = TEAM_DATA.map((m, i) => ({
  ...m,
  id: String(i),
  created_at: '',
})) as TeamMember[]

const fallbackSettings: SiteSettings = {
  company: {
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    tagline: SITE_CONFIG.tagline,
    address: SITE_CONFIG.address,
    phones: [...SITE_CONFIG.phones],
    emails: [...SITE_CONFIG.emails],
    years_experience: 10,
  },
  hours: { ...SITE_CONFIG.hours },
  legal: { ...SITE_CONFIG.legal },
}

// --- Services --------------------------------------------------------------

export const getServices = cache(async (): Promise<Service[]> => {
  if (!supabaseConfigured()) return fallbackServices
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data && data.length > 0 ? (data as Service[]) : fallbackServices
  } catch (e) {
    console.error('[content] getServices → fallback statique :', e)
    return fallbackServices
  }
})

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  if (!supabaseConfigured()) {
    return fallbackServices.find((s) => s.slug === slug) ?? null
  }
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) throw error
    return (data as Service | null) ?? fallbackServices.find((s) => s.slug === slug) ?? null
  } catch (e) {
    console.error('[content] getServiceBySlug → fallback statique :', e)
    return fallbackServices.find((s) => s.slug === slug) ?? null
  }
})

// --- Projets ---------------------------------------------------------------

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!supabaseConfigured()) return fallbackProjects
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data && data.length > 0 ? (data as Project[]) : fallbackProjects
  } catch (e) {
    console.error('[content] getProjects → fallback statique :', e)
    return fallbackProjects
  }
})

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  if (!supabaseConfigured()) return fallbackFeatured
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data && data.length > 0 ? (data as Project[]) : fallbackFeatured
  } catch (e) {
    console.error('[content] getFeaturedProjects → fallback statique :', e)
    return fallbackFeatured
  }
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  if (!supabaseConfigured()) {
    return fallbackProjects.find((p) => p.slug === slug) ?? null
  }
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) throw error
    return (data as Project | null) ?? fallbackProjects.find((p) => p.slug === slug) ?? null
  } catch (e) {
    console.error('[content] getProjectBySlug → fallback statique :', e)
    return fallbackProjects.find((p) => p.slug === slug) ?? null
  }
})

// --- Blog ------------------------------------------------------------------

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!supabaseConfigured()) return fallbackBlog
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    if (error) throw error
    return data && data.length > 0 ? (data as BlogPost[]) : fallbackBlog
  } catch (e) {
    console.error('[content] getBlogPosts → fallback statique :', e)
    return fallbackBlog
  }
})

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!supabaseConfigured()) {
    return fallbackBlog.find((p) => p.slug === slug) ?? null
  }
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) throw error
    return (data as BlogPost | null) ?? fallbackBlog.find((p) => p.slug === slug) ?? null
  } catch (e) {
    console.error('[content] getBlogPostBySlug → fallback statique :', e)
    return fallbackBlog.find((p) => p.slug === slug) ?? null
  }
})

// --- Témoignages -----------------------------------------------------------

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!supabaseConfigured()) return fallbackTestimonials
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data && data.length > 0 ? (data as Testimonial[]) : fallbackTestimonials
  } catch (e) {
    console.error('[content] getTestimonials → fallback statique :', e)
    return fallbackTestimonials
  }
})

// --- Équipe ----------------------------------------------------------------

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  if (!supabaseConfigured()) return fallbackTeam
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data && data.length > 0 ? (data as TeamMember[]) : fallbackTeam
  } catch (e) {
    console.error('[content] getTeamMembers → fallback statique :', e)
    return fallbackTeam
  }
})

// --- Paramètres du site ----------------------------------------------------

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!supabaseConfigured()) return fallbackSettings
  try {
    const supabase = getReadClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['company', 'hours', 'legal'])
    if (error) throw error
    if (!data || data.length === 0) return fallbackSettings

    const map = Object.fromEntries(data.map((r) => [r.key, r.value])) as Record<
      string,
      unknown
    >
    return {
      company: { ...fallbackSettings.company, ...(map.company as object) },
      hours: { ...fallbackSettings.hours, ...(map.hours as object) },
      legal: { ...fallbackSettings.legal, ...(map.legal as object) } as SiteSettings['legal'],
    }
  } catch (e) {
    console.error('[content] getSiteSettings → fallback statique :', e)
    return fallbackSettings
  }
})
