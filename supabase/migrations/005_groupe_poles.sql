-- ============================================================
-- 2AC GROUPE — Migration 005 : structure de GROUPE (5 pôles)
-- ------------------------------------------------------------
-- Évolution « une entreprise / 5 services » → « un groupe / 5 pôles ».
-- ADDITIVE uniquement : ADD COLUMN / UPDATE / INSERT. Aucun DROP/DELETE.
-- Les pôles retirés passent en status='archived' (pas de suppression).
-- Idempotent : peut être rejouée sans doublon ni erreur.
-- ============================================================

-- ===== 1a. Colonnes additives sur services (table de pôles) =====
alter table public.services
  add column if not exists brand_name    text,
  add column if not exists logo_url      text,
  add column if not exists accent_color  text,
  add column if not exists tagline       text,
  add column if not exists contact_email text,
  add column if not exists contact_phone text,
  add column if not exists website_url   text;

-- ===== 1b. Re-seed des 5 pôles actifs =====

-- 1) BTP / Construction (existant) — accent rouge de marque
update public.services
   set accent_color = '#E53323',
       brand_name   = coalesce(brand_name, '2AC BTP'),
       status       = 'published'
 where slug = 'btp';

-- 2) Commerce général → marque PLANÈTE
update public.services
   set brand_name   = 'PLANÈTE Carrelages & Finitions',
       accent_color = '#1E3A8A',
       tagline      = 'Fourniture de carrelage & produits de finition',
       status       = 'published'
 where slug = 'commerce-general';

-- 3) Logistique-transport → 2AC TRANSIT (rebrand du slug)
update public.services
   set slug         = '2ac-transit',
       title        = '2AC TRANSIT',
       brand_name   = '2AC TRANSIT',
       tagline      = 'Transport & logistique',
       accent_color = '#E53323',
       status       = 'published'
 where slug = 'logistique-transport';

-- 4) 2AC CleanTech (nouveau pôle)
insert into public.services
  (slug, title, brand_name, short_desc, tagline, icon, accent_color, engagements, prestations, sort_order, status, body)
values
  ('cleantech', 'Nettoyage & Assainissement', '2AC CleanTech',
   'Nettoyage, assainissement et hygiène des bâtiments et espaces.',
   'Hygiène et propreté professionnelles', 'sparkles', '#16803C',
   '["Hygiène et salubrité garanties","Personnel formé et équipé","Produits adaptés et conformes","Intervention rapide"]'::jsonb,
   '["Nettoyage industriel et technique","Entretien de bureaux et bâtiments administratifs","Désinfection et assainissement","Nettoyage après chantier","Entretien des espaces verts","Nettoyage de vitres et façades","Gestion et évacuation des déchets","Dératisation et désinsectisation","Maintenance et hygiène des locaux","Fourniture de produits et matériels de nettoyage"]'::jsonb,
   6, 'published',
   $html$<h2>Propreté et assainissement professionnels</h2>
<p>2AC CleanTech assure le nettoyage, l'assainissement et l'hygiène des bâtiments, bureaux et espaces, avec un personnel formé et des produits conformes. Nos équipes interviennent rapidement, pour des prestations ponctuelles comme pour des contrats d'entretien régulier.</p>
<h2>En complément du BTP</h2>
<p>CleanTech prolonge naturellement notre pôle Construction : le <strong>nettoyage après chantier</strong> permet de livrer des locaux propres et prêts à l'usage. Du gros œuvre à la remise des clés, le groupe couvre l'ensemble de la chaîne.</p>$html$)
on conflict (slug) do update set
  title = excluded.title, brand_name = excluded.brand_name, short_desc = excluded.short_desc,
  tagline = excluded.tagline, icon = excluded.icon, accent_color = excluded.accent_color,
  engagements = excluded.engagements, prestations = excluded.prestations,
  sort_order = excluded.sort_order, status = excluded.status, body = excluded.body;

-- 5) Ferrorail Service Guinée (FRS) — entité technique affiliée, contacts propres
insert into public.services
  (slug, title, brand_name, short_desc, tagline, icon, accent_color,
   contact_email, contact_phone, website_url, engagements, prestations, sort_order, status, body)
values
  ('ferrorail', 'Ingénierie & Infrastructures ferroviaires', 'Ferrorail Service Guinée (FRS)',
   'Ingénierie, infrastructures ferroviaires et solutions énergétiques.',
   'Votre partenaire technique pour des infrastructures modernes, fiables et durables.',
   'train-front', '#1B3A6B',
   'Contact@ferrorailservice-gn.com', '+224 612 555 572', 'https://www.ferrorail-service.com',
   '["Sécurité — respect des normes et procédures","Fiabilité — solutions solides et durables","Expertise — savoir-faire technique","Réactivité — réponse efficace au terrain"]'::jsonb,
   '["Expertise ferroviaire","Compétence énergétique","Approche terrain","Sécurité","Accompagnement","Performance"]'::jsonb,
   7, 'published',
   $html$<h2>Ferroviaire</h2>
<p>Création et modernisation de passages à niveau, signalisation ferroviaire, équipements ferroviaires, sécurité de chantier et maintenance des infrastructures.</p>
<h2>Énergie</h2>
<p>Installations électriques industrielles et tertiaires, distribution d'énergie, énergies renouvelables (photovoltaïque) et optimisation énergétique.</p>
<h2>Compétences & équipements</h2>
<p>Formations (sécurité ferroviaire, organisation de chantiers, métiers techniques, prévention des risques) et fourniture de matériel ferroviaire spécialisé, BTP et électrique.</p>$html$)
on conflict (slug) do update set
  title = excluded.title, brand_name = excluded.brand_name, short_desc = excluded.short_desc,
  tagline = excluded.tagline, icon = excluded.icon, accent_color = excluded.accent_color,
  contact_email = excluded.contact_email, contact_phone = excluded.contact_phone,
  website_url = excluded.website_url, engagements = excluded.engagements,
  prestations = excluded.prestations, sort_order = excluded.sort_order,
  status = excluded.status, body = excluded.body;

-- ===== 1c. Pôles retirés → archivés (jamais supprimés) =====
update public.services
   set status = 'archived'
 where slug in ('import-export', 'conseil');

-- ===== 1d. Données légales & coordonnées du groupe (site_settings) =====
update public.site_settings
   set value = value || jsonb_build_object(
        'name', '2AC GROUPE',
        'legalName', '2AC GROUPE SARL',
        'address', 'Lambanyi (face de la banque VISTA), Commune de Lambanyi, Conakry'
      ),
       updated_at = now()
 where key = 'company';

insert into public.site_settings (key, value)
values ('legal', jsonb_build_object(
   'legalName', '2AC GROUPE SARL',
   'rccm',      'RCCM/GN.TCC.2026.B.02387 du 16 Février 2026',
   'capital',   '30 000 000 GNF',
   'gerant',    'Camara Amadou',
   'cogerante', 'Hadja Djeinabou Dramé',
   'address',   'Lambanyi (face de la banque VISTA), Commune de Lambanyi, Conakry'
))
on conflict (key) do update set value = excluded.value, updated_at = now();
