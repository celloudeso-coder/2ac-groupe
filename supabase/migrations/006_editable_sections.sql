-- ============================================================
-- 2AC GROUPE — Migration 006 : sections de contenu éditables
-- ------------------------------------------------------------
-- Rend éditables via le back-office des blocs aujourd'hui codés en dur :
--   - listes répétables  → nouvelles tables : values, stats, timeline_events
--   - singletons texte   → site_settings : mission, vision, why_choose, ceo_message
-- ADDITIVE & idempotente. RLS calquée sur le pattern existant
-- (lecture publique du published, écriture is_admin()). Seeds = contenu EXACT
-- actuellement codé en dur → aucune régression visuelle.
-- ============================================================

-- ===== 1a. Table VALUES (Innovation/Qualité/Fiabilité/Polyvalence) =====
create table if not exists public.values (
  id          uuid primary key default gen_random_uuid(),
  icon        text,
  title       text not null,
  description text,
  sort_order  int not null default 0,
  status      content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_values_updated on public.values;
create trigger trg_values_updated before update on public.values
  for each row execute function public.set_updated_at();

insert into public.values (icon, title, description, sort_order, status)
select icon, title, description, sort_order, status_text::content_status from (values
  ('zap','Innovation','Nous adoptons les meilleures pratiques et technologies pour vous offrir des solutions modernes adaptées au contexte guinéen et international.',1,'published'),
  ('shield','Qualité','Chaque projet, chaque colis, chaque livraison est traité avec la même exigence de qualité. Nos normes ne souffrent aucun compromis.',2,'published'),
  ('handshake','Fiabilité','Nos clients nous font confiance depuis 10 ans parce que nous tenons nos engagements : délais, budget, qualité. Toujours.',3,'published'),
  ('layers','Polyvalence','Notre ancrage dans 5 secteurs complémentaires nous permet de vous proposer des solutions intégrées que peu d''acteurs peuvent offrir.',4,'published')
) as t(icon,title,description,sort_order,status_text)
where not exists (select 1 from public.values);

-- ===== 1b. Table STATS (barres de chiffres-clés) =====
create table if not exists public.stats (
  id          uuid primary key default gen_random_uuid(),
  value       text not null,
  label       text not null,
  "group"     text not null default 'home',
  sort_order  int not null default 0,
  status      content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_stats_updated on public.stats;
create trigger trg_stats_updated before update on public.stats
  for each row execute function public.set_updated_at();

insert into public.stats (value, label, "group", sort_order, status)
select value, label, grp, sort_order, status_text::content_status from (values
  ('10+','Ans d''expérience','home',1,'published'),
  ('99%','Taux de réussite logistique','home',2,'published'),
  ('5','Pôles d''activité','home',3,'published'),
  ('150+','Projets réalisés','home',4,'published'),
  ('80+','Projets BTP','realisations',1,'published'),
  ('2 000+','Expéditions logistiques','realisations',2,'published'),
  ('50+','Opérations import-export','realisations',3,'published')
) as t(value,label,grp,sort_order,status_text)
where not exists (select 1 from public.stats);

-- ===== 1c. Table TIMELINE_EVENTS (Notre histoire) =====
create table if not exists public.timeline_events (
  id          uuid primary key default gen_random_uuid(),
  year        text not null,
  title       text not null,
  description text,
  sort_order  int not null default 0,
  status      content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_timeline_updated on public.timeline_events;
create trigger trg_timeline_updated before update on public.timeline_events
  for each row execute function public.set_updated_at();

insert into public.timeline_events (year, title, description, sort_order, status)
select year, title, descr, sort_order, status_text::content_status from (values
  ('2014','Fondation','Création de 2AC GROUPE à Conakry, initialement focalisée sur le BTP résidentiel.',1,'published'),
  ('2016','Expansion commerce','Ouverture de l''activité de vente de carreaux et produits de finition pour les professionnels du bâtiment.',2,'published'),
  ('2018','Logistique internationale','Lancement du service d''expédition express vers l''Europe et les États-Unis, en partenariat avec Kotedi.com.',3,'published'),
  ('2020','Import-Export','Développement de l''activité import-export : matériaux BTP, agroalimentaire et équipements industriels.',4,'published'),
  ('2022','Conseil & Services','Ouverture du pôle conseil pour accompagner les entrepreneurs et institutions dans leurs projets de développement.',5,'published'),
  ('2024','Aujourd''hui','5 secteurs, 150+ projets réalisés, une équipe soudée et des clients fidèles à travers l''Afrique, l''Europe et les USA.',6,'published')
) as t(year,title,descr,sort_order,status_text)
where not exists (select 1 from public.timeline_events);

-- ===== 1d. RLS sur les 3 nouvelles tables (pattern services) =====
alter table public.values          enable row level security;
alter table public.stats           enable row level security;
alter table public.timeline_events enable row level security;

do $$
declare t text;
begin
  foreach t in array array['values','stats','timeline_events'] loop
    execute format($f$
      drop policy if exists "%1$s public read" on public.%1$s;
      create policy "%1$s public read" on public.%1$s
        for select using (status = 'published' or public.is_admin());
      drop policy if exists "%1$s admin write" on public.%1$s;
      create policy "%1$s admin write" on public.%1$s
        for all using (public.is_admin()) with check (public.is_admin());
    $f$, t);
  end loop;
end$$;

-- ===== 1e. Singletons texte dans site_settings =====
insert into public.site_settings (key, value) values
('mission', jsonb_build_object(
  'title', 'Notre mission',
  'body', $b$Fournir à nos clients des solutions intégrées et fiables qui couvrent l'ensemble de leur chaîne de valeur : de l'approvisionnement international à la livraison finale, en passant par la construction et la finition.

Nous croyons que la Guinée et l'Afrique de l'Ouest ont besoin d'entreprises capables de tenir des engagements à la hauteur des standards internationaux, tout en comprenant les réalités locales.$b$
)),
('vision', jsonb_build_object(
  'title', 'Notre vision',
  'body', $b$Devenir la référence incontournable en Guinée et dans la sous-région pour les entreprises et particuliers qui cherchent un partenaire unique, compétent et honnête pour leurs projets multisectoriels.

Nous voulons contribuer au développement économique durable de la Guinée en créant des emplois qualifiés, en transférant des compétences et en facilitant les échanges internationaux.$b$
)),
('why_choose', jsonb_build_object(
  'heading', 'Une entreprise guinéenne aux standards internationaux',
  'intro', $b$2AC GROUPE est née de la conviction que la Guinée mérite des partenaires commerciaux qui combinent ancrage local, expertise métier et exigences de niveau international. Notre force réside dans notre capacité à intervenir de bout en bout : sourcing à l'étranger, import, construction, finition, livraison.$b$,
  'bullets', jsonb_build_array(
    'Interlocuteur unique pour des besoins multiples',
    'Équipe expérimentée et disponible',
    'Réseau de partenaires certifiés en Europe et aux USA',
    'Transparence totale sur les coûts et les délais'
  )
)),
('ceo_message', jsonb_build_object(
  'quote', $b$Chez 2AC GROUPE, nous avons bâti notre réputation sur une conviction simple : nos clients méritent le meilleur. Pas seulement en termes de qualité de prestation, mais aussi en termes de transparence, de ponctualité et de respect. Chaque projet que nous acceptons, nous nous y engageons entièrement.$b$
))
on conflict (key) do nothing;
