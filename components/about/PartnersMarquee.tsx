import Image from 'next/image'
import { getPartners } from '@/lib/content'
import type { Partner } from '@/lib/types'

function PartnerChip({ partner, dup = false }: { partner: Partner; dup?: boolean }) {
  const inner = (
    <span className="glass flex h-16 items-center justify-center rounded-2xl px-6">
      {partner.logo_url ? (
        <Image
          src={partner.logo_url}
          alt={dup ? '' : partner.name}
          width={180}
          height={48}
          className="h-10 w-auto object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
        />
      ) : (
        <span className="whitespace-nowrap text-sm font-semibold text-ink">{partner.name}</span>
      )}
    </span>
  )
  return (
    <li className="shrink-0" aria-hidden={dup || undefined}>
      {partner.website_url ? (
        <a
          href={partner.website_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={partner.name}
          tabIndex={dup ? -1 : undefined}
          className="block"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

/**
 * Bandeau « Nos partenaires » défilant (marquee 100 % CSS).
 * - masqué si aucun partenaire publié ;
 * - piste dupliquée (2ᵉ copie en aria-hidden) pour une boucle sans couture ;
 * - sous prefers-reduced-motion : version statique centrée (variantes Tailwind
 *   motion-reduce:*), sans aucun mouvement.
 */
export default async function PartnersMarquee() {
  const partners = await getPartners()
  if (partners.length === 0) return null

  // Répète la liste assez de fois pour remplir la largeur même si elle est courte.
  const reps = Math.max(2, Math.ceil(8 / partners.length))
  const filled = Array.from({ length: reps }, () => partners).flat()

  return (
    <section className="section-padding bg-background" aria-labelledby="partners-heading">
      <div className="container-base text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Nos partenaires</p>
        <h2 id="partners-heading" className="font-display text-2xl font-bold text-ink md:text-3xl">
          Ils nous font confiance
        </h2>
      </div>

      {/* Version animée (mouvement autorisé) */}
      <div className="marquee mt-10 motion-reduce:hidden">
        <ul className="marquee-track" role="list">
          {filled.map((p, i) => (
            <PartnerChip key={`a-${p.id}-${i}`} partner={p} />
          ))}
          {filled.map((p, i) => (
            <PartnerChip key={`b-${p.id}-${i}`} partner={p} dup />
          ))}
        </ul>
      </div>

      {/* Version statique (prefers-reduced-motion) — chaque partenaire une fois */}
      <ul
        className="container-base mt-10 hidden flex-wrap items-center justify-center gap-4 motion-reduce:flex"
        role="list"
      >
        {partners.map((p) => (
          <PartnerChip key={p.id} partner={p} />
        ))}
      </ul>
    </section>
  )
}
