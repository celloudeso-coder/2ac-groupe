import Link from 'next/link'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { FEATURED_PROJECTS } from '@/lib/data'

const PROJECT_GRADIENTS = [
  'from-primary-800 to-primary-600',
  'from-slate-800 to-slate-600',
  'from-primary-700 to-accent-700',
]

export default function FeaturedProjects() {
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 100}>
              <article className="card-base group overflow-hidden">
                {/* Image placeholder */}
                <div className={`relative h-48 bg-gradient-to-br ${PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length]} flex items-center justify-center`}>
                  <Building2 className="h-16 w-16 text-white/20" aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    BTP
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-primary">
                    {project.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {project.location}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {project.description}
                  </p>
                  <Link
                    href="/realisations"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-600"
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
