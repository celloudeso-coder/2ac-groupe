import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PageHero from '@/components/ui/PageHero'
import LiquidBackground from '@/components/ui/LiquidBackground'
import CtaBanner from '@/components/home/CtaBanner'
import PartnersMarquee from '@/components/about/PartnersMarquee'
import ValueIcon from '@/components/ui/ValueIcon'
import { getTeamMembers, getSiteSettings, getValues, getTimeline } from '@/lib/content'

/** Découpe un texte en paragraphes (séparés par une ligne vide). */
function paragraphs(text?: string): string[] {
  return (text ?? '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}

export const metadata: Metadata = {
  title: 'À propos — Notre histoire et nos valeurs',
  description:
    '2AC GROUPE : 10 ans d\'expertise multisectorielle en Guinée. Découvrez notre histoire, notre mission, nos valeurs et l\'équipe qui porte le projet.',
}

export const revalidate = 60

export default async function AboutPage() {
  const [team, settings, values, timeline] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
    getValues(),
    getTimeline(),
  ])
  const mission = settings.mission
  const vision = settings.vision
  const ceoQuote = settings.ceo_message?.quote ?? ''
  const ceo = team.find((m) => m.is_ceo) ?? team[0] ?? null
  const ceoName = ceo?.full_name ?? 'Le Directeur Général'
  const ceoRole = ceo?.role ?? 'Fondateur & Directeur Général, 2AC GROUPE'
  const ceoInitials = ceoName
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <>
      <PageHero
        eyebrow="À propos de nous"
        title="Une entreprise guinéenne bâtie sur la confiance"
        description="Depuis 2014, 2AC GROUPE accompagne ses clients avec intégrité et professionnalisme. Notre ancrage local et nos connexions internationales font de nous un partenaire unique pour vos projets les plus ambitieux."
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-background" aria-labelledby="mission-heading">
        <div className="container-base">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 id="mission-heading" className="font-display text-2xl font-bold text-ink md:text-3xl">
                {mission?.title}
              </h2>
              {paragraphs(mission?.body).map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
              ))}
            </div>
            <div className="card-glass glass-edge p-8">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{vision?.title}</h2>
              {paragraphs(vision?.body).map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface" aria-labelledby="values-heading">
        <div className="container-base">
          <SectionHeader eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" id="values-heading" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <ScrollReveal key={value.id} delay={i * 100}>
                <div className="card-glass hover-glow h-full p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <ValueIcon name={value.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background" aria-labelledby="timeline-heading">
        <div className="container-base">
          <SectionHeader eyebrow="Notre histoire" title="10 ans de croissance" id="timeline-heading" />
          <ol className="relative mx-auto mt-12 max-w-2xl space-y-8 border-l-2 border-line pl-8" aria-label="Historique de l'entreprise">
            {timeline.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white ring-4 ring-background" aria-hidden />
                <p className="text-sm font-bold text-brand">{item.year}</p>
                <h3 className="mt-0.5 font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ancrage international */}
      <section className="section-padding bg-surface" aria-labelledby="intl-heading">
        <div className="container-base">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Notre ancrage</p>
              <h2 id="intl-heading" className="font-display text-2xl font-bold text-ink md:text-3xl text-balance">
                Conakry au cœur, l&apos;international en relais
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Le siège du groupe est établi à <strong className="text-ink">Lambanyi, Conakry</strong>,
                d&apos;où sont pilotés l&apos;ensemble de nos pôles. Notre présence en France nous sert de
                <strong className="text-ink"> relais et point de contact en Europe</strong> pour la
                logistique, le sourcing et les échanges import-export.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Cet ancrage local fort, doublé d&apos;un relais européen, nous permet d&apos;accompagner
                aussi bien les particuliers et entreprises guinéens que la diaspora.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              <li className="card-glass p-5">
                <p className="font-display text-lg font-bold text-ink">Conakry, Guinée</p>
                <p className="mt-1 text-sm text-muted">Siège du groupe — pilotage des 5 pôles.</p>
              </li>
              <li className="card-glass p-5">
                <p className="font-display text-lg font-bold text-ink">France</p>
                <p className="mt-1 text-sm text-muted">Relais / point de contact Europe (logistique & sourcing).</p>
              </li>
              <li className="card-glass p-5">
                <p className="font-display text-lg font-bold text-ink">Europe & USA</p>
                <p className="mt-1 text-sm text-muted">Zones desservies par notre pôle TRANSIT.</p>
              </li>
              <li className="card-glass p-5">
                <p className="font-display text-lg font-bold text-ink">Réseau partenaires</p>
                <p className="mt-1 text-sm text-muted">Fournisseurs certifiés à l&apos;international.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partenaires (bandeau défilant — masqué si aucun partenaire) */}
      <PartnersMarquee />

      {/* CEO message */}
      <section className="relative overflow-hidden section-padding bg-background" aria-labelledby="ceo-heading">
        <LiquidBackground density="rich" />
        <div className="container-base relative z-10">
          <div className="card-glass glass-edge mx-auto max-w-3xl p-10 text-center md:p-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Le mot du dirigeant</p>
            <blockquote>
              <p className="text-lg leading-relaxed text-ink/90 md:text-xl">
                &laquo;&nbsp;{ceoQuote}&nbsp;&raquo;
              </p>
              <footer className="mt-8 flex items-center justify-center gap-4">
                {ceo?.photo_url ? (
                  <Image
                    src={ceo.photo_url}
                    alt={`Photo de ${ceoName}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-2xl font-black text-white" aria-hidden>
                    {ceoInitials}
                  </div>
                )}
                <div className="text-left">
                  <p id="ceo-heading" className="font-display font-bold text-ink">{ceoName}</p>
                  <p className="text-sm text-muted">{ceoRole}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
