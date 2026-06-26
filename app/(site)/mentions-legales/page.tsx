import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et conditions générales d\'utilisation du site 2AC GROUPE.',
  robots: { index: false },
}

export const revalidate = 60

export default async function MentionsLegalesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.2ac-gn.com'
  const settings = await getSiteSettings()
  const c = settings.company
  const legal = settings.legal!
  return (
    <article className="section-padding bg-background" aria-labelledby="legal-heading">
      <div className="container-base max-w-3xl">
        <h1 id="legal-heading" className="font-display text-3xl font-extrabold text-ink md:text-4xl">
          Mentions légales
        </h1>
        <p className="mt-2 text-sm text-faint">Dernière mise à jour : juin 2026</p>

        <div className="prose-2ac mt-8">
          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site web ({siteUrl}) est édité par :<br />
            <strong>{c.name}</strong> — nom commercial<br />
            Raison sociale : {legal.legalName}<br />
            Forme juridique : Société à Responsabilité Limitée (SARL)<br />
            RCCM : {legal.rccm}<br />
            Capital social : {legal.capital}<br />
            Gérant : {legal.gerant} · Co-gérante : {legal.cogerante}<br />
            Siège social : {legal.address}<br />
            Téléphone : {c.phones[0]}<br />
            Email : {c.emails[0]}<br />
          </p>

          <h2>2. Structure du groupe & marques</h2>
          <p>
            {c.name} est un groupe multisectoriel organisé en pôles, exploités sous les marques
            suivantes : <strong>2AC BTP</strong> (bâtiment & travaux publics),{' '}
            <strong>PLANÈTE Carrelages & Finitions</strong> (commerce de matériaux),{' '}
            <strong>2AC TRANSIT</strong> (transport & logistique) et{' '}
            <strong>2AC CleanTech</strong> (nettoyage & assainissement).{' '}
            <strong>Ferrorail Service Guinée (FRS)</strong> est une entité technique affiliée
            (ingénierie ferroviaire & énergie), disposant de ses propres coordonnées.
          </p>

          <h2>3. Directeur de la publication</h2>
          <p>
            Le Directeur de la publication est M. {legal.gerant}, Gérant de{' '}
            {legal.legalName}.
          </p>

          <h2>4. Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de {legal.legalName} ({c.name}), sauf mentions contraires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès et écrit de {legal.legalName}.
          </p>

          <h2>6. Limitation de responsabilité</h2>
          <p>
            {legal.legalName} s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires.
          </p>
          <p>
            {legal.legalName} ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. Vous pouvez paramétrer vos préférences via la bannière de consentement affichée lors de votre première visite. Pour plus d'informations, consultez notre{' '}
            <a href="/politique-confidentialite">Politique de confidentialité</a>.
          </p>

          <h2>8. Droit applicable</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit de la République de Guinée. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Conakry.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, contactez-nous à :<br />
            Email : {c.emails[0]}<br />
            Téléphone : {c.phones[0]}
          </p>
        </div>
      </div>
    </article>
  )
}
