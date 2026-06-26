import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'
import { getSiteSettings } from '@/lib/content'
import Logo from '@/components/ui/Logo'

const SERVICES_LINKS = [
  { label: 'BTP & Construction', href: '/services/btp' },
  { label: 'PLANÈTE — Carrelages & Finitions', href: '/services/commerce-general' },
  { label: '2AC TRANSIT', href: '/services/2ac-transit' },
  { label: '2AC CleanTech', href: '/services/cleantech' },
  { label: 'Ferrorail (FRS)', href: '/services/ferrorail' },
]

const COMPANY_LINKS = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Nos réalisations', href: '/realisations' },
  { label: 'Blog & Actualités', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Demander un devis', href: '/contact#devis' },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
]

export default async function Footer() {
  const year = new Date().getFullYear()
  const settings = await getSiteSettings()
  const c = settings.company
  const hours = settings.hours

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface text-ink" aria-label="Pied de page">
      {/* Liseré rouge supérieur */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" aria-hidden />

      <div className="container-base py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="2AC GROUPE — Accueil">
              <Logo height={40} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {c.tagline}. Votre partenaire de confiance au service de vos projets depuis plus de 10 ans en Guinée.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={SITE_CONFIG.social.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink/5 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <Facebook className="h-4 w-4" aria-hidden />
              </a>
              <a href={SITE_CONFIG.social.linkedin} aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink/5 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink/5 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-brand">Nos services</h3>
            <ul className="space-y-3" role="list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-brand">Entreprise</h3>
            <ul className="space-y-3" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-brand">Contact</h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span className="text-sm text-muted">{c.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                <a href={`tel:${c.phones[0].replace(/\s/g, '')}`} className="text-sm text-muted transition-colors hover:text-ink">
                  {c.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                <a href={`mailto:${c.emails[0]}`} className="text-sm text-muted transition-colors hover:text-ink">
                  {c.emails[0]}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <div className="text-sm text-muted">
                  <p>Lun–Ven : {hours.mon_fri}</p>
                  <p>Samedi : {hours.sat}</p>
                  <p>Dimanche : {hours.sun}</p>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="container-base flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} {c.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-faint transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-faint">
            Développé par{' '}
            <a href="#" className="text-muted transition-colors hover:text-ink">
              LynxaTech (LYNXA SARL)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
