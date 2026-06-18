import type { Service, Project, Testimonial, BlogPost, TeamMember } from './types'

export const SITE_CONFIG = {
  name: '2AC SARL',
  tagline: 'Une société multisectorielle au service de vos ambitions',
  description:
    "2AC SARL est une entreprise guinéenne multisectorielle basée à Lambanyi, Conakry. Avec plus de 10 ans d'expérience, nous intervenons en BTP, commerce de matériaux, logistique internationale, import-export et conseil stratégique.",
  address: 'Lambanyi, Conakry, République de Guinée',
  phones: ['+224 629 04 57 44'],
  emails: ['contact@2ac-gn.com', 'info@2ac-gn.com'],
  hours: {
    mon_fri: '08h00 – 18h00',
    sat: '09h00 – 13h00',
    sun: 'Fermé',
  },
  social: {
    linkedin: '#',
    facebook: '#',
    whatsapp: 'https://wa.me/224629045744',
  },
} as const

export const STATS = [
  { value: 10, suffix: '+', label: "Ans d'expérience" },
  { value: 99, suffix: '%', label: 'Taux de réussite logistique' },
  { value: 5, suffix: '', label: "Secteurs d'activité" },
  { value: 150, suffix: '+', label: 'Projets réalisés' },
] as const

export const SERVICES_DATA: Omit<Service, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    slug: 'btp',
    title: 'Bâtiment & Travaux Publics',
    short_desc:
      "De la construction neuve à la réhabilitation, nous bâtissons des infrastructures durables qui répondent aux standards les plus exigeants.",
    body: `<h2>Notre expertise en construction</h2>
<p>Depuis plus de 10 ans, 2AC SARL accompagne particuliers, entreprises et institutions dans la réalisation de leurs projets de construction et de rénovation en Guinée et dans la sous-région.</p>
<p>Notre équipe de professionnels qualifiés assure un suivi rigoureux de chaque chantier, du terrassement à la livraison clés en main, en garantissant qualité d'exécution et respect des délais.</p>
<h2>Nos domaines d'intervention</h2>
<p>Qu'il s'agisse d'une villa résidentielle, d'un immeuble commercial, d'un bâtiment institutionnel ou de travaux d'infrastructure publique, nous disposons des compétences techniques et des ressources nécessaires.</p>`,
    icon: 'building-2',
    engagements: [
      'Respect strict des délais convenus',
      "Qualité d'exécution conforme aux normes",
      'Suivi rigoureux de chantier',
      'Transparence et communication régulière',
      'Satisfaction client garantie',
    ],
    prestations: [
      'Construction neuve (résidentiel, commercial, institutionnel)',
      'Rénovation et réhabilitation de bâtiments',
      'Aménagement intérieur et extérieur',
      'Infrastructures et travaux publics',
      'Gros œuvre et second œuvre',
      'Études et suivi de chantier',
    ],
    cover_image: null,
    sort_order: 1,
    status: 'published',
  },
  {
    slug: 'commerce-general',
    title: 'Commerce général',
    short_desc:
      'Distributeur de carreaux, céramiques et produits de finition haut de gamme. Un large choix pour sublimer vos espaces.',
    body: `<h2>Votre fournisseur de matériaux de finition</h2>
<p>2AC SARL propose une gamme complète de carreaux et produits de finition sélectionnés auprès des meilleurs fabricants internationaux. Nous répondons aussi bien aux besoins des particuliers que des professionnels du BTP.</p>
<p>Notre showroom à Lambanyi vous accueille pour découvrir nos collections et bénéficier des conseils de nos experts.</p>`,
    icon: 'store',
    engagements: [
      'Produits durables sélectionnés avec soin',
      'Bon rapport qualité-prix',
      'Large gamme en stock permanent',
      'Conseil technique personnalisé',
      'Livraison rapide sur chantier',
    ],
    prestations: [
      'Carreaux céramiques et porcelaine',
      'Faïence salle de bains et cuisine',
      'Carrelage extérieur et terrasse',
      'Jointoiement et colles de pose',
      'Accessoires et profilés de finition',
      'Conseils de pose et devis gratuit',
    ],
    cover_image: null,
    sort_order: 2,
    status: 'published',
  },
  {
    slug: 'logistique-transport',
    title: 'Logistique & Transport international',
    short_desc:
      "Expédition express de colis vers l'Europe et les USA en moins d'une semaine. Fiabilité 99 %, traçabilité totale.",
    body: `<h2>Transport express international</h2>
<p>2AC SARL offre un service d'expédition express vers l'Europe et les États-Unis avec un délai de livraison inférieur à une semaine et un taux de réussite de 99 %. Nous travaillons en partenariat avec Kotedi.com pour assurer la traçabilité complète de vos envois.</p>
<p>Nos solutions de transport sont adaptées aux particuliers comme aux entreprises, avec une prise en charge de bout en bout : collecte, emballage, dédouanement et livraison finale.</p>`,
    icon: 'truck',
    engagements: [
      'Délai express : moins de 7 jours ouvrés',
      'Taux de réussite de 99 %',
      'Traçabilité complète en temps réel',
      'Traitement minutieux des colis',
      'Assistance 7j/7 pendant le transit',
    ],
    prestations: [
      'Expédition express vers Europe (France, Belgique, UK…)',
      'Expédition express vers les États-Unis',
      'Suivi en ligne via plateforme partenaire',
      'Emballage professionnel et sécurisé',
      'Gestion des formalités douanières',
      'Solutions sur mesure pour entreprises',
    ],
    cover_image: null,
    sort_order: 3,
    status: 'published',
  },
  {
    slug: 'import-export',
    title: 'Import-Export',
    short_desc:
      "Commerce international de biens entre l'Afrique, l'Europe et le monde. Gestion douanière et sourcing sur mesure.",
    body: `<h2>Votre partenaire pour le commerce international</h2>
<p>2AC SARL facilite les échanges commerciaux entre la Guinée, l'Afrique, l'Europe et le reste du monde. Notre réseau de partenaires certifiés et notre expertise des formalités douanières guinéennes et internationales nous permettent de gérer vos opérations d'import-export de A à Z.</p>
<p>Que vous ayez besoin de sourcer des matériaux de construction, des produits alimentaires ou des équipements industriels, nous assurons la chaîne logistique complète.</p>`,
    icon: 'globe',
    engagements: [
      "Réseau de partenaires certifiés à l'international",
      'Gestion complète des formalités douanières',
      'Solutions sur mesure pour chaque besoin',
      'Suivi en temps réel des expéditions',
      'Prix compétitifs grâce à des volumes consolidés',
    ],
    prestations: [
      'Matériaux BTP et équipements de construction',
      'Produits agroalimentaires et denrées',
      'Équipements industriels et machineries',
      'Biens de grande consommation',
      'Sourcing et négociation fournisseurs',
      'Assistance douanière et logistique',
    ],
    cover_image: null,
    sort_order: 4,
    status: 'published',
  },
  {
    slug: 'conseil',
    title: 'Conseil & Services',
    short_desc:
      'Assistance technique et stratégique, études de faisabilité et optimisation de processus pour concrétiser vos projets.',
    body: `<h2>Un accompagnement expert à chaque étape</h2>
<p>L'équipe de consultants de 2AC SARL met son expertise multisectorielle à votre disposition pour vous aider à prendre les meilleures décisions, optimiser vos processus et réussir vos projets de développement.</p>
<p>Notre approche est pragmatique et orientée résultats : nous analysons votre situation, identifions les leviers d'amélioration et vous accompagnons dans la mise en œuvre.</p>`,
    icon: 'lightbulb',
    engagements: [
      'Accompagnement expert et personnalisé',
      'Approche pragmatique orientée résultats',
      'Confidentialité absolue',
      'Suivi post-mission',
    ],
    prestations: [
      'Assistance technique et stratégique',
      'Études de faisabilité et business plans',
      'Optimisation des processus opérationnels',
      'Conseil en approvisionnement et sourcing',
      "Accompagnement à l'installation d'entreprise",
      'Formations et transfert de compétences',
    ],
    cover_image: null,
    sort_order: 5,
    status: 'published',
  },
]

export const SERVICE_ICONS: Record<string, string> = {
  'building-2': 'Building2',
  store: 'Store',
  truck: 'Truck',
  globe: 'Globe',
  lightbulb: 'Lightbulb',
}

export const FEATURED_PROJECTS: Omit<Project, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    slug: 'villa-lambanyi-r1',
    title: 'Villa R+1 à Lambanyi',
    service_id: null,
    description:
      "Construction clés en main d'une villa résidentielle de 350 m² avec sous-sol, salon double, 5 chambres et piscine. Réalisée en 14 mois avec des finitions haut de gamme.",
    location: 'Lambanyi, Conakry',
    images: [],
    cover_image: null,
    project_date: '2023-08-01',
    featured: true,
    sort_order: 1,
    status: 'published',
  },
  {
    slug: 'immeuble-commercial-kaloum',
    title: 'Immeuble commercial R+3',
    service_id: null,
    description:
      "Construction d'un immeuble à usage mixte (bureaux et commerces) de 1 200 m² au cœur du quartier Kaloum, livré clés en main en 18 mois.",
    location: 'Kaloum, Conakry',
    images: [],
    cover_image: null,
    project_date: '2022-12-01',
    featured: true,
    sort_order: 2,
    status: 'published',
  },
  {
    slug: 'renovation-ecole-primaire',
    title: 'Réhabilitation école primaire',
    service_id: null,
    description:
      "Rénovation complète d'une école primaire de 12 salles de classe : toiture, sols en carreaux, menuiseries aluminium et peinture. Financement public.",
    location: 'Ratoma, Conakry',
    images: [],
    cover_image: null,
    project_date: '2024-03-01',
    featured: true,
    sort_order: 3,
    status: 'published',
  },
]

export const TESTIMONIALS_DATA: Omit<Testimonial, 'id' | 'created_at'>[] = [
  {
    author_name: 'Mamadou Baldé',
    company: 'Directeur, Groupe Balkis Immobilier',
    content:
      "2AC SARL a construit notre siège social en respectant à la lettre le budget et le calendrier. Leur sérieux et la qualité de leurs finitions sont remarquables. Je les recommande sans hésitation pour tout projet de construction en Guinée.",
    rating: 5,
    avatar_url: null,
    sort_order: 1,
    status: 'published',
  },
  {
    author_name: 'Fatoumata Diallo',
    company: 'Commerçante, Paris (France)',
    content:
      "J'utilise le service d'expédition de 2AC depuis 2 ans pour envoyer des colis à ma famille en Guinée. Les délais sont toujours respectés, les colis arrivent en parfait état. Un service digne des grandes compagnies internationales.",
    rating: 5,
    avatar_url: null,
    sort_order: 2,
    status: 'published',
  },
  {
    author_name: 'Alpha Oumar Camara',
    company: 'Promoteur immobilier, Conakry',
    content:
      "Excellente expérience avec 2AC pour l'import de carreaux et matériaux de finition depuis l'Espagne. Gestion douanière impeccable, livraison en 3 semaines. Mes chantiers ne connaissent plus de rupture de stock.",
    rating: 5,
    avatar_url: null,
    sort_order: 3,
    status: 'published',
  },
]

export const BLOG_POSTS_DATA: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    slug: '5-criteres-pour-choisir-vos-carreaux',
    title: '5 critères essentiels pour bien choisir vos carreaux',
    excerpt:
      "Résistance, format, coefficient de glissance, entretien : notre guide pratique pour ne pas se tromper lors de l'achat de carreaux pour votre maison ou votre commerce.",
    body: null,
    cover_image: null,
    author: 'Équipe 2AC SARL',
    categories: ['BTP', 'Commerce'],
    status: 'published',
    published_at: '2024-10-15T08:00:00Z',
  },
  {
    slug: 'expedition-express-europe-comment-ca-marche',
    title: "Expédition express vers l'Europe : comment ça marche ?",
    excerpt:
      "De la collecte de votre colis à Conakry jusqu'à la livraison en France ou en Belgique en moins de 7 jours : découvrez le processus étape par étape de notre service de transport international.",
    body: null,
    cover_image: null,
    author: 'Équipe 2AC SARL',
    categories: ['Logistique'],
    status: 'published',
    published_at: '2024-11-20T08:00:00Z',
  },
  {
    slug: 'import-export-guinee-opportunites-2025',
    title: "Import-Export en Guinée : 5 secteurs porteurs en 2025",
    excerpt:
      "Matériaux de construction, produits alimentaires, équipements solaires... Quels sont les créneaux les plus prometteurs pour le commerce international guinéen cette année ?",
    body: null,
    cover_image: null,
    author: 'Équipe 2AC SARL',
    categories: ['Import-Export', 'Conseil'],
    status: 'published',
    published_at: '2025-01-08T08:00:00Z',
  },
]

export const TEAM_DATA: Omit<TeamMember, 'id' | 'created_at'>[] = [
  {
    full_name: 'Directeur Général',
    role: 'Fondateur & Directeur Général',
    bio: "Fort de plus de 10 ans d'expérience dans le BTP, le commerce international et la logistique, notre fondateur a bâti 2AC SARL sur des valeurs d'excellence, de fiabilité et d'innovation au service du développement guinéen.",
    photo_url: null,
    is_ceo: true,
    sort_order: 1,
    status: 'published',
  },
]

export const COMPANY_VALUES = [
  {
    icon: 'Zap',
    title: 'Innovation',
    description:
      "Nous adoptons les meilleures pratiques et technologies pour vous offrir des solutions modernes adaptées au contexte guinéen et international.",
  },
  {
    icon: 'Shield',
    title: 'Qualité',
    description:
      "Chaque projet, chaque colis, chaque livraison est traité avec la même exigence de qualité. Nos normes ne souffrent aucun compromis.",
  },
  {
    icon: 'Handshake',
    title: 'Fiabilité',
    description:
      "Nos clients nous font confiance depuis 10 ans parce que nous tenons nos engagements : délais, budget, qualité. Toujours.",
  },
  {
    icon: 'Layers',
    title: 'Polyvalence',
    description:
      "Notre ancrage dans 5 secteurs complémentaires nous permet de vous proposer des solutions intégrées que peu d'acteurs peuvent offrir.",
  },
] as const
