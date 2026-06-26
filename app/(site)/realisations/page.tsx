import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Calendar, Building2 } from 'lucide-react'
import CtaBanner from '@/components/home/CtaBanner'
import PageHero from '@/components/ui/PageHero'
import { getProjects, getStats } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description:
    'Découvrez les projets réalisés par 2AC GROUPE : villas, immeubles, réhabilitations et infrastructures publiques à Conakry et en Guinée.',
}

export const revalidate = 60

const PLACEHOLDER_GRADIENTS = [
  'from-brand-900 via-surface-3 to-black',
  'from-surface-3 via-surface-2 to-black',
  'from-brand-800 via-surface-3 to-black',
]

export default async function RealisationsPage() {
  const [projects, stats] = await Promise.all([getProjects(), getStats('realisations')])
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Nos réalisations"
        description="Chaque projet témoigne de notre engagement envers la qualité et la fiabilité. Découvrez un aperçu de ce que nous avons accompli pour nos clients."
      />

      {/* Stats */}
      <div className="bg-background pb-4">
        <div className="container-base">
          <dl className="card-glass grid grid-cols-3 gap-6 p-6 text-center">
            {stats.map((s, i) => (
              <div key={s.id} className={i > 0 ? 'border-l border-line' : ''}>
                <dd className="font-display text-3xl font-extrabold text-brand">{s.value}</dd>
                <dt className="mt-1 text-xs text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Projects grid */}
      <section className="section-padding bg-background" aria-label="Projets réalisés">
        <div className="container-base">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <article key={project.slug} className="card-glass hover-glow group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex h-full items-center justify-center bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]}`}>
                      <Building2 className="h-16 w-16 text-white/15" aria-hidden />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <span className="badge-brand backdrop-blur">Réalisation</span>
                    {project.project_date && (
                      <span className="flex items-center gap-1 text-xs text-white/80">
                        <Calendar className="h-3 w-3" aria-hidden />
                        {new Date(project.project_date).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-base font-bold text-ink">{project.title}</h2>
                  {project.location && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {project.location}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{project.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Ce portfolio présente un échantillon de nos réalisations.{' '}
            <a href="/contact" className="font-medium text-brand hover:underline">
              Contactez-nous
            </a>{' '}
            pour en savoir plus ou pour discuter d&apos;un projet similaire.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
