import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import DevisForm from '@/components/forms/DevisForm'
import { SITE_CONFIG } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact & Devis',
  description:
    'Contactez 2AC SARL pour tout projet BTP, logistique ou import-export. Devis gratuit sous 24h. Bureau à Lambanyi, Conakry.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white md:py-24" aria-labelledby="contact-heading">
        <div className="container-base max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">Nous joindre</p>
          <h1 id="contact-heading" className="font-display text-4xl font-extrabold md:text-5xl">Contact & Devis</h1>
          <p className="mt-5 text-lg text-slate-300">
            Notre équipe vous répond dans les 24 heures ouvrées. Décrivez votre projet et recevez un devis gratuit et personnalisé.
          </p>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="section-padding bg-surface" aria-label="Coordonnées et formulaire de contact">
        <div className="container-base">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Info */}
            <aside className="space-y-6">
              <div className="card-base p-6">
                <h2 className="font-display text-lg font-bold text-primary mb-4">Nos coordonnées</h2>
                <address className="not-italic space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Adresse</p>
                      <p className="text-sm text-slate-700 mt-0.5">{SITE_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <Phone className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Téléphone</p>
                      <a href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`} className="text-sm text-slate-700 hover:text-primary mt-0.5 block">
                        {SITE_CONFIG.phones[0]}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <Mail className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</p>
                      {SITE_CONFIG.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="text-sm text-slate-700 hover:text-primary mt-0.5 block">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <Clock className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Horaires</p>
                      <div className="mt-0.5 text-sm text-slate-700 space-y-0.5">
                        <p>Lun – Ven : {SITE_CONFIG.hours.mon_fri}</p>
                        <p>Samedi : {SITE_CONFIG.hours.sat}</p>
                        <p>Dimanche : {SITE_CONFIG.hours.sun}</p>
                      </div>
                    </div>
                  </div>
                </address>
              </div>

              {/* Map */}
              <div className="card-base overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.5!2d-13.62!3d9.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLambanyi%2C+Conakry%2C+Guin%C3%A9e!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation 2AC SARL — Lambanyi, Conakry"
                  aria-label="Carte Google Maps montrant la localisation de 2AC SARL à Lambanyi, Conakry"
                />
              </div>
            </aside>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-12">
              {/* Contact form */}
              <section aria-labelledby="contact-form-heading" className="card-base p-6 md:p-8">
                <h2 id="contact-form-heading" className="font-display text-xl font-bold text-primary mb-6">
                  Envoyer un message
                </h2>
                <ContactForm />
              </section>

              {/* Devis form */}
              <section id="devis" aria-labelledby="devis-form-heading" className="card-base p-6 md:p-8 border-2 border-accent/20">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 id="devis-form-heading" className="font-display text-xl font-bold text-primary">
                      Demander un devis gratuit
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">Réponse garantie sous 24 heures ouvrées.</p>
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
