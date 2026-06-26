import Image from 'next/image'
import { getPartners } from '@/lib/content'
import type { Partner } from '@/lib/types'

function PartnerChip({ partner, dup = false }: { partner: Partner; dup?: boolean }) {
  const inner = (
    <span className="flex h-20 min-w-[9rem] items-center justify-center rounded-2xl bg-white px-6 shadow-glass ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.03]">
      {partner.logo_url ? (
        <Image
          src={partner.logo_url}
          alt={dup ? '' : partner.name}
          width={200}
          height={56}
          className="h-12 w-auto max-w-[180px] object-contain"
        />
      ) : (
        <span className="whitespace-nowrap text-sm font-semibold text-neutral-900">{partner.name}</span>
      )}
    </span>
  )
  return (
    <li className="shrink-0" {...(dup ? { 'aria-hidden': true } : {})}>
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
