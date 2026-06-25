import { z } from 'zod'

/**
 * Configuration déclarative du back-office.
 *
 * Chaque entité décrit ses champs une seule fois ; les formulaires (client),
 * la validation (zod, client + serveur) et les listes en sont dérivés. Aucun
 * couplage en dur : ajouter un champ = l'ajouter ici.
 */

export type FieldType =
  | 'text'
  | 'slug'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'date'
  | 'datetime'
  | 'select'
  | 'toggle'
  | 'tags'
  | 'image'

export interface FieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  help?: string
  options?: { value: string; label: string }[]
  bucket?: string
  /** Champ source pour générer le slug automatiquement. */
  slugFrom?: string
  min?: number
  max?: number
  integer?: boolean
  colSpan?: 1 | 2
}

export interface ListColumn {
  key: string
  label: string
  type?: 'text' | 'status' | 'boolean' | 'date' | 'image'
}

export interface EntityConfig {
  key: string
  table: string
  labelSingular: string
  labelPlural: string
  fields: FieldDef[]
  listColumns: ListColumn[]
  orderBy: { column: string; ascending: boolean }
  /** Bucket de stockage par défaut (pour les images). */
  bucket?: string
  /** Chemins publics à revalider après mutation. */
  revalidate: string[]
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
  { value: 'archived', label: 'Archivé' },
]

const ICON_OPTIONS = [
  { value: 'building-2', label: 'Bâtiment (BTP)' },
  { value: 'store', label: 'Magasin (Commerce / PLANÈTE)' },
  { value: 'truck', label: 'Camion (2AC TRANSIT)' },
  { value: 'sparkles', label: 'Étincelles (CleanTech)' },
  { value: 'train-front', label: 'Train (Ferrorail)' },
  { value: 'globe', label: 'Globe (Import-Export)' },
  { value: 'lightbulb', label: 'Ampoule (Conseil)' },
]

export const ENTITIES: Record<string, EntityConfig> = {
  services: {
    key: 'services',
    table: 'services',
    labelSingular: 'Service',
    labelPlural: 'Services',
    bucket: 'projects',
    revalidate: ['/', '/services'],
    orderBy: { column: 'sort_order', ascending: true },
    listColumns: [
      { key: 'title', label: 'Titre' },
      { key: 'sort_order', label: 'Ordre' },
      { key: 'status', label: 'Statut', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, colSpan: 2 },
      { name: 'slug', label: 'Slug (URL)', type: 'slug', required: true, slugFrom: 'title', help: 'Identifiant dans l’URL, ex : btp' },
      { name: 'brand_name', label: 'Nom de marque du pôle', type: 'text', help: 'ex : PLANÈTE Carrelages & Finitions. Vide = nom 2AC.' },
      { name: 'tagline', label: 'Slogan du pôle', type: 'text' },
      { name: 'icon', label: 'Icône', type: 'select', options: ICON_OPTIONS },
      { name: 'accent_color', label: 'Couleur d’accent (hex)', type: 'text', placeholder: '#1E3A8A', help: 'Couleur de marque du pôle. Vide = rouge 2AC (#E53323).' },
      { name: 'logo_url', label: 'Logo du pôle', type: 'image', bucket: 'brand' },
      { name: 'contact_email', label: 'Email propre au pôle (optionnel)', type: 'text', help: 'Affiche un bloc « Contact du pôle ».' },
      { name: 'contact_phone', label: 'Téléphone propre au pôle (optionnel)', type: 'text' },
      { name: 'website_url', label: 'Site web du pôle (optionnel)', type: 'text', placeholder: 'https://…' },
      { name: 'short_desc', label: 'Description courte', type: 'textarea', colSpan: 2, help: 'Résumé affiché sur les cartes.' },
      { name: 'body', label: 'Contenu détaillé', type: 'richtext', colSpan: 2 },
      { name: 'prestations', label: 'Prestations', type: 'tags', colSpan: 2, help: 'Une prestation par ligne.' },
      { name: 'engagements', label: 'Engagements', type: 'tags', colSpan: 2, help: 'Un engagement par ligne.' },
      { name: 'cover_image', label: 'Image de couverture', type: 'image', bucket: 'projects' },
      { name: 'sort_order', label: 'Ordre d’affichage', type: 'number', integer: true, min: 0 },
      { name: 'status', label: 'Statut', type: 'select', required: true, options: STATUS_OPTIONS },
    ],
  },

  realisations: {
    key: 'realisations',
    table: 'projects',
    labelSingular: 'Réalisation',
    labelPlural: 'Réalisations',
    bucket: 'projects',
    revalidate: ['/', '/realisations'],
    orderBy: { column: 'sort_order', ascending: true },
    listColumns: [
      { key: 'cover_image', label: '', type: 'image' },
      { key: 'title', label: 'Projet' },
      { key: 'location', label: 'Localisation' },
      { key: 'featured', label: 'À la une', type: 'boolean' },
      { key: 'status', label: 'Statut', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Titre du projet', type: 'text', required: true, colSpan: 2 },
      { name: 'slug', label: 'Slug (URL)', type: 'slug', required: true, slugFrom: 'title' },
      { name: 'location', label: 'Localisation', type: 'text', placeholder: 'Lambanyi, Conakry' },
      { name: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
      { name: 'cover_image', label: 'Image de couverture', type: 'image', bucket: 'projects' },
      { name: 'images', label: 'Galerie d’images', type: 'tags', colSpan: 2, help: 'URLs d’images (une par ligne). Utilisez le bouton d’upload pour en ajouter.' },
      { name: 'project_date', label: 'Date du projet', type: 'date' },
      { name: 'sort_order', label: 'Ordre', type: 'number', integer: true, min: 0 },
      { name: 'featured', label: 'Mettre à la une (page d’accueil)', type: 'toggle', colSpan: 2 },
      { name: 'status', label: 'Statut', type: 'select', required: true, options: STATUS_OPTIONS },
    ],
  },

  blog: {
    key: 'blog',
    table: 'blog_posts',
    labelSingular: 'Article',
    labelPlural: 'Articles',
    bucket: 'blog',
    revalidate: ['/', '/blog'],
    orderBy: { column: 'published_at', ascending: false },
    listColumns: [
      { key: 'cover_image', label: '', type: 'image' },
      { key: 'title', label: 'Titre' },
      { key: 'author', label: 'Auteur' },
      { key: 'published_at', label: 'Publié le', type: 'date' },
      { key: 'status', label: 'Statut', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, colSpan: 2 },
      { name: 'slug', label: 'Slug (URL)', type: 'slug', required: true, slugFrom: 'title' },
      { name: 'author', label: 'Auteur', type: 'text', placeholder: 'Équipe 2AC GROUPE' },
      { name: 'excerpt', label: 'Résumé', type: 'textarea', colSpan: 2, help: 'Court extrait affiché dans la liste.' },
      { name: 'body', label: 'Contenu de l’article', type: 'richtext', colSpan: 2 },
      { name: 'categories', label: 'Catégories', type: 'tags', colSpan: 2, help: 'Ex : BTP, Logistique…' },
      { name: 'cover_image', label: 'Image de couverture', type: 'image', bucket: 'blog' },
      { name: 'published_at', label: 'Date de publication', type: 'datetime' },
      { name: 'status', label: 'Statut', type: 'select', required: true, options: STATUS_OPTIONS },
    ],
  },

  temoignages: {
    key: 'temoignages',
    table: 'testimonials',
    labelSingular: 'Témoignage',
    labelPlural: 'Témoignages',
    bucket: 'team',
    revalidate: ['/'],
    orderBy: { column: 'sort_order', ascending: true },
    listColumns: [
      { key: 'avatar_url', label: '', type: 'image' },
      { key: 'author_name', label: 'Auteur' },
      { key: 'company', label: 'Entreprise' },
      { key: 'rating', label: 'Note' },
      { key: 'status', label: 'Statut', type: 'status' },
    ],
    fields: [
      { name: 'author_name', label: 'Nom de l’auteur', type: 'text', required: true },
      { name: 'company', label: 'Entreprise / fonction', type: 'text' },
      { name: 'content', label: 'Témoignage', type: 'textarea', required: true, colSpan: 2 },
      { name: 'rating', label: 'Note (1 à 5)', type: 'number', integer: true, min: 1, max: 5 },
      { name: 'avatar_url', label: 'Photo / avatar', type: 'image', bucket: 'team' },
      { name: 'sort_order', label: 'Ordre', type: 'number', integer: true, min: 0 },
      { name: 'status', label: 'Statut', type: 'select', required: true, options: STATUS_OPTIONS },
    ],
  },

  equipe: {
    key: 'equipe',
    table: 'team_members',
    labelSingular: 'Membre de l’équipe',
    labelPlural: 'Équipe',
    bucket: 'team',
    revalidate: ['/a-propos'],
    orderBy: { column: 'sort_order', ascending: true },
    listColumns: [
      { key: 'photo_url', label: '', type: 'image' },
      { key: 'full_name', label: 'Nom' },
      { key: 'role', label: 'Fonction' },
      { key: 'is_ceo', label: 'Dirigeant', type: 'boolean' },
      { key: 'status', label: 'Statut', type: 'status' },
    ],
    fields: [
      { name: 'full_name', label: 'Nom complet', type: 'text', required: true },
      { name: 'role', label: 'Fonction', type: 'text', placeholder: 'Directeur Général' },
      { name: 'bio', label: 'Biographie / mot', type: 'textarea', colSpan: 2 },
      { name: 'photo_url', label: 'Photo', type: 'image', bucket: 'team' },
      { name: 'is_ceo', label: 'Dirigeant (affiche le « mot du dirigeant »)', type: 'toggle', colSpan: 2 },
      { name: 'sort_order', label: 'Ordre', type: 'number', integer: true, min: 0 },
      { name: 'status', label: 'Statut', type: 'select', required: true, options: STATUS_OPTIONS },
    ],
  },
}

export function getEntity(key: string): EntityConfig | null {
  return ENTITIES[key] ?? null
}

// --- Construction du schéma zod à partir des champs -----------------------

function fieldToZod(f: FieldDef): z.ZodTypeAny {
  switch (f.type) {
    case 'number': {
      let base = z.coerce.number({ invalid_type_error: `${f.label} doit être un nombre.` })
      if (f.integer) base = base.int(`${f.label} doit être un entier.`)
      if (typeof f.min === 'number') base = base.min(f.min, `${f.label} : minimum ${f.min}.`)
      if (typeof f.max === 'number') base = base.max(f.max, `${f.label} : maximum ${f.max}.`)
      return f.required ? base : base.nullable().optional()
    }
    case 'toggle':
      return z.coerce.boolean().optional().default(false)
    case 'tags':
      return z.array(z.string().trim().min(1)).optional().default([])
    case 'select': {
      const values = (f.options ?? []).map((o) => o.value) as [string, ...string[]]
      const base = z.enum(values)
      return f.required ? base : base.optional()
    }
    case 'date':
    case 'datetime': {
      const base = z.string().trim()
      return f.required
        ? base.min(1, `${f.label} est requis.`)
        : base.optional().nullable()
    }
    default: {
      const base = z.string().trim()
      return f.required ? base.min(1, `${f.label} est requis.`) : base.optional().nullable()
    }
  }
}

export function buildSchema(config: EntityConfig): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {}
  for (const f of config.fields) shape[f.name] = fieldToZod(f)
  return z.object(shape)
}

/** Normalise la sortie validée : '' → null pour les champs texte/date optionnels. */
export function normalizePayload(
  config: EntityConfig,
  data: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of config.fields) {
    let v = data[f.name]
    if ((f.type === 'text' || f.type === 'slug' || f.type === 'textarea' || f.type === 'richtext' || f.type === 'date' || f.type === 'datetime' || f.type === 'image') && (v === '' || v === undefined)) {
      v = null
    }
    if (f.type === 'number' && (v === undefined || Number.isNaN(v as number))) v = null
    out[f.name] = v
  }
  return out
}
