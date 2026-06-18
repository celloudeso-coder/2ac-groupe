import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/services/ServiceCard'
import CtaBanner from '@/components/home/CtaBanner'
import { getServices } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    'Découvrez les 5 domaines d\'activité de 2AC SARL : BTP, commerce de matériaux, logistique internationale, import-export et conseil stratégique à Conakry.',
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white md:py-24" aria-labelledby="services-page-heading">
        <div className="container-base max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">Nos domaines</p>
          <h1 id="services-page-heading" className="font-display text-4xl font-extrabold text-balance md:text-5xl">
            5 secteurs, une seule adresse
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            De la construction à la logistique internationale, 2AC SARL vous offre un accompagnement complet avec la même exigence et le même professionnalisme.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-surface" aria-label="Liste des services">
        <div className="container-base">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white" aria-labelledby="process-heading">
        <div className="container-base">
          <SectionHeader
            eyebrow="Notre approche"
            title="Comment nous travaillons"
            description="Un processus simple, transparent et orienté vers votre satisfaction."
            id="process-heading"
          />
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              { step: '01', title: 'Échange', desc: 'Vous nous décrivez votre besoin — par téléphone, email ou en agence.' },
              { step: '02', title: 'Analyse', desc: 'Nous étudions votre demande et préparons une proposition adaptée.' },
              { step: '03', title: 'Proposition', desc: 'Vous recevez un devis détaillé et transparent sous 24–48 heures.' },
              { step: '04', title: 'Réalisation', desc: 'Nous exécutons dans les délais convenus avec un suivi régulier.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-xl font-black text-white font-display">
                  {item.step}
                </div>
                <h3 className="font-display text-base font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
