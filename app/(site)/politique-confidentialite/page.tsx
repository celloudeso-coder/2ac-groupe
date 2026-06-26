import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et de protection des données personnelles de 2AC GROUPE.',
  robots: { index: false },
}

export const revalidate = 60

export default async function PolitiqueConfidentialitePage() {
  const { company: c } = await getSiteSettings()
  return (
    <article className="section-padding bg-background" aria-labelledby="privacy-heading">
      <div className="container-base max-w-3xl">
        <h1 id="privacy-heading" className="font-display text-3xl font-extrabold text-ink md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-2 text-sm text-faint">Dernière mise à jour : janvier 2025</p>

        <div className="prose-2ac mt-8">
          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement de vos données personnelles est :<br />
            <strong>{c.name}</strong><br />
            {c.address}<br />
            Email : {c.emails[0]}<br />
            Téléphone : {c.phones[0]}
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul>
            <li><strong>Via les formulaires de contact et de devis</strong> : nom, adresse email, numéro de téléphone, sujet de la demande et message.</li>
            <li><strong>Via les cookies</strong> : données de navigation anonymisées (pages visitées, durée de visite) à des fins analytiques uniquement, sous réserve de votre consentement.</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et de devis ;</li>
            <li>Vous envoyer les informations que vous avez sollicitées ;</li>
            <li>Améliorer notre site web (analytics anonymisées) ;</li>
            <li>Respecter nos obligations légales.</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre <strong>consentement explicite</strong> (case à cocher sur les formulaires) et sur l'exécution des mesures précontractuelles prises à votre demande.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Vos données de contact sont conservées pendant <strong>3 ans</strong> à compter de votre dernière prise de contact, puis archivées ou supprimées. Les données analytiques anonymisées sont conservées 26 mois maximum.
          </p>

          <h2>6. Partage des données</h2>
          <p>
            Vos données ne sont pas vendues à des tiers. Elles peuvent être transmises à des prestataires techniques (hébergement, service d'envoi d'emails) dans le strict respect du présent document et uniquement pour l'exécution des finalités décrites.
          </p>

          <h2>7. Vos droits</h2>
          <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie ;</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes ;</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données ;</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données ;</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré.</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : {c.emails[0]}
          </p>

          <h2>8. Cookies</h2>
          <p>
            Ce site utilise les types de cookies suivants :
          </p>
          <ul>
            <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (session, préférences de consentement). Pas de consentement requis.</li>
            <li><strong>Cookies analytiques</strong> : mesure d'audience anonymisée. Nécessitent votre consentement.</li>
          </ul>
          <p>
            Vous pouvez modifier vos préférences à tout moment en effaçant les cookies de votre navigateur ou en contactant notre équipe.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction : connexion HTTPS, chiffrement des données, accès restreint aux données.
          </p>

          <h2>10. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier la présente politique à tout moment. Toute modification sera publiée sur cette page avec mise à jour de la date.
          </p>

          <h2>11. Contact</h2>
          <p>
            Pour toute question relative à la présente politique ou à vos données personnelles :<br />
            Email : {c.emails[0]}<br />
            Téléphone : {c.phones[0]}
          </p>
        </div>
      </div>
    </article>
  )
}
