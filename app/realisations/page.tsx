import type { Metadata } from 'next'
import { MapPin, Calendar, Building2 } from 'lucide-react'
import CtaBanner from '@/components/home/CtaBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { FEATURED_PROJECTS, SERVICES_DATA } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description:
    'Découvrez les projets réalisés par 2AC SARL : villas, immeubles, réhabilitations et infrastructures publiques à Conakry et en Guinée.',
}

const ALL_PROJECTS = [
  ...FEATURED_PROJECTS,
  {
    slug: 'magasin-carreaux-ratoma',
    title: 'Aménagement showroom carreaux',
    service_id: null,
    description:
      "Conception et réalisation complète d'un showroom de 200 m² pour l'exposition de carreaux et produits de finition, incluant une zone conseil et un espace de stockage.",
    location: 'Ratoma, Conakry',
    images: [],
    cover_image: null,
    project_date: '2023-05-01',
    featured: false,
    sort_order: 4,
    status: 'published' as const,
  },
  {
    slug: 'expéditions-europe-2023',
    title: 'Expéditions express — Europe 2023',
    service_id: null,
    description:
      "Traitement de plus de 800 expéditions express vers la France, la Belgique et le Royaume-Uni en 2023, avec un taux de livraison dans les délais de 99,2 %.",
    location: 'Conakry → Europe',
    images: [],
    cover_image: null,
    project_date: '2023-12-31',
    featured: false,
    sort_order: 5,
    status: 'published' as const,
  },
  {
    slug: 'import-carreaux-espagne',
    title: "Import de carreaux depuis l'Espagne",
    service_id: null,
    description:
      "Organisation de 4 conteneurs de carreaux et produits de finition depuis Valence (Espagne) pour approvisionner des promoteurs immobiliers guinéens.",
    location: 'Espagne → Conakry',
    images: [],
    cover_image: null,
    project_date: '2024-02-01',
    featured: false,
    sort_order: 6,
    status: 'published' as const,
  },
]

const GRADIENT_MAP = [
  'from-primary-800 to-primary-600',
  'from-slate-800 to-slate-600',
  'from-primary-700 to-accent-700',
  'from-emerald-800 to-emerald-600',
  'from-amber-800 to-amber-600',
  'from-violet-800 to-violet-600',
]

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white md:py-24" aria-labelledby="portfolio-heading">
        <div className="container-base max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">Portfolio</p>
          <h1 id="portfolio-heading" className="font-display text-4xl font-extrabold text-balance md:text-5xl">
            Nos réalisations
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Chaque projet témoigne de notre engagement envers la qualité et la fiabilité. Découvrez un aperçu de ce que nous avons accompli pour nos clients.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-primary py-8">
        <div className="container-base">
          <dl className="grid grid-cols-3 gap-6 text-center text-white">
            <div>
              <dt className="text-xs text-slate-400">Projets BTP</dt>
              <dd className="font-display text-3xl font-extrabold text-accent-400">80+</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Expéditions logistiques</dt>
              <dd className="font-display text-3xl font-extrabold text-accent-400">2 000+</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Opérations import-export</dt>
              <dd className="font-display text-3xl font-extrabold text-accent-400">50+</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Projects grid */}
      <section className="section-padding bg-surface" aria-label="Projets réalisés">
        <div className="container-base">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ALL_PROJECTS.map((project, i) => (
              <article key={project.slug} className="card-base overflow-hidden group">
                <div className={`relative h-52 bg-gradient-to-br ${GRADIENT_MAP[i % GRADIENT_MAP.length]} flex items-center justify-center`}>
                  <Building2 className="h-16 w-16 text-white/20" aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                      {project.service_id ?? 'BTP'}
                    </span>
                    {project.project_date && (
                      <span className="flex items-center gap-1 text-xs text-white/80">
                        <Calendar className="h-3 w-3" aria-hidden />
                        {new Date(project.project_date).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-base font-bold text-primary">{project.title}</h2>
                  {project.location && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {project.location}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Ce portfolio présente un échantillon de nos réalisations.{' '}
            <a href="/contact" className="font-medium text-accent hover:underline">
              Contactez-nous
            </a>{' '}
            pour en savoir plus ou pour discuter d'un projet similaire.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
