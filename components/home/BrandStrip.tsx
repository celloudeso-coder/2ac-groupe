import Image from 'next/image'
import Link from 'next/link'
import { getServices } from '@/lib/content'
import { accentForText } from '@/lib/color'

/**
 * Bande « Nos marques » : présente les marques des pôles du groupe
 * (PLANÈTE, 2AC TRANSIT, CleanTech, FRS…). Affiche le logo du pôle quand
 * `logo_url` est fourni, sinon le `brand_name` en chip teintée de l'accent.
 */
export default async function BrandStrip() {
  const services = await getServices()
  const brands = services.filter((s) => s.brand_name)
  if (brands.length === 0) return null

  return (
    <section className="border-y border-line bg-background py-10" aria-labelledby="brands-heading">
      <div className="container-base">
        <h2 id="brands-heading" className="text-center text-xs font-semibold uppercase tracking-widest text-faint">
          Nos marques
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4" role="list">
          {brands.map((s) => {
            const accentText = accentForText(s.accent_color || '#E53323')
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/40"
                  title={s.brand_name ?? undefined}
                >
                  {s.logo_url ? (
                    <Image
                      src={s.logo_url}
                      alt={s.brand_name ?? s.title}
                      width={96}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentText }} aria-hidden />
                      {s.brand_name}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
