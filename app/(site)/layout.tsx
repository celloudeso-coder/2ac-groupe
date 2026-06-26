import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import { getSiteSettings } from '@/lib/content'

/** Layout du site public : en-tête, contenu, pied de page, bannière cookies. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Header phone={settings.company.phones[0]} hours={settings.hours} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
