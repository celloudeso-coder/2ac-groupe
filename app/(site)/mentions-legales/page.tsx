import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et conditions générales d\'utilisation du site 2AC GROUPE.',
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.2ac-gn.com'
  return (
    <article className="section-padding bg-background" aria-labelledby="legal-heading">
      <div className="container-base max-w-3xl">
        <h1 id="legal-heading" className="font-display text-3xl font-extrabold text-ink md:text-4xl">
          Mentions légales
        </h1>
        <p className="mt-2 text-sm text-faint">Dernière mise à jour : janvier 2025</p>

        <div className="prose-2ac mt-8">
          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site web ({siteUrl}) est édité par :<br />
            <strong>{SITE_CONFIG.name}</strong> — nom commercial<br />
            Raison sociale : {SITE_CONFIG.legalName}<br />
            Forme juridique : Société à Responsabilité Limitée (SARL)<br />
            Siège social : {SITE_CONFIG.address}<br />
            Téléphone : {SITE_CONFIG.phones[0]}<br />
            Email : {SITE_CONFIG.emails[0]}<br />
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>Le Directeur Général de {SITE_CONFIG.legalName} est responsable de la publication du présent site.</p>

          <h2>3. Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de {SITE_CONFIG.legalName} ({SITE_CONFIG.name}), sauf mentions contraires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès et écrit de {SITE_CONFIG.legalName}.
          </p>

          <h2>5. Limitation de responsabilité</h2>
          <p>
            {SITE_CONFIG.legalName} s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires.
          </p>
          <p>
            {SITE_CONFIG.legalName} ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. Vous pouvez paramétrer vos préférences via la bannière de consentement affichée lors de votre première visite. Pour plus d'informations, consultez notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit de la République de Guinée. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Conakry.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, contactez-nous à :<br />
            Email : {SITE_CONFIG.emails[0]}<br />
            Téléphone : {SITE_CONFIG.phones[0]}
          </p>
        </div>
      </div>
    </article>
  )
}
