import type {
  Service,
  Project,
  Testimonial,
  BlogPost,
  TeamMember,
  ValueItem,
  StatItem,
  TimelineEvent,
} from './types'

export const SITE_CONFIG = {
  name: '2AC GROUPE',
  // Raison sociale / forme juridique réelle — à n'utiliser que là où elle a une
  // valeur légale (mentions légales). La MARQUE affichée partout est « 2AC GROUPE ».
  legalName: '2AC GROUPE SARL',
  tagline: 'Un groupe multisectoriel au service de vos ambitions',
  description:
    "2AC GROUPE est un groupe guinéen multisectoriel basé à Lambanyi, Conakry. Fort de plus de 10 ans d'expérience, il réunit cinq pôles : BTP & construction, commerce de matériaux (PLANÈTE), transport & logistique (2AC TRANSIT), nettoyage & assainissement (CleanTech) et ingénierie ferroviaire & énergie (Ferrorail).",
  address: 'Lambanyi (face de la banque VISTA), Commune de Lambanyi, Conakry',
  phones: ['+224 629 04 57 44'],
  emails: ['contact@2ac-gn.com', 'info@2ac-gn.com'],
  hours: {
    mon_fri: '08h00 – 18h00',
    sat: '09h00 – 13h00',
    sun: 'Fermé',
  },
  // Informations légales (RCCM, capital, gérance) — page Mentions légales.
  legal: {
    legalName: '2AC GROUPE SARL',
    rccm: 'RCCM/GN.TCC.2026.B.02387 du 16 Février 2026',
    capital: '30 000 000 GNF',
    gerant: 'Camara Amadou',
    cogerante: 'Hadja Djeinabou Dramé',
    address: 'Lambanyi (face de la banque VISTA), Commune de Lambanyi, Conakry',
  },
  social: {
    linkedin: '#',
    facebook: '#',
    whatsapp: 'https://wa.me/224629045744',
  },
} as const

export const SERVICES_DATA: Omit<Service, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    slug: 'btp',
    title: 'Bâtiment & Travaux Publics',
    brand_name: '2AC BTP',
    accent_color: '#E53323',
    short_desc:
      "De la construction neuve à la réhabilitation, nous bâtissons des infrastructures durables qui répondent aux standards les plus exigeants.",
    body: `<h2>Notre expertise en construction</h2>
<p>Depuis plus de 10 ans, 2AC GROUPE accompagne particuliers, entreprises et institutions dans la réalisation de leurs projets de construction et de rénovation en Guinée et dans la sous-région.</p>
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
    brand_name: 'PLANÈTE Carrelages & Finitions',
    accent_color: '#1E3A8A',
    tagline: 'Fourniture de carrelage & produits de finition',
    short_desc:
      'Distributeur de carreaux, céramiques et produits de finition haut de gamme. Un large choix pour sublimer vos espaces.',
    body: `<h2>Votre fournisseur de matériaux de finition</h2>
<p>2AC GROUPE propose une gamme complète de carreaux et produits de finition sélectionnés auprès des meilleurs fabricants internationaux. Nous répondons aussi bien aux besoins des particuliers que des professionnels du BTP.</p>
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
    slug: '2ac-transit',
    title: '2AC TRANSIT',
    brand_name: '2AC TRANSIT',
    accent_color: '#E53323',
    tagline: 'Transport & logistique',
    short_desc:
      "Expédition express de colis vers l'Europe et les USA en moins d'une semaine. Fiabilité 99 %, traçabilité totale.",
    body: `<h2>Transport express international</h2>
<p>2AC GROUPE offre un service d'expédition express vers l'Europe et les États-Unis avec un délai de livraison inférieur à une semaine et un taux de réussite de 99 %. Nous travaillons en partenariat avec Kotedi.com pour assurer la traçabilité complète de vos envois.</p>
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
    slug: 'cleantech',
    title: 'Nettoyage & Assainissement',
    brand_name: '2AC CleanTech',
    accent_color: '#16803C',
    tagline: 'Hygiène et propreté professionnelles',
    short_desc:
      'Nettoyage, assainissement et hygiène des bâtiments et espaces.',
    body: `<h2>Propreté et assainissement professionnels</h2>
<p>2AC CleanTech assure le nettoyage, l'assainissement et l'hygiène des bâtiments, bureaux et espaces, avec un personnel formé et des produits conformes. Nos équipes interviennent rapidement, pour des prestations ponctuelles comme pour des contrats d'entretien régulier.</p>
<h2>En complément du BTP</h2>
<p>CleanTech prolonge naturellement notre pôle Construction : le <strong>nettoyage après chantier</strong> permet de livrer des locaux propres et prêts à l'usage. Du gros œuvre à la remise des clés, le groupe couvre l'ensemble de la chaîne.</p>`,
    icon: 'sparkles',
    engagements: [
      'Hygiène et salubrité garanties',
      'Personnel formé et équipé',
      'Produits adaptés et conformes',
      'Intervention rapide',
    ],
    prestations: [
      'Nettoyage industriel et technique',
      'Entretien de bureaux et bâtiments administratifs',
      'Désinfection et assainissement',
      'Nettoyage après chantier',
      'Entretien des espaces verts',
      'Nettoyage de vitres et façades',
      'Gestion et évacuation des déchets',
      'Dératisation et désinsectisation',
      'Maintenance et hygiène des locaux',
      'Fourniture de produits et matériels de nettoyage',
    ],
    cover_image: null,
    sort_order: 6,
    status: 'published',
  },
  {
    slug: 'ferrorail',
    title: 'Ingénierie & Infrastructures ferroviaires',
    brand_name: 'Ferrorail Service Guinée (FRS)',
    accent_color: '#1B3A6B',
    tagline: 'Votre partenaire technique pour des infrastructures modernes, fiables et durables.',
    contact_email: 'Contact@ferrorailservice-gn.com',
    contact_phone: '+224 612 555 572',
    website_url: 'https://www.ferrorail-service.com',
    short_desc:
      'Ingénierie, infrastructures ferroviaires et solutions énergétiques.',
    body: `<h2>Ferroviaire</h2>
<p>Création et modernisation de passages à niveau, signalisation ferroviaire, équipements ferroviaires, sécurité de chantier et maintenance des infrastructures.</p>
<h2>Énergie</h2>
<p>Installations électriques industrielles et tertiaires, distribution d'énergie, énergies renouvelables (photovoltaïque) et optimisation énergétique.</p>
<h2>Compétences & équipements</h2>
<p>Formations (sécurité ferroviaire, organisation de chantiers, métiers techniques, prévention des risques) et fourniture de matériel ferroviaire spécialisé, BTP et électrique.</p>`,
    icon: 'train-front',
    engagements: [
      'Sécurité — respect des normes et procédures',
      'Fiabilité — solutions solides et durables',
      'Expertise — savoir-faire technique',
      'Réactivité — réponse efficace au terrain',
    ],
    prestations: [
      'Expertise ferroviaire',
      'Compétence énergétique',
      'Approche terrain',
      'Sécurité',
      'Accompagnement',
      'Performance',
    ],
    cover_image: null,
    sort_order: 7,
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

// Portfolio complet (jeu de secours si Supabase est vide / indisponible).
// Inclut les projets phares ci-dessus + des réalisations non mises en avant.
export const PROJECTS_DATA: Omit<Project, 'id' | 'created_at' | 'updated_at'>[] = [
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
    status: 'published',
  },
  {
    slug: 'expeditions-europe-2023',
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
    status: 'published',
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
    status: 'published',
  },
]

export const TESTIMONIALS_DATA: Omit<Testimonial, 'id' | 'created_at'>[] = [
  {
    author_name: 'Mamadou Baldé',
    company: 'Directeur, Groupe Balkis Immobilier',
    content:
      "2AC GROUPE a construit notre siège social en respectant à la lettre le budget et le calendrier. Leur sérieux et la qualité de leurs finitions sont remarquables. Je les recommande sans hésitation pour tout projet de construction en Guinée.",
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
    body: `<p>Choisir des carreaux ne se résume pas à une question de couleur. Un mauvais choix peut entraîner des fissures, des glissades ou une usure prématurée. Voici les 5 critères que nos conseillers passent systématiquement en revue avec nos clients.</p>
<h2>1. La résistance à l'usure (classe PEI)</h2>
<p>La classe PEI (de I à V) indique la capacité d'un carreau à résister au passage. Pour une chambre, un PEI II suffit ; pour un salon ou un couloir, visez PEI III ou IV ; pour un commerce ou un hall très fréquenté, exigez du PEI V.</p>
<h2>2. Le coefficient de glissance</h2>
<p>Indispensable pour les salles de bains, cuisines, terrasses et abords de piscine. Recherchez les normes R10 à R13 (plus le chiffre est élevé, plus le carreau est antidérapant). Un carreau brillant est élégant mais glissant une fois mouillé.</p>
<h2>3. Le format et l'effet visuel</h2>
<p>Les grands formats (60×60, 80×80) agrandissent visuellement une pièce et réduisent le nombre de joints. Les petits formats conviennent mieux aux surfaces courbes et aux douches. Pensez à la pose : un grand format exige un sol parfaitement plan.</p>
<h2>4. La porosité et l'absorption d'eau</h2>
<p>La porcelaine (grès cérame pleine masse) absorbe très peu l'eau : idéale pour l'extérieur et les pièces humides sous notre climat. La faïence, plus poreuse, est réservée aux murs intérieurs.</p>
<h2>5. L'entretien et la durabilité</h2>
<p>Un carreau rectifié et traité se nettoie plus facilement et vieillit mieux. Prévoyez toujours 5 à 10 % de carreaux supplémentaires pour les coupes et les remplacements futurs.</p>
<p><strong>Besoin d'un conseil personnalisé ?</strong> Passez à notre showroom de Lambanyi : nous vous aidons à choisir le carreau adapté à chaque pièce et à votre budget.</p>`,
    cover_image: null,
    author: 'Équipe 2AC GROUPE',
    categories: ['BTP', 'Commerce'],
    status: 'published',
    published_at: '2024-10-15T08:00:00Z',
  },
  {
    slug: 'expedition-express-europe-comment-ca-marche',
    title: "Expédition express vers l'Europe : comment ça marche ?",
    excerpt:
      "De la collecte de votre colis à Conakry jusqu'à la livraison en France ou en Belgique en moins de 7 jours : découvrez le processus étape par étape de notre service de transport international.",
    body: `<p>Envoyer un colis de Conakry vers l'Europe en moins d'une semaine, c'est possible. Voici comment se déroule une expédition avec 2AC GROUPE, étape par étape.</p>
<h2>Étape 1 — La prise en charge</h2>
<p>Vous déposez votre colis dans nos locaux à Lambanyi, ou nous venons le récupérer. Nous pesons, mesurons et vérifions le contenu avec vous afin d'établir le bon tarif et de respecter la réglementation douanière.</p>
<h2>Étape 2 — L'emballage sécurisé</h2>
<p>Chaque envoi est ré-emballé selon les standards internationaux : protection contre les chocs, étanchéité, étiquetage normalisé. Un colis bien emballé, c'est un colis qui arrive intact.</p>
<h2>Étape 3 — Le suivi en ligne</h2>
<p>Vous recevez un numéro de suivi qui vous permet, via notre plateforme partenaire, de localiser votre colis à chaque étape : départ de Conakry, transit, arrivée en Europe, livraison finale.</p>
<h2>Étape 4 — Le dédouanement</h2>
<p>Nous gérons les formalités douanières au départ comme à l'arrivée. Notre maîtrise des procédures évite les blocages et les frais imprévus qui rallongent souvent les délais.</p>
<h2>Étape 5 — La livraison</h2>
<p>Votre destinataire est livré à domicile en France, en Belgique, au Royaume-Uni ou aux États-Unis, généralement en moins de 7 jours ouvrés, avec un taux de réussite de 99 %.</p>
<p><strong>Un colis à envoyer ?</strong> Contactez-nous pour obtenir un devis et le délai exact selon la destination.</p>`,
    cover_image: null,
    author: 'Équipe 2AC GROUPE',
    categories: ['Logistique'],
    status: 'published',
    published_at: '2024-11-20T08:00:00Z',
  },
  {
    slug: 'import-export-guinee-opportunites-2025',
    title: "Import-Export en Guinée : 5 secteurs porteurs en 2025",
    excerpt:
      "Matériaux de construction, produits alimentaires, équipements solaires... Quels sont les créneaux les plus prometteurs pour le commerce international guinéen cette année ?",
    body: `<p>L'économie guinéenne se diversifie et la demande de produits importés ne cesse de croître. Voici les cinq secteurs sur lesquels nous voyons le plus d'opportunités cette année.</p>
<h2>1. Les matériaux de construction</h2>
<p>Avec l'essor de l'immobilier à Conakry et dans les régions, la demande en ciment, carreaux, acier et équipements sanitaires reste très forte. Importer en volume permet de casser les prix.</p>
<h2>2. Les produits agroalimentaires</h2>
<p>Riz, huile, sucre, produits transformés : la chaîne d'approvisionnement alimentaire offre des marges régulières, à condition de maîtriser la logistique du froid et les délais.</p>
<h2>3. Les équipements solaires</h2>
<p>Panneaux, batteries et kits solaires répondent à un besoin réel d'autonomie énergétique. Un marché en pleine expansion, soutenu par la baisse des coûts mondiaux.</p>
<h2>4. Les équipements industriels et agricoles</h2>
<p>Groupes électrogènes, pompes, petit matériel agricole : ces biens d'équipement accompagnent la modernisation des PME guinéennes.</p>
<h2>5. Les biens de grande consommation</h2>
<p>Électroménager, téléphonie, produits d'hygiène : une demande de masse, portée par une population jeune et urbaine.</p>
<p><strong>Vous souhaitez importer ou exporter ?</strong> Notre équipe vous accompagne sur le sourcing, la négociation, le transport et le dédouanement, de bout en bout.</p>`,
    cover_image: null,
    author: 'Équipe 2AC GROUPE',
    categories: ['Import-Export', 'Conseil'],
    status: 'published',
    published_at: '2025-01-08T08:00:00Z',
  },
]

export const TEAM_DATA: Omit<TeamMember, 'id' | 'created_at'>[] = [
  {
    full_name: 'Directeur Général',
    role: 'Fondateur & Directeur Général',
    bio: "Fort de plus de 10 ans d'expérience dans le BTP, le commerce international et la logistique, notre fondateur a bâti 2AC GROUPE sur des valeurs d'excellence, de fiabilité et d'innovation au service du développement guinéen.",
    photo_url: null,
    is_ceo: true,
    sort_order: 1,
    status: 'published',
  },
]

// ============================================================
// Données de secours pour les sections éditables (migration 006).
// Mêmes valeurs que le contenu historiquement codé en dur → aucune
// régression si Supabase est indisponible.
// ============================================================

export const VALUES_DATA: Omit<ValueItem, 'id'>[] = [
  {
    icon: 'zap',
    title: 'Innovation',
    description:
      'Nous adoptons les meilleures pratiques et technologies pour vous offrir des solutions modernes adaptées au contexte guinéen et international.',
    sort_order: 1,
    status: 'published',
  },
  {
    icon: 'shield',
    title: 'Qualité',
    description:
      'Chaque projet, chaque colis, chaque livraison est traité avec la même exigence de qualité. Nos normes ne souffrent aucun compromis.',
    sort_order: 2,
    status: 'published',
  },
  {
    icon: 'handshake',
    title: 'Fiabilité',
    description:
      'Nos clients nous font confiance depuis 10 ans parce que nous tenons nos engagements : délais, budget, qualité. Toujours.',
    sort_order: 3,
    status: 'published',
  },
  {
    icon: 'layers',
    title: 'Polyvalence',
    description:
      "Notre ancrage dans 5 secteurs complémentaires nous permet de vous proposer des solutions intégrées que peu d'acteurs peuvent offrir.",
    sort_order: 4,
    status: 'published',
  },
]

export const STATS_DATA: Omit<StatItem, 'id'>[] = [
  { value: '10+', label: "Ans d'expérience", group: 'home', sort_order: 1, status: 'published' },
  { value: '99%', label: 'Taux de réussite logistique', group: 'home', sort_order: 2, status: 'published' },
  { value: '5', label: "Pôles d'activité", group: 'home', sort_order: 3, status: 'published' },
  { value: '150+', label: 'Projets réalisés', group: 'home', sort_order: 4, status: 'published' },
  { value: '80+', label: 'Projets BTP', group: 'realisations', sort_order: 1, status: 'published' },
  { value: '2 000+', label: 'Expéditions logistiques', group: 'realisations', sort_order: 2, status: 'published' },
  { value: '50+', label: 'Opérations import-export', group: 'realisations', sort_order: 3, status: 'published' },
]

export const TIMELINE_DATA: Omit<TimelineEvent, 'id'>[] = [
  { year: '2014', title: 'Fondation', description: 'Création de 2AC GROUPE à Conakry, initialement focalisée sur le BTP résidentiel.', sort_order: 1, status: 'published' },
  { year: '2016', title: 'Expansion commerce', description: "Ouverture de l'activité de vente de carreaux et produits de finition pour les professionnels du bâtiment.", sort_order: 2, status: 'published' },
  { year: '2018', title: 'Logistique internationale', description: "Lancement du service d'expédition express vers l'Europe et les États-Unis, en partenariat avec Kotedi.com.", sort_order: 3, status: 'published' },
  { year: '2020', title: 'Import-Export', description: "Développement de l'activité import-export : matériaux BTP, agroalimentaire et équipements industriels.", sort_order: 4, status: 'published' },
  { year: '2022', title: 'Conseil & Services', description: 'Ouverture du pôle conseil pour accompagner les entrepreneurs et institutions dans leurs projets de développement.', sort_order: 5, status: 'published' },
  { year: '2024', title: "Aujourd'hui", description: "5 secteurs, 150+ projets réalisés, une équipe soudée et des clients fidèles à travers l'Afrique, l'Europe et les USA.", sort_order: 6, status: 'published' },
]

export const SECTION_SETTINGS = {
  mission: {
    title: 'Notre mission',
    body: "Fournir à nos clients des solutions intégrées et fiables qui couvrent l'ensemble de leur chaîne de valeur : de l'approvisionnement international à la livraison finale, en passant par la construction et la finition.\n\nNous croyons que la Guinée et l'Afrique de l'Ouest ont besoin d'entreprises capables de tenir des engagements à la hauteur des standards internationaux, tout en comprenant les réalités locales.",
  },
  vision: {
    title: 'Notre vision',
    body: "Devenir la référence incontournable en Guinée et dans la sous-région pour les entreprises et particuliers qui cherchent un partenaire unique, compétent et honnête pour leurs projets multisectoriels.\n\nNous voulons contribuer au développement économique durable de la Guinée en créant des emplois qualifiés, en transférant des compétences et en facilitant les échanges internationaux.",
  },
  why_choose: {
    heading: 'Une entreprise guinéenne aux standards internationaux',
    intro:
      "2AC GROUPE est née de la conviction que la Guinée mérite des partenaires commerciaux qui combinent ancrage local, expertise métier et exigences de niveau international. Notre force réside dans notre capacité à intervenir de bout en bout : sourcing à l'étranger, import, construction, finition, livraison.",
    bullets: [
      'Interlocuteur unique pour des besoins multiples',
      'Équipe expérimentée et disponible',
      'Réseau de partenaires certifiés en Europe et aux USA',
      'Transparence totale sur les coûts et les délais',
    ],
  },
  ceo_message: {
    quote:
      'Chez 2AC GROUPE, nous avons bâti notre réputation sur une conviction simple : nos clients méritent le meilleur. Pas seulement en termes de qualité de prestation, mais aussi en termes de transparence, de ponctualité et de respect. Chaque projet que nous acceptons, nous nous y engageons entièrement.',
  },
}
