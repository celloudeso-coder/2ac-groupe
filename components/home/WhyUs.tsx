import { Zap, Shield, Handshake, Layers } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { COMPANY_VALUES } from '@/lib/data'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Shield,
  Handshake,
  Layers,
}

const VALUE_COLORS = [
  'bg-blue-50 text-blue-700',
  'bg-emerald-50 text-emerald-700',
  'bg-amber-50 text-amber-700',
  'bg-violet-50 text-violet-700',
]

export default function WhyUs() {
  return (
    <section className="section-padding bg-white" aria-labelledby="why-heading">
      <div className="container-base">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Pourquoi nous choisir
            </p>
            <h2 id="why-heading" className="font-display text-3xl font-bold text-primary md:text-4xl text-balance">
              Une entreprise guinéenne aux standards internationaux
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              2AC SARL est née de la conviction que la Guinée mérite des partenaires commerciaux qui combinent ancrage local, expertise métier et exigences de niveau international. Notre force réside dans notre capacité à intervenir de bout en bout : sourcing à l'étranger, import, construction, finition, livraison.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Interlocuteur unique pour des besoins multiples",
                "Équipe expérimentée et disponible",
                "Réseau de partenaires certifiés en Europe et aux USA",
                "Transparence totale sur les coûts et les délais",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
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
                  <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-card">
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${VALUE_COLORS[i]}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-sm font-bold text-primary">{value.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{value.description}</p>
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
