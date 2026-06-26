import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, FileText } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import DevisForm from '@/components/forms/DevisForm'
import PageHero from '@/components/ui/PageHero'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact & Devis',
  description:
    'Contactez 2AC GROUPE pour tout projet BTP, logistique ou import-export. Devis gratuit sous 24h. Bureau à Lambanyi, Conakry.',
}

export const revalidate = 60

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const c = settings.company
  const hours = settings.hours
  return (
    <>
      <PageHero
        eyebrow="Nous joindre"
        title="Contact & Devis"
        description="Notre équipe vous répond dans les 24 heures ouvrées. Décrivez votre projet et recevez un devis gratuit et personnalisé."
      />

      {/* Contact info + form */}
      <section className="section-padding bg-background" aria-label="Coordonnées et formulaire de contact">
        <div className="container-base">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Info */}
            <aside className="space-y-6">
              <div className="card-glass p-6">
                <h2 className="mb-4 font-display text-lg font-bold text-ink">Nos coordonnées</h2>
                <address className="not-italic space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-faint">Adresse</p>
                      <p className="mt-0.5 text-sm text-ink/90">{c.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Phone className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-faint">Téléphone</p>
                      <a href={`tel:${c.phones[0].replace(/\s/g, '')}`} className="mt-0.5 block text-sm text-ink/90 hover:text-brand">
                        {c.phones[0]}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Mail className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-faint">Email</p>
                      {c.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="mt-0.5 block text-sm text-ink/90 hover:text-brand">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Clock className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-faint">Horaires</p>
                      <div className="mt-0.5 space-y-0.5 text-sm text-ink/90">
                        <p>Lun – Ven : {hours.mon_fri}</p>
                        <p>Samedi : {hours.sat}</p>
                        <p>Dimanche : {hours.sun}</p>
                      </div>
                    </div>
                  </div>
                </address>
              </div>

              {/* Map */}
              <div className="card-glass overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=9.640300,-13.613934&z=16&hl=fr&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation 2AC GROUPE — Lambanyi, Conakry"
                  aria-label="Carte Google Maps montrant la localisation de 2AC GROUPE à Lambanyi, Conakry"
                />
                <a
                  href="https://maps.google.com/?q=9.640300,-13.613934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-t border-line px-4 py-2.5 text-center text-xs font-medium text-muted transition-colors hover:text-brand"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>
            </aside>

            {/* Forms */}
            <div className="space-y-12 lg:col-span-2">
              {/* Contact form */}
              <section aria-labelledby="contact-form-heading" className="card-glass p-6 md:p-8">
                <h2 id="contact-form-heading" className="mb-6 font-display text-xl font-bold text-ink">
                  Envoyer un message
                </h2>
                <ContactForm />
              </section>

              {/* Devis form */}
              <section id="devis" aria-labelledby="devis-form-heading" className="card-glass glass--brand p-6 md:p-8">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <FileText className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h2 id="devis-form-heading" className="font-display text-xl font-bold text-ink">
                      Demander un devis gratuit
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">Réponse garantie sous 24 heures ouvrées.</p>
                  </div>
                </div>
                <DevisForm />
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
