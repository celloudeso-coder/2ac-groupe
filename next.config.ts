import type { NextConfig } from 'next'

/**
 * Redirections 301 des anciennes URLs (site LWS) → nouvelles URLs.
 *
 * ⚠️ À CONFIRMER AVANT MISE EN LIGNE : les `source` ci-dessous sont des
 * hypothèses basées sur la structure annoncée (/domaines/..., /blog-detail/ID).
 * Remplacez-les par les VRAIES anciennes URLs (relevez-les dans l'ancien
 * sitemap.xml ou la Search Console). Un 301 erroné est permanent et mis en
 * cache par Google : ne déployez ces règles qu'une fois la liste validée.
 *
 * `permanent: true` = 301 (transfère le « jus SEO »).
 */
const LEGACY_REDIRECTS: { source: string; destination: string; permanent: boolean }[] = [
  // --- Pages de domaines/services ---
  { source: '/domaines/btp', destination: '/services/btp', permanent: true },
  { source: '/domaines/batiment-travaux-publics', destination: '/services/btp', permanent: true },
  { source: '/domaines/commerce-general', destination: '/services/commerce-general', permanent: true },
  { source: '/domaines/commerce', destination: '/services/commerce-general', permanent: true },
  { source: '/domaines/logistique', destination: '/services/logistique-transport', permanent: true },
  { source: '/domaines/logistique-transport', destination: '/services/logistique-transport', permanent: true },
  { source: '/domaines/import-export', destination: '/services/import-export', permanent: true },
  { source: '/domaines/conseil', destination: '/services/conseil', permanent: true },

  // --- Articles de blog ---
  // Idéal : une règle 1:1 par ancien ID → nouveau slug (meilleur pour le SEO).
  // Exemple à compléter avec la correspondance réelle ID → slug :
  // { source: '/blog-detail/12', destination: '/blog/5-criteres-pour-choisir-vos-carreaux', permanent: true },

  // --- Pages génériques éventuelles ---
  { source: '/accueil', destination: '/', permanent: true },
  { source: '/a-propos-de-nous', destination: '/a-propos', permanent: true },
  { source: '/nos-services', destination: '/services', permanent: true },
  { source: '/nos-realisations', destination: '/realisations', permanent: true },
  { source: '/nous-contacter', destination: '/contact', permanent: true },
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
    return [
      ...LEGACY_REDIRECTS,
      // Filet de sécurité : tout ancien lien d'article non mappé 1:1 ci-dessus
      // est renvoyé vers l'index du blog plutôt que de tomber en 404.
      // `permanent: false` (302) volontaire : à remplacer par des 301 1:1
      // quand la correspondance ID → slug est connue.
      { source: '/blog-detail/:id', destination: '/blog', permanent: false },
    ]
  },
}

export default nextConfig
