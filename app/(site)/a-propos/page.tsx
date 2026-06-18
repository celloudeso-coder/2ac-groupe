import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PageHero from '@/components/ui/PageHero'
import LiquidBackground from '@/components/ui/LiquidBackground'
import CtaBanner from '@/components/home/CtaBanner'
import { COMPANY_VALUES } from '@/lib/data'
import { getTeamMembers } from '@/lib/content'
import { Zap, Shield, Handshake, Layers } from 'lucide-react'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = { Zap, Shield, Handshake, Layers }

export const metadata: Metadata = {
  title: 'À propos — Notre histoire et nos valeurs',
  description:
    '2AC GROUPE : 10 ans d\'expertise multisectorielle en Guinée. Découvrez notre histoire, notre mission, nos valeurs et l\'équipe qui porte le projet.',
}

const TIMELINE = [
  { year: '2014', title: 'Fondation', desc: 'Création de 2AC GROUPE à Conakry, initialement focalisée sur le BTP résidentiel.' },
  { year: '2016', title: 'Expansion commerce', desc: "Ouverture de l'activité de vente de carreaux et produits de finition pour les professionnels du bâtiment." },
  { year: '2018', title: 'Logistique internationale', desc: "Lancement du service d'expédition express vers l'Europe et les États-Unis, en partenariat avec Kotedi.com." },
  { year: '2020', title: 'Import-Export', desc: "Développement de l'activité import-export : matériaux BTP, agroalimentaire et équipements industriels." },
  { year: '2022', title: 'Conseil & Services', desc: 'Ouverture du pôle conseil pour accompagner les entrepreneurs et institutions dans leurs projets de développement.' },
  { year: '2024', title: "Aujourd'hui", desc: "5 secteurs, 150+ projets réalisés, une équipe soudée et des clients fidèles à travers l'Afrique, l'Europe et les USA." },
]

export const revalidate = 60

export default async function AboutPage() {
  const team = await getTeamMembers()
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
                Notre mission
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Fournir à nos clients des solutions intégrées et fiables qui couvrent l&apos;ensemble de leur chaîne de valeur : de l&apos;approvisionnement international à la livraison finale, en passant par la construction et la finition.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Nous croyons que la Guinée et l&apos;Afrique de l&apos;Ouest ont besoin d&apos;entreprises capables de tenir des engagements à la hauteur des standards internationaux, tout en comprenant les réalités locales.
              </p>
            </div>
            <div className="card-glass glass-edge p-8">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Notre vision</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Devenir la référence incontournable en Guinée et dans la sous-région pour les entreprises et particuliers qui cherchent un partenaire unique, compétent et honnête pour leurs projets multisectoriels.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Nous voulons contribuer au développement économique durable de la Guinée en créant des emplois qualifiés, en transférant des compétences et en facilitant les échanges internationaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface" aria-labelledby="values-heading">
        <div className="container-base">
          <SectionHeader eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" id="values-heading" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_VALUES.map((value, i) => {
              const Icon = ICONS[value.icon]
              return (
                <ScrollReveal key={value.title} delay={i * 100}>
                  <div className="card-glass hover-glow h-full p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background" aria-labelledby="timeline-heading">
        <div className="container-base">
          <SectionHeader eyebrow="Notre histoire" title="10 ans de croissance" id="timeline-heading" />
          <ol className="relative mx-auto mt-12 max-w-2xl space-y-8 border-l-2 border-line pl-8" aria-label="Historique de l'entreprise">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white ring-4 ring-background" aria-hidden />
                <p className="text-sm font-bold text-brand">{item.year}</p>
                <h3 className="mt-0.5 font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CEO message */}
      <section className="relative overflow-hidden section-padding bg-background" aria-labelledby="ceo-heading">
        <LiquidBackground density="rich" />
        <div className="container-base relative z-10">
          <div className="card-glass glass-edge mx-auto max-w-3xl p-10 text-center md:p-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">Le mot du dirigeant</p>
            <blockquote>
              <p className="text-lg leading-relaxed text-ink/90 md:text-xl">
                &laquo;&nbsp;Chez 2AC GROUPE, nous avons bâti notre réputation sur une conviction simple : nos clients méritent le meilleur. Pas seulement en termes de qualité de prestation, mais aussi en termes de transparence, de ponctualité et de respect. Chaque projet que nous acceptons, nous nous y engageons entièrement.&nbsp;&raquo;
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
