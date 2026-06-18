-- ============================================================
-- 2AC SARL — Seed de contenu éditorial (projets, blog, témoignages, équipe)
-- À exécuter APRÈS 001_initial.sql. Idempotent : peut être rejoué sans doublon.
-- N'altère PAS le schéma (source de vérité unique = 001_initial.sql).
-- ============================================================

-- ----- PROJETS (portfolio) -----
insert into public.projects
  (slug, title, description, location, project_date, featured, sort_order, status)
values
  ('villa-lambanyi-r1','Villa R+1 à Lambanyi',
   'Construction clés en main d''une villa résidentielle de 350 m² avec sous-sol, salon double, 5 chambres et piscine. Réalisée en 14 mois avec des finitions haut de gamme.',
   'Lambanyi, Conakry','2023-08-01', true, 1, 'published'),
  ('immeuble-commercial-kaloum','Immeuble commercial R+3',
   'Construction d''un immeuble à usage mixte (bureaux et commerces) de 1 200 m² au cœur du quartier Kaloum, livré clés en main en 18 mois.',
   'Kaloum, Conakry','2022-12-01', true, 2, 'published'),
  ('renovation-ecole-primaire','Réhabilitation école primaire',
   'Rénovation complète d''une école primaire de 12 salles de classe : toiture, sols en carreaux, menuiseries aluminium et peinture. Financement public.',
   'Ratoma, Conakry','2024-03-01', true, 3, 'published'),
  ('magasin-carreaux-ratoma','Aménagement showroom carreaux',
   'Conception et réalisation complète d''un showroom de 200 m² pour l''exposition de carreaux et produits de finition, incluant une zone conseil et un espace de stockage.',
   'Ratoma, Conakry','2023-05-01', false, 4, 'published'),
  ('expeditions-europe-2023','Expéditions express — Europe 2023',
   'Traitement de plus de 800 expéditions express vers la France, la Belgique et le Royaume-Uni en 2023, avec un taux de livraison dans les délais de 99,2 %.',
   'Conakry → Europe','2023-12-31', false, 5, 'published'),
  ('import-carreaux-espagne','Import de carreaux depuis l''Espagne',
   'Organisation de 4 conteneurs de carreaux et produits de finition depuis Valence (Espagne) pour approvisionner des promoteurs immobiliers guinéens.',
   'Espagne → Conakry','2024-02-01', false, 6, 'published')
on conflict (slug) do nothing;

-- ----- BLOG -----
insert into public.blog_posts
  (slug, title, excerpt, body, author, categories, status, published_at)
values
  ('5-criteres-pour-choisir-vos-carreaux',
   '5 critères essentiels pour bien choisir vos carreaux',
   'Résistance, format, coefficient de glissance, entretien : notre guide pratique pour ne pas se tromper lors de l''achat de carreaux pour votre maison ou votre commerce.',
   $html$<p>Choisir des carreaux ne se résume pas à une question de couleur. Un mauvais choix peut entraîner des fissures, des glissades ou une usure prématurée. Voici les 5 critères que nos conseillers passent systématiquement en revue avec nos clients.</p>
<h2>1. La résistance à l'usure (classe PEI)</h2>
<p>La classe PEI (de I à V) indique la capacité d'un carreau à résister au passage. Pour une chambre, un PEI II suffit ; pour un salon ou un couloir, visez PEI III ou IV ; pour un commerce ou un hall très fréquenté, exigez du PEI V.</p>
<h2>2. Le coefficient de glissance</h2>
<p>Indispensable pour les salles de bains, cuisines, terrasses et abords de piscine. Recherchez les normes R10 à R13 (plus le chiffre est élevé, plus le carreau est antidérapant). Un carreau brillant est élégant mais glissant une fois mouillé.</p>
<h2>3. Le format et l'effet visuel</h2>
<p>Les grands formats (60×60, 80×80) agrandissent visuellement une pièce et réduisent le nombre de joints. Les petits formats conviennent mieux aux surfaces courbes et aux douches.</p>
<h2>4. La porosité et l'absorption d'eau</h2>
<p>La porcelaine (grès cérame pleine masse) absorbe très peu l'eau : idéale pour l'extérieur et les pièces humides. La faïence, plus poreuse, est réservée aux murs intérieurs.</p>
<h2>5. L'entretien et la durabilité</h2>
<p>Un carreau rectifié et traité se nettoie plus facilement et vieillit mieux. Prévoyez toujours 5 à 10 % de carreaux supplémentaires pour les coupes et les remplacements futurs.</p>
<p><strong>Besoin d'un conseil personnalisé ?</strong> Passez à notre showroom de Lambanyi.</p>$html$,
   'Équipe 2AC SARL', '["BTP","Commerce"]', 'published', '2024-10-15T08:00:00Z'),
  ('expedition-express-europe-comment-ca-marche',
   'Expédition express vers l''Europe : comment ça marche ?',
   'De la collecte de votre colis à Conakry jusqu''à la livraison en France ou en Belgique en moins de 7 jours : découvrez le processus étape par étape de notre service de transport international.',
   $html$<p>Envoyer un colis de Conakry vers l'Europe en moins d'une semaine, c'est possible. Voici comment se déroule une expédition avec 2AC SARL, étape par étape.</p>
<h2>Étape 1 — La prise en charge</h2>
<p>Vous déposez votre colis dans nos locaux à Lambanyi, ou nous venons le récupérer. Nous pesons, mesurons et vérifions le contenu avec vous.</p>
<h2>Étape 2 — L'emballage sécurisé</h2>
<p>Chaque envoi est ré-emballé selon les standards internationaux : protection contre les chocs, étanchéité, étiquetage normalisé.</p>
<h2>Étape 3 — Le suivi en ligne</h2>
<p>Vous recevez un numéro de suivi qui vous permet de localiser votre colis à chaque étape via notre plateforme partenaire.</p>
<h2>Étape 4 — Le dédouanement</h2>
<p>Nous gérons les formalités douanières au départ comme à l'arrivée, ce qui évite les blocages et les frais imprévus.</p>
<h2>Étape 5 — La livraison</h2>
<p>Votre destinataire est livré à domicile en Europe ou aux États-Unis, généralement en moins de 7 jours ouvrés, avec un taux de réussite de 99 %.</p>
<p><strong>Un colis à envoyer ?</strong> Contactez-nous pour un devis et le délai exact.</p>$html$,
   'Équipe 2AC SARL', '["Logistique"]', 'published', '2024-11-20T08:00:00Z'),
  ('import-export-guinee-opportunites-2025',
   'Import-Export en Guinée : 5 secteurs porteurs en 2025',
   'Matériaux de construction, produits alimentaires, équipements solaires... Quels sont les créneaux les plus prometteurs pour le commerce international guinéen cette année ?',
   $html$<p>L'économie guinéenne se diversifie et la demande de produits importés ne cesse de croître. Voici les cinq secteurs sur lesquels nous voyons le plus d'opportunités cette année.</p>
<h2>1. Les matériaux de construction</h2>
<p>Avec l'essor de l'immobilier, la demande en ciment, carreaux, acier et équipements sanitaires reste très forte.</p>
<h2>2. Les produits agroalimentaires</h2>
<p>Riz, huile, sucre, produits transformés : une chaîne d'approvisionnement à marges régulières.</p>
<h2>3. Les équipements solaires</h2>
<p>Panneaux, batteries et kits solaires répondent à un besoin réel d'autonomie énergétique.</p>
<h2>4. Les équipements industriels et agricoles</h2>
<p>Groupes électrogènes, pompes, petit matériel agricole accompagnent la modernisation des PME.</p>
<h2>5. Les biens de grande consommation</h2>
<p>Électroménager, téléphonie, produits d'hygiène : une demande de masse portée par une population jeune.</p>
<p><strong>Vous souhaitez importer ou exporter ?</strong> Nous vous accompagnons de bout en bout.</p>$html$,
   'Équipe 2AC SARL', '["Import-Export","Conseil"]', 'published', '2025-01-08T08:00:00Z')
on conflict (slug) do nothing;

-- ----- TÉMOIGNAGES (idempotent : seedé uniquement si la table est vide) -----
insert into public.testimonials (author_name, company, content, rating, sort_order, status)
select * from (values
  ('Mamadou Baldé','Directeur, Groupe Balkis Immobilier',
   '2AC SARL a construit notre siège social en respectant à la lettre le budget et le calendrier. Leur sérieux et la qualité de leurs finitions sont remarquables. Je les recommande sans hésitation pour tout projet de construction en Guinée.',
   5, 1, 'published'),
  ('Fatoumata Diallo','Commerçante, Paris (France)',
   'J''utilise le service d''expédition de 2AC depuis 2 ans pour envoyer des colis à ma famille en Guinée. Les délais sont toujours respectés, les colis arrivent en parfait état. Un service digne des grandes compagnies internationales.',
   5, 2, 'published'),
  ('Alpha Oumar Camara','Promoteur immobilier, Conakry',
   'Excellente expérience avec 2AC pour l''import de carreaux et matériaux de finition depuis l''Espagne. Gestion douanière impeccable, livraison en 3 semaines. Mes chantiers ne connaissent plus de rupture de stock.',
   5, 3, 'published')
) as t(author_name, company, content, rating, sort_order, status)
where not exists (select 1 from public.testimonials);

-- ----- ÉQUIPE -----
-- Mot du dirigeant : seedé en 'draft' (invisible) tant que le NOM RÉEL et la
-- PHOTO ne sont pas fournis par le client. À publier après mise à jour.
insert into public.team_members (full_name, role, bio, is_ceo, sort_order, status)
select * from (values
  ('À renseigner — Directeur Général','Fondateur & Directeur Général',
   'Fort de plus de 10 ans d''expérience dans le BTP, le commerce international et la logistique, le fondateur a bâti 2AC SARL sur des valeurs d''excellence, de fiabilité et d''innovation au service du développement guinéen.',
   true, 1, 'draft')
) as t(full_name, role, bio, is_ceo, sort_order, status)
where not exists (select 1 from public.team_members);
