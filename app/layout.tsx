import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { SITE_CONFIG } from '@/lib/data'
import { getSiteSettings } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.2ac-gn.com'

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteSettings()
  const name = company.name
  const tagline = company.tagline
  const legalName = company.legalName ?? SITE_CONFIG.legalName
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${name} — ${tagline}`,
      template: `%s | ${name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      'BTP Guinée',
      'construction Conakry',
      'carreaux céramique Guinée',
      'logistique internationale Guinée',
      'import export Conakry',
      '2AC GROUPE',
      'Lambanyi',
    ],
    authors: [{ name, url: siteUrl }],
    creator: name,
    openGraph: {
      type: 'website',
      locale: 'fr_GN',
      url: siteUrl,
      siteName: name,
      title: `${name} — ${tagline}`,
      description: SITE_CONFIG.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${tagline}`,
      description: SITE_CONFIG.description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      'schema:LocalBusiness': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name,
        legalName,
        description: SITE_CONFIG.description,
        url: siteUrl,
        telephone: company.phones[0],
        email: company.emails[0],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lambanyi',
          addressLocality: 'Conakry',
          addressCountry: 'GN',
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
        ],
        areaServed: ['GN', 'FR', 'US'],
      }),
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-ink">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
