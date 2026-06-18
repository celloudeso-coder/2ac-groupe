import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import PageHero from '@/components/ui/PageHero'
import ServiceCard from '@/components/services/ServiceCard'
import CtaBanner from '@/components/home/CtaBanner'
import { getServices } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    'Découvrez les 5 domaines d\'activité de 2AC GROUPE : BTP, commerce de matériaux, logistique internationale, import-export et conseil stratégique à Conakry.',
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <>
      <PageHero
        eyebrow="Nos domaines"
        title="5 secteurs, une seule adresse"
        description="De la construction à la logistique internationale, 2AC GROUPE vous offre un accompagnement complet avec la même exigence et le même professionnalisme."
      />

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
      <section className="section-padding bg-background" aria-labelledby="process-heading">
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
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-xl font-black text-white font-display">
                  {item.step}
                </div>
                <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
