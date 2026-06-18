import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'

export default function CtaBanner() {
  return (
    <section className="gradient-primary py-16 text-white" aria-labelledby="cta-heading">
      <div className="container-base text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">
          Prêt à démarrer ?
        </p>
        <h2 id="cta-heading" className="font-display text-3xl font-bold md:text-4xl text-balance">
          Parlons de votre projet
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
          Que ce soit pour un projet de construction, une expédition internationale ou du conseil stratégique, notre équipe vous répond dans les 24 heures.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact#devis" className="btn-accent px-7 py-3.5">
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`}
            className="btn-outline-white px-7 py-3.5"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE_CONFIG.phones[0]}
          </a>
        </div>
      </div>
    </section>
  )
}
