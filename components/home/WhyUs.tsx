import { Zap, Shield, Handshake, Layers } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { COMPANY_VALUES } from '@/lib/data'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Shield,
  Handshake,
  Layers,
}

export default function WhyUs() {
  return (
    <section className="section-padding bg-background" aria-labelledby="why-heading">
      <div className="container-base">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              Pourquoi nous choisir
            </p>
            <h2 id="why-heading" className="font-display text-3xl font-extrabold text-ink md:text-4xl text-balance">
              Une entreprise guinéenne aux standards internationaux
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              2AC GROUPE est née de la conviction que la Guinée mérite des partenaires commerciaux qui combinent ancrage local, expertise métier et exigences de niveau international. Notre force réside dans notre capacité à intervenir de bout en bout : sourcing à l&apos;étranger, import, construction, finition, livraison.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Interlocuteur unique pour des besoins multiples',
                'Équipe expérimentée et disponible',
                'Réseau de partenaires certifiés en Europe et aux USA',
                'Transparence totale sur les coûts et les délais',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-ink/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: values grid */}
          <div className="grid grid-cols-2 gap-4">
            {COMPANY_VALUES.map((value, i) => {
              const Icon = ICONS[value.icon]
              return (
                <ScrollReveal key={value.title} delay={i * 100}>
                  <div className="card-glass hover-glow h-full p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-sm font-bold text-ink">{value.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{value.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
