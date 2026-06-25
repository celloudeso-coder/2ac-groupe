import Link from 'next/link'
import { ArrowRight, Building2, Store, Truck, Globe, Lightbulb, Sparkles, TrainFront } from 'lucide-react'
import type { Service } from '@/lib/types'
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
  service: Pick<Service, 'slug' | 'title' | 'short_desc' | 'icon' | 'engagements' | 'brand_name' | 'accent_color'>
  compact?: boolean
}

export default function ServiceCard({ service, compact = false }: Props) {
  const Icon = ICONS[service.icon ?? ''] ?? Building2
  const accentText = accentForText(service.accent_color || '#E53323')

  if (compact) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group card-glass hover-glow flex items-start gap-4 p-5"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-sm font-bold text-ink">{service.title}</h3>
          <p className="mt-1 text-xs text-muted line-clamp-2">{service.short_desc}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
      </Link>
    )
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group card-glass hover-glow flex h-full flex-col p-6"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5"
        style={{ color: accentText }}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      {service.brand_name && service.brand_name !== service.title && (
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: accentText }}>
          {service.brand_name}
        </p>
      )}
      <h3 className="mt-0.5 font-display text-lg font-bold text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short_desc}</p>
      {service.engagements.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {service.engagements.slice(0, 3).map((e) => (
            <li key={e} className="flex items-center gap-2 text-xs text-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accentText }} aria-hidden />
              {e}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand">
        Découvrir
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </div>
    </Link>
  )
}
