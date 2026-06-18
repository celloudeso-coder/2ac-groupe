import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Building2, Store, Truck, Globe, Lightbulb, Phone } from 'lucide-react'
import CtaBanner from '@/components/home/CtaBanner'
import { SITE_CONFIG } from '@/lib/data'
import { getServiceBySlug, getServices } from '@/lib/content'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  store: Store,
  truck: Truck,
  globe: Globe,
  lightbulb: Lightbulb,
}

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.short_desc ?? undefined,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const Icon = ICONS[service.icon ?? ''] ?? Building2
  const allServices = await getServices()
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white md:py-28" aria-labelledby="service-heading">
        <div className="container-base">
          <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-accent-300">
              <Icon className="h-8 w-8" aria-hidden />
            </div>
            <div>
              <h1 id="service-heading" className="font-display text-3xl font-extrabold text-balance md:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-slate-300">{service.short_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {service.body && (
                <div
                  className="prose prose-slate prose-headings:font-display prose-headings:text-primary prose-a:text-accent max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.body }}
                />
              )}

              {/* Prestations */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-primary">Nos prestations</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
                  {service.prestations.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-surface p-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                      <span className="text-sm text-slate-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Engagements */}
              <div className="card-base p-6">
                <h3 className="font-display text-lg font-bold text-primary">Nos engagements</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {service.engagements.map((e) => (
                    <li key={e} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="text-sm text-slate-600">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="card-base gradient-primary p-6 text-white">
                <h3 className="font-display text-lg font-bold">Un projet ?</h3>
                <p className="mt-2 text-sm text-slate-300">Obtenez un devis gratuit et personnalisé sous 24h.</p>
                <Link href="/contact#devis" className="btn-accent mt-4 w-full justify-center py-3">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`}
                  className="btn-outline-white mt-3 w-full justify-center py-2.5 text-sm"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE_CONFIG.phones[0]}
                </a>
              </div>

              {/* Other services */}
              {otherServices.length > 0 && (
                <div className="card-base p-6">
                  <h3 className="font-display text-sm font-bold text-primary mb-3">Nos autres services</h3>
                  <ul className="space-y-2" role="list">
                    {otherServices.map((s) => {
                      const OtherIcon = ICONS[s.icon ?? ''] ?? Building2
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-slate-600 transition-colors hover:bg-surface hover:text-primary"
                          >
                            <OtherIcon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                            {s.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
