export type ContentStatus = 'draft' | 'published' | 'archived'
export type SubmissionType = 'contact' | 'devis'
export type SubmissionStatus = 'new' | 'in_progress' | 'closed'

export interface Service {
  id: string
  slug: string
  title: string
  short_desc: string | null
  body: string | null
  icon: string | null
  engagements: string[]
  prestations: string[]
  cover_image: string | null
  sort_order: number
  status: ContentStatus
  created_at: string
  updated_at: string
  // --- Structure de groupe (pôles, migration 005) — tous optionnels ---
  brand_name?: string | null
  logo_url?: string | null
  accent_color?: string | null
  tagline?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  website_url?: string | null
}

export interface Project {
  id: string
  slug: string
  title: string
  service_id: string | null
  description: string | null
  location: string | null
  images: string[]
  cover_image: string | null
  project_date: string | null
  featured: boolean
  sort_order: number
  status: ContentStatus
  created_at: string
  updated_at: string
  service?: Pick<Service, 'slug' | 'title' | 'icon'>
}

export interface Testimonial {
  id: string
  author_name: string
  company: string | null
  content: string
  rating: number | null
  avatar_url: string | null
  sort_order: number
  status: ContentStatus
  created_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body: string | null
  cover_image: string | null
  author: string | null
  categories: string[]
  status: ContentStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  full_name: string
  role: string | null
  bio: string | null
  photo_url: string | null
  is_ceo: boolean
  sort_order: number
  status: ContentStatus
  created_at: string
}

export interface ContactSubmission {
  id?: string
  type: SubmissionType
  full_name: string
  email: string
  phone?: string
  subject?: string
  message: string
  consent: boolean
  status?: SubmissionStatus
}

export interface SiteSettings {
  company: {
    name: string
    legalName?: string
    tagline: string
    address: string
    phones: string[]
    emails: string[]
    years_experience: number
  }
  hours: {
    mon_fri: string
    sat: string
    sun: string
  }
  legal?: {
    legalName: string
    rccm: string
    capital: string
    gerant: string
    cogerante?: string
    address: string
  }
}
