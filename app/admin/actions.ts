'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import {
  getEntity,
  buildSchema,
  normalizePayload,
  type EntityConfig,
} from '@/lib/admin/entities'
import type { SupabaseClient } from '@supabase/supabase-js'

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

/** Vérifie la session ET le rôle admin (défense en profondeur, en plus du RLS). */
async function getAdminClient(): Promise<
  { supabase: SupabaseClient; userId: string } | { error: string }
> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Session expirée. Veuillez vous reconnecter.' }
  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()
  if (!data?.is_admin) return { error: "Accès refusé : droits d'administration requis." }
  return { supabase, userId: user.id }
}

function friendlyDbError(error: { code?: string; message: string }): string {
  if (error.code === '23505') return 'Cette valeur existe déjà (slug en double ?).'
  if (error.code === '23514') return 'Une valeur ne respecte pas les contraintes (ex : note hors 1–5).'
  return "Erreur d'enregistrement. Réessayez."
}

function revalidateEntity(config: EntityConfig) {
  for (const path of config.revalidate) revalidatePath(path)
  if (config.table === 'blog_posts') revalidatePath('/blog/[slug]', 'page')
  if (config.table === 'services') revalidatePath('/services/[slug]', 'page')
  revalidatePath(`/admin/${config.key}`)
}

// --- CRUD générique --------------------------------------------------------

export async function saveEntity(
  entityKey: string,
  id: string | null,
  payload: Record<string, unknown>
): Promise<ActionResult> {
  const config = getEntity(entityKey)
  if (!config) return { ok: false, error: 'Entité inconnue.' }

  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }

  const parsed = buildSchema(config).safeParse(payload)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '')
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, error: 'Veuillez corriger les champs en erreur.', fieldErrors }
  }

  const record = normalizePayload(config, parsed.data)
  const { supabase } = auth

  const query = id
    ? supabase.from(config.table).update(record).eq('id', id).select('id').maybeSingle()
    : supabase.from(config.table).insert(record).select('id').maybeSingle()

  const { data, error } = await query
  if (error) return { ok: false, error: friendlyDbError(error) }

  revalidateEntity(config)
  return { ok: true, id: (data?.id as string) ?? id ?? undefined }
}

export async function deleteEntity(entityKey: string, id: string): Promise<ActionResult> {
  const config = getEntity(entityKey)
  if (!config) return { ok: false, error: 'Entité inconnue.' }
  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }

  const { error } = await auth.supabase.from(config.table).delete().eq('id', id)
  if (error) return { ok: false, error: 'Suppression impossible.' }
  revalidateEntity(config)
  return { ok: true }
}

export async function setEntityStatus(
  entityKey: string,
  id: string,
  status: 'draft' | 'published' | 'archived'
): Promise<ActionResult> {
  const config = getEntity(entityKey)
  if (!config) return { ok: false, error: 'Entité inconnue.' }
  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }

  const { error } = await auth.supabase.from(config.table).update({ status }).eq('id', id)
  if (error) return { ok: false, error: 'Mise à jour du statut impossible.' }
  revalidateEntity(config)
  return { ok: true }
}

// --- Demandes (contact / devis) -------------------------------------------

export async function setSubmissionStatus(
  id: string,
  status: 'new' | 'in_progress' | 'closed'
): Promise<ActionResult> {
  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }
  const { error } = await auth.supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
  if (error) return { ok: false, error: 'Mise à jour impossible.' }
  revalidatePath('/admin/demandes')
  return { ok: true }
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }
  const { error } = await auth.supabase.from('contact_submissions').delete().eq('id', id)
  if (error) return { ok: false, error: 'Suppression impossible.' }
  revalidatePath('/admin/demandes')
  return { ok: true }
}

// --- Paramètres du site ----------------------------------------------------

const settingsSchema = z.object({
  company: z.object({
    name: z.string().trim().min(1, 'Le nom est requis.'),
    tagline: z.string().trim().min(1, 'Le slogan est requis.'),
    address: z.string().trim().min(1, "L'adresse est requise."),
    phones: z.array(z.string().trim().min(1)).min(1, 'Au moins un téléphone.'),
    emails: z.array(z.string().trim().email('Email invalide.')).min(1, 'Au moins un email.'),
    years_experience: z.coerce.number().int().min(0),
  }),
  hours: z.object({
    mon_fri: z.string().trim().min(1, 'Horaire requis.'),
    sat: z.string().trim().min(1, 'Horaire requis.'),
    sun: z.string().trim().min(1, 'Horaire requis.'),
  }),
  mission: z
    .object({
      title: z.string().trim().min(1, 'Le titre de la mission est requis.'),
      body: z.string().trim().min(1, 'Le texte de la mission est requis.'),
    })
    .optional(),
  vision: z
    .object({
      title: z.string().trim().min(1, 'Le titre de la vision est requis.'),
      body: z.string().trim().min(1, 'Le texte de la vision est requis.'),
    })
    .optional(),
  why_choose: z
    .object({
      heading: z.string().trim().min(1, 'Le titre « Pourquoi nous choisir » est requis.'),
      intro: z.string().trim().min(1, "L'intro « Pourquoi nous choisir » est requise."),
      bullets: z.array(z.string().trim().min(1)).default([]),
    })
    .optional(),
  ceo_message: z
    .object({ quote: z.string().trim().min(1, 'La citation du dirigeant est requise.') })
    .optional(),
})

export async function updateSettings(payload: unknown): Promise<ActionResult> {
  const auth = await getAdminClient()
  if ('error' in auth) return { ok: false, error: auth.error }

  const parsed = settingsSchema.safeParse(payload)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Données invalides.' }
  }

  const rows: { key: string; value: unknown }[] = [
    { key: 'company', value: parsed.data.company },
    { key: 'hours', value: parsed.data.hours },
  ]
  if (parsed.data.mission) rows.push({ key: 'mission', value: parsed.data.mission })
  if (parsed.data.vision) rows.push({ key: 'vision', value: parsed.data.vision })
  if (parsed.data.why_choose) rows.push({ key: 'why_choose', value: parsed.data.why_choose })
  if (parsed.data.ceo_message) rows.push({ key: 'ceo_message', value: parsed.data.ceo_message })

  const { error } = await auth.supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
  if (error) return { ok: false, error: 'Enregistrement impossible.' }

  // Ces blocs apparaissent sur l'accueil, à propos et réalisations : tout revalider.
  revalidatePath('/', 'layout')
  return { ok: true }
}

// --- Session ---------------------------------------------------------------

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
