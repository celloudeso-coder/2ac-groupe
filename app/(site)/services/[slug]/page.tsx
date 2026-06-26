import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Building2, Store, Truck, Globe, Lightbulb, Sparkles, TrainFront, Phone, Mail } from 'lucide-react'
import CtaBanner from '@/components/home/CtaBanner'
import LiquidBackground from '@/components/ui/LiquidBackground'
import { SITE_CONFIG } from '@/lib/data'
import { getServiceBySlug, getServices } from '@/lib/content'
import { accentForText } from '@/lib/color'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  store: Store,
  truck: Truck,
  globe: Globe,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  'train-front': TrainFront,
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
    title: service.brand_name ?? service.title,
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

  // Couleur d'accent du pôle : brute pour les aplats, variante AA pour le texte.
  const accent = service.accent_color || '#E53323'
  const accentText = accentForText(accent)
  const hasPoleContact = Boolean(service.contact_email || service.contact_phone || service.website_url)

  return (
    <div
      style={
        { '--pole-accent': accent, '--pole-accent-text': accentText } as React.CSSProperties
      }
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28" aria-labelledby="service-heading">
        <LiquidBackground density="subtle" className="opacity-70" />
        <div className="container-base relative z-10">
          <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-ink">Accueil</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-ink">Nos pôles</Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{service.brand_name ?? service.title}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Texte (gauche) */}
            <div>
              {/* Logo/icône inline — visible sur mobile uniquement */}
              <div className="mb-5 lg:hidden">
                {service.logo_url ? (
                  <Image
                    src={service.logo_url}
                    alt={service.brand_name ?? service.title}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-2xl object-contain"
                  />
                ) : (
                  <div
                    className="glass flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ color: 'var(--pole-accent-text)' }}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                )}
              </div>
              {service.brand_name && service.brand_name !== service.title && (
                <p
                  className="mb-1 text-sm font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--pole-accent-text)' }}
                >
                  {service.brand_name}
                </p>
              )}
              <h1 id="service-heading" className="font-display text-3xl font-extrabold text-balance text-ink md:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              {service.tagline && <p className="mt-3 text-base font-medium text-ink/80">{service.tagline}</p>}
              <p className="mt-3 text-lg text-muted">{service.short_desc}</p>
            </div>

            {/* Panneau visuel (droite) — desktop uniquement */}
            <div className="relative hidden lg:flex lg:justify-center">
              {/* Halo d'accent discret (statique, sans animation) */}
              <div
                className="pointer-events-none absolute inset-0 -z-0 blur-3xl"
                style={{
                  background:
                    'radial-gradient(closest-side, var(--pole-accent) 0%, transparent 75%)',
                  opacity: 0.18,
                }}
                aria-hidden
              />
              <div
                className={`card-glass glass-edge relative flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden ${
                  service.logo_url || !service.cover_image ? 'p-10' : ''
                }`}
              >
                {service.logo_url ? (
                  <Image
                    src={service.logo_url}
                    alt={service.brand_name ?? service.title}
                    width={420}
                    height={280}
                    className="max-h-44 w-auto object-contain"
                  />
                ) : service.cover_image ? (
                  <Image
                    src={service.cover_image}
                    alt={service.brand_name ?? service.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span style={{ color: 'var(--pole-accent-text)' }} aria-hidden>
                    <Icon className="h-32 w-32 opacity-90" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-base">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {service.body && (
                <div
                  className="prose-2ac"
                  dangerouslySetInnerHTML={{ __html: service.body }}
                />
              )}

              {/* Prestations */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-ink">Nos prestations</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
                  {service.prestations.map((p) => (
                    <li key={p} className="card-glass flex items-start gap-3 p-4">
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: 'var(--pole-accent-text)' }}
                        aria-hidden
                      />
                      <span className="text-sm text-ink/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Engagements */}
              <div className="card-glass p-6">
                <h3 className="font-display text-lg font-bold text-ink">Nos engagements</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {service.engagements.map((e) => (
                    <li key={e} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: 'var(--pole-accent-text)' }}
                        aria-hidden
                      />
                      <span className="text-sm text-muted">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact propre du pôle (ex. Ferrorail) */}
              {hasPoleContact && (
                <div className="card-glass p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Contact {service.brand_name ?? 'du pôle'}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm" role="list">
                    {service.contact_phone && (
                      <li className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 shrink-0" style={{ color: 'var(--pole-accent-text)' }} aria-hidden />
                        <a href={`tel:${service.contact_phone.replace(/\s/g, '')}`} className="text-muted hover:text-ink">
                          {service.contact_phone}
                        </a>
                      </li>
                    )}
                    {service.contact_email && (
                      <li className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 shrink-0" style={{ color: 'var(--pole-accent-text)' }} aria-hidden />
                        <a href={`mailto:${service.contact_email}`} className="break-all text-muted hover:text-ink">
                          {service.contact_email}
                        </a>
                      </li>
                    )}
                    {service.website_url && (
                      <li className="flex items-center gap-2.5">
                        <Globe className="h-4 w-4 shrink-0" style={{ color: 'var(--pole-accent-text)' }} aria-hidden />
                        <a
                          href={service.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-muted hover:text-ink"
                        >
                          {service.website_url.replace(/^https?:\/\//, '')}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="card-glass glass--brand p-6">
                <h3 className="font-display text-lg font-bold text-ink">Un projet ?</h3>
                <p className="mt-2 text-sm text-muted">Obtenez un devis gratuit et personnalisé sous 24h.</p>
                <Link href="/contact#devis" className="btn-brand mt-4 w-full justify-center py-3">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`}
                  className="btn-outline mt-3 w-full justify-center py-2.5 text-sm"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE_CONFIG.phones[0]}
                </a>
              </div>

              {/* Autres pôles */}
              {otherServices.length > 0 && (
                <div className="card-glass p-6">
                  <h3 className="mb-3 font-display text-sm font-bold text-ink">Nos autres pôles</h3>
                  <ul className="space-y-2" role="list">
                    {otherServices.map((s) => {
                      const OtherIcon = ICONS[s.icon ?? ''] ?? Building2
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                          >
                            <OtherIcon className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                            {s.brand_name ?? s.title}
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
    </div>
  )
}
