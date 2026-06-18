import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getFeaturedProjects } from '@/lib/content'

const PLACEHOLDER_GRADIENTS = [
  'from-brand-900 via-surface-3 to-black',
  'from-surface-3 via-surface-2 to-black',
  'from-brand-800 via-surface-3 to-black',
]

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects()
  return (
    <section className="section-padding bg-surface" aria-labelledby="projects-heading">
      <div className="container-base">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            id="projects-heading"
            eyebrow="Réalisations"
            title="Nos projets phares"
            description="Un aperçu de ce que nous construisons, livrons et réalisons chaque jour."
            align="left"
          />
          <Link href="/realisations" className="btn-outline shrink-0 whitespace-nowrap text-sm">
            Voir tout
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 100}>
              <article className="card-glass hover-glow group h-full overflow-hidden">
                {/* Image de couverture ou dégradé de repli */}
                <div className="relative h-48 overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="badge-brand absolute bottom-3 left-4 backdrop-blur">Réalisation</span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-ink">{project.title}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {project.location}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{project.description}</p>
                  <Link
                    href="/realisations"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                  >
                    Voir le projet
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
