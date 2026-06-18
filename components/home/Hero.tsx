import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden gradient-hero text-white"
      aria-labelledby="hero-heading"
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Accent orb */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl" aria-hidden />

      <div className="container-base relative py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-300">
            Conakry, République de Guinée · Depuis 2014
          </p>

          <h1 id="hero-heading" className="font-display text-4xl font-extrabold leading-tight text-balance md:text-5xl lg:text-6xl">
            Votre partenaire{' '}
            <span className="text-accent-400">multisectoriel</span>{' '}
            de confiance
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 md:text-xl max-w-2xl">
            De la construction à la logistique internationale, 2AC SARL vous accompagne à chaque étape de vos projets avec l'expertise de 10 ans et l'exigence des standards internationaux.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/services" className="btn-accent px-7 py-3.5">
              Nos services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact#devis" className="btn-outline-white px-7 py-3.5">
              Demander un devis gratuit
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-10">
            <div>
              <p className="text-3xl font-extrabold text-accent-400 font-display">10+</p>
              <p className="text-xs text-slate-400">Ans d'expérience</p>
            </div>
            <div className="h-10 w-px bg-white/10" aria-hidden />
            <div>
              <p className="text-3xl font-extrabold text-accent-400 font-display">99%</p>
              <p className="text-xs text-slate-400">Taux de réussite</p>
            </div>
            <div className="h-10 w-px bg-white/10" aria-hidden />
            <div>
              <p className="text-3xl font-extrabold text-accent-400 font-display">5</p>
              <p className="text-xs text-slate-400">Secteurs d'activité</p>
            </div>
            <div className="h-10 w-px bg-white/10" aria-hidden />
            <div>
              <p className="text-3xl font-extrabold text-accent-400 font-display">150+</p>
              <p className="text-xs text-slate-400">Projets réalisés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden>
        <svg viewBox="0 0 1440 60" className="h-10 w-full fill-white md:h-16" preserveAspectRatio="none">
          <path d="M0,60L1440,0L1440,60L0,60Z" />
        </svg>
      </div>
    </section>
  )
}
