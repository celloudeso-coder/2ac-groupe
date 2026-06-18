import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'

const SERVICES_LINKS = [
  { label: 'Bâtiment & Travaux Publics', href: '/services/btp' },
  { label: 'Commerce général', href: '/services/commerce-general' },
  { label: 'Logistique & Transport', href: '/services/logistique-transport' },
  { label: 'Import-Export', href: '/services/import-export' },
  { label: 'Conseil & Services', href: '/services/conseil' },
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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white" aria-label="Pied de page">
      <div className="container-base py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-extrabold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white text-sm font-black">
                2AC
              </span>
              2AC <span className="text-accent-400">SARL</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {SITE_CONFIG.tagline}. Votre partenaire de confiance au service de vos projets depuis plus de 10 ans en Guinée.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={SITE_CONFIG.social.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent">
                <Facebook className="h-4 w-4" aria-hidden />
              </a>
              <a href={SITE_CONFIG.social.linkedin} aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent">
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-accent-400">Nos services</h3>
            <ul className="space-y-3" role="list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-accent-400">Entreprise</h3>
            <ul className="space-y-3" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-accent-400">Contact</h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <span className="text-sm text-slate-400">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <a href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                  {SITE_CONFIG.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <a href={`mailto:${SITE_CONFIG.emails[0]}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                  {SITE_CONFIG.emails[0]}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <div className="text-sm text-slate-400">
                  <p>Lun–Ven : {SITE_CONFIG.hours.mon_fri}</p>
                  <p>Samedi : {SITE_CONFIG.hours.sat}</p>
                  <p>Dimanche : {SITE_CONFIG.hours.sun}</p>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-base flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-600">
            Développé par{' '}
            <a href="#" className="text-slate-500 transition-colors hover:text-slate-300">
              LynxaTech (LYNXA SARL)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
