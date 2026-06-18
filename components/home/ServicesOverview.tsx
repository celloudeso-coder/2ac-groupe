import Link from 'next/link'
import { Building2, Store, Truck, Globe, Lightbulb, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import LiquidBackground from '@/components/ui/LiquidBackground'
import { getServices } from '@/lib/content'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  store: Store,
  truck: Truck,
  globe: Globe,
  lightbulb: Lightbulb,
}

export default async function ServicesOverview() {
  const services = await getServices()
  return (
    <section className="relative overflow-hidden section-padding bg-surface" aria-labelledby="services-heading">
      <LiquidBackground density="subtle" className="opacity-60" />
      <div className="container-base relative z-10">
        <SectionHeader
          id="services-heading"
          eyebrow="Nos domaines"
          title="5 secteurs, une seule adresse"
          description="De la construction neuve à la logistique internationale, nous couvrons l'ensemble de vos besoins avec la même rigueur et le même professionnalisme."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon ?? ''] ?? Building2
            return (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group card-glass hover-glow flex h-full flex-col p-6"
                  aria-label={`En savoir plus sur ${service.title}`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short_desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}

          {/* CTA card */}
          <ScrollReveal delay={services.length * 80}>
            <div className="card-glass glass--brand flex h-full flex-col items-center justify-center p-6 text-center">
              <p className="font-display text-lg font-bold text-ink">Un projet en tête ?</p>
              <p className="mt-2 text-sm text-muted">Contactez-nous pour un devis gratuit et personnalisé.</p>
              <Link href="/contact#devis" className="btn-brand mt-5 px-6 py-2.5 text-sm">
                Demander un devis
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
