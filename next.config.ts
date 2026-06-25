import type { NextConfig } from 'next'

/**
 * Redirections permanentes des anciennes URLs → nouvelles URLs.
 *
 * Cartographie VÉRIFIÉE sur le site Laravel en production
 * (https://www.2ac-gn.com), juin 2026.
 *
 * `permanent: true` renvoie un 308 (méthode HTTP préservée), traité comme un
 * 301 par Google : le « jus SEO » est transféré. Pour des pages GET, le 308
 * est équivalent au 301 côté référencement.
 *
 * L'ancien blog était intégralement du Lorem Ipsum → redirection globale de
 * `/blog-detail/:id` vers `/blog` (aucun article réel à mapper en 1:1).
 */
const LEGACY_REDIRECTS: { source: string; destination: string; permanent: boolean }[] = [
  // Pages statiques (slugs anglais → français)
  { source: '/about', destination: '/a-propos', permanent: true },
  { source: '/service', destination: '/services', permanent: true },

  // Pages de domaines/services (slugs réels de l'ancien site) → pôles actuels.
  // Redirections DIRECTES vers la cible finale (pas de chaîne).
  { source: '/domaines/batiment-travaux-publics', destination: '/services/btp', permanent: true },
  { source: '/domaines/commerce-general', destination: '/services/commerce-general', permanent: true },
  // NB : /domaines/conseil n'existait pas sur l'ancien site (pas de page dédiée).

  // Rebrand & retraits (structure de groupe — migration 005) :
  //  logistique-transport → 2AC TRANSIT ; import-export & conseil retirés.
  { source: '/services/logistique-transport', destination: '/services/2ac-transit', permanent: true },
  { source: '/domaines/logistique-transport', destination: '/services/2ac-transit', permanent: true },
  { source: '/services/import-export', destination: '/services/2ac-transit', permanent: true },
  { source: '/domaines/import-export', destination: '/services/2ac-transit', permanent: true },
  { source: '/services/conseil', destination: '/services', permanent: true },

  // Blog : ancien contenu = Lorem Ipsum → redirection globale (aucun article réel)
  { source: '/blog-detail/:id', destination: '/blog', permanent: true },

  // Ancienne connexion abandonnée → accueil. L'admin a son URL dédiée
  // (/admin/login), non liée depuis le site public.
  { source: '/login', destination: '/', permanent: true },
]

/**
 * Content-Security-Policy.
 *
 * Cadrée sur les ressources réellement chargées par le site :
 *  - Supabase (API REST/Auth + websocket realtime) en `connect-src` ;
 *  - images Supabase Storage + `data:`/`blob:` (next/image) en `img-src` ;
 *  - iframe Google Maps (page contact) en `frame-src` ;
 *  - polices auto-hébergées par next/font → pas d'origine externe.
 *
 * `'unsafe-inline'` est nécessaire (scripts d'amorçage / payload RSC inline et
 * styles inline de Next/Tailwind, faute de nonce). Cela bloque tout de même le
 * chargement de scripts depuis une origine tierce (principal vecteur XSS).
 * `'unsafe-eval'` est volontairement absent (non requis par Next 15 en prod).
 */
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.supabase.co",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          // Filtre XSS legacy désactivé (recommandation OWASP) : le CSP prend le relais.
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  async redirects() {
    return LEGACY_REDIRECTS
  },
}

export default nextConfig
