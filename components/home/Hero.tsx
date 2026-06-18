import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { STATS } from '@/lib/data'
import LiquidBackground from '@/components/ui/LiquidBackground'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-ink" aria-labelledby="hero-heading">
      {/* Image de fond (réfractée par le verre, très atténuée) */}
      <Image
        src="/hero-construction.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-20 dark:opacity-25"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background"
        aria-hidden
      />

      {/* Bulles d'eau animées */}
      <LiquidBackground density="rich" />

      <div className="container-base relative z-10 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="glass glass--brand mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink">
            Conakry, République de Guinée · Depuis 2014
          </p>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.05] text-balance md:text-5xl lg:text-6xl"
          >
            Votre partenaire{' '}
            <span className="text-gradient-brand">multisectoriel</span>{' '}
            de confiance
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            De la construction à la logistique internationale, 2AC GROUPE vous accompagne à chaque
            étape de vos projets avec l&apos;expertise de 10 ans et l&apos;exigence des standards internationaux.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/services" className="btn-brand px-7 py-3.5">
              Nos services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact#devis" className="btn-glass px-7 py-3.5">
              Demander un devis gratuit
            </Link>
          </div>

          {/* Statistiques en verre */}
          <dl className="card-glass mt-12 grid grid-cols-2 gap-4 p-6 sm:grid-cols-4 sm:gap-2">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-4' : ''}>
                <dd className="font-display text-3xl font-extrabold text-brand">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
