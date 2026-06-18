import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/data'

export default function StatsSection() {
  return (
    <section className="bg-primary text-white section-padding" aria-label="Chiffres clés">
      <div className="container-base">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-accent-400 md:text-5xl" aria-hidden>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-2 text-sm text-slate-300 md:text-base">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
