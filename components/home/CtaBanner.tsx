import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { getSiteSettings } from '@/lib/content'
import LiquidBackground from '@/components/ui/LiquidBackground'

export default async function CtaBanner() {
  const { company } = await getSiteSettings()
  const phone = company.phones[0]
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24" aria-labelledby="cta-heading">
      <LiquidBackground density="rich" />
      <div className="container-base relative z-10">
        <div className="card-glass glass-edge mx-auto max-w-3xl p-10 text-center md:p-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Prêt à démarrer ?</p>
          <h2 id="cta-heading" className="font-display text-3xl font-extrabold text-ink md:text-4xl text-balance">
            Parlons de votre projet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Que ce soit pour un projet de construction, une expédition internationale ou du conseil
            stratégique, notre équipe vous répond dans les 24 heures.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact#devis" className="btn-brand px-7 py-3.5">
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn-glass px-7 py-3.5">
              <Phone className="h-4 w-4" aria-hidden />
              {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
