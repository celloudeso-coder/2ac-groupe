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

  // Pages de domaines/services (slugs réels de l'ancien site)
  { source: '/domaines/batiment-travaux-publics', destination: '/services/btp', permanent: true },
  { source: '/domaines/import-export', destination: '/services/import-export', permanent: true },
  { source: '/domaines/logistique-transport', destination: '/services/logistique-transport', permanent: true },
  { source: '/domaines/commerce-general', destination: '/services/commerce-general', permanent: true },
  // NB : /domaines/conseil n'existait pas sur l'ancien site (pas de page dédiée).

  // Blog : ancien contenu = Lorem Ipsum → redirection globale (aucun article réel)
  { source: '/blog-detail/:id', destination: '/blog', permanent: true },

  // Ancienne connexion abandonnée → accueil. L'admin a son URL dédiée
  // (/admin/login), non liée depuis le site public.
  { source: '/login', destination: '/', permanent: true },
]

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
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
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
