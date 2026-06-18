-- ============================================================
-- 2AC SARL — Site vitrine multisectoriel
-- Migration initiale : schéma + RLS + seed
-- Cible : Supabase (PostgreSQL)
-- ============================================================

-- ----- Extensions -----
create extension if not exists "pgcrypto";

-- ----- Types -----
create type content_status   as enum ('draft', 'published', 'archived');
create type submission_type   as enum ('contact', 'devis');
create type submission_status as enum ('new', 'in_progress', 'closed');

-- ----- Fonction utilitaire : updated_at -----
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- PROFILES (rôles)
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Vérif admin (SECURITY DEFINER pour éviter la récursion RLS)
create or replace function public.is_admin()
returns boolean language sql security definer stable
set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  );
$$;

-- ============================================================
-- SERVICES (les 5 domaines)
-- ============================================================
create table public.services (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  short_desc    text,
  body          text,                 -- contenu riche (markdown/html)
  icon          text,                 -- nom d'icône (lucide)
  engagements   jsonb default '[]',   -- ["Respect des délais", ...]
  prestations   jsonb default '[]',   -- ["Construction neuve", ...]
  cover_image   text,
  sort_order    int  not null default 0,
  status        content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_services_updated before update on public.services
  for each row execute function public.set_updated_at();

-- ============================================================
-- PROJECTS (portfolio)
-- ============================================================
create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  service_id    uuid references public.services(id) on delete set null,
  description   text,
  location      text,
  images        jsonb default '[]',   -- liste d'URLs storage
  cover_image   text,
  project_date  date,
  featured      boolean not null default false,
  sort_order    int not null default 0,
  status        content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  author_name  text not null,
  company      text,
  content      text not null,
  rating       int check (rating between 1 and 5),
  avatar_url   text,
  sort_order   int not null default 0,
  status       content_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger trg_testimonials_updated before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ============================================================
-- BLOG
-- ============================================================
create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  body         text,
  cover_image  text,
  author       text,
  categories   jsonb default '[]',    -- ["Business", "Transport"]
  status       content_status not null default 'draft',
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger trg_blog_updated before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ============================================================
-- TEAM
-- ============================================================
create table public.team_members (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  role         text,
  bio          text,
  photo_url    text,
  is_ceo       boolean not null default false,
  sort_order   int not null default 0,
  status       content_status not null default 'draft',
  created_at   timestamptz not null default now()
);

-- ============================================================
-- CONTACT / DEVIS
-- ============================================================
create table public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  type         submission_type not null default 'contact',
  full_name    text not null,
  email        text not null,
  phone        text,
  subject      text,
  message      text not null,
  consent      boolean not null default false,
  status       submission_status not null default 'new',
  created_at   timestamptz not null default now()
);

-- ============================================================
-- SITE SETTINGS (clé/valeur)
-- ============================================================
create table public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- RLS
-- ============================================================
alter table public.profiles            enable row level security;
alter table public.services            enable row level security;
alter table public.projects            enable row level security;
alter table public.testimonials        enable row level security;
alter table public.blog_posts          enable row level security;
alter table public.team_members        enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.site_settings       enable row level security;

-- Profiles : chacun voit/édite son profil ; admin voit tout
create policy "profiles self read"   on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);

-- Contenu public : lecture des éléments publiés (anon + auth), écriture admin
do $$
declare t text;
begin
  foreach t in array array['services','projects','testimonials','blog_posts','team_members'] loop
    execute format($f$
      create policy "%1$s public read"  on public.%1$s
        for select using (status = 'published' or public.is_admin());
      create policy "%1$s admin write" on public.%1$s
        for all using (public.is_admin()) with check (public.is_admin());
    $f$, t);
  end loop;
end$$;

-- Site settings : lecture publique, écriture admin
create policy "settings public read"  on public.site_settings for select using (true);
create policy "settings admin write"  on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Soumissions : insertion publique (formulaire), lecture/gestion admin uniquement
create policy "submissions public insert" on public.contact_submissions
  for insert with check (true);
create policy "submissions admin read"    on public.contact_submissions
  for select using (public.is_admin());
create policy "submissions admin update"  on public.contact_submissions
  for update using (public.is_admin());

-- ============================================================
-- SEED — données réelles 2AC SARL
-- ============================================================
insert into public.site_settings (key, value) values
('company', jsonb_build_object(
  'name','2AC SARL',
  'tagline','Une société multisectorielle au service de vos ambitions',
  'address','Lambanyi, Conakry, République de Guinée',
  'phones', jsonb_build_array('+224 629 04 57 44'),
  'emails', jsonb_build_array('contact@2ac-gn.com','info@2ac-gn.com'),
  'years_experience', 10
)),
('hours', jsonb_build_object(
  'mon_fri','08h00 – 18h00',
  'sat','09h00 – 13h00',
  'sun','Fermé'
));

insert into public.services (slug, title, short_desc, icon, engagements, prestations, sort_order, status) values
('btp','Bâtiment & Travaux Publics',
 'Construction, rénovation et aménagement d''infrastructures.','building-2',
 '["Respect strict des délais","Qualité d''exécution","Suivi rigoureux de chantier","Satisfaction client"]',
 '["Construction neuve (résidentiel, commercial, institutionnel)","Rénovation et réhabilitation","Aménagement intérieur et extérieur","Infrastructures et travaux publics"]',
 1,'published'),
('commerce-general','Commerce général',
 'Vente de carreaux et produits de finition pour le bâtiment.','store',
 '["Produits durables sélectionnés","Bon rapport qualité-prix","Large gamme","Conseil technique"]',
 '["Carreaux céramiques et porcelaine","Faïence salle de bains et cuisine","Jointoiement et accessoires de pose","Livraison rapide sur chantier"]',
 2,'published'),
('logistique-transport','Logistique & transport international',
 'Expédition rapide et sécurisée vers l''Europe et les USA.','truck',
 '["Livraison express (< 1 semaine)","Traitement minutieux","Fiabilité 99%","Traçabilité complète"]',
 '["Transport express international (Europe, USA)","Suivi de bout en bout","Acheminement sécurisé","Solutions sur mesure"]',
 3,'published'),
('import-export','Import-Export',
 'Commerce international de biens et produits divers.','globe',
 '["Réseau de partenaires certifiés","Gestion des douanes","Solutions sur mesure","Suivi en temps réel"]',
 '["Matériaux BTP et équipements","Produits agroalimentaires","Équipements industriels","Biens de grande consommation"]',
 4,'published'),
('conseil','Conseil & services',
 'Assistance technique et stratégique pour vos projets.','lightbulb',
 '["Accompagnement expert","Approche personnalisée"]',
 '["Assistance technique et stratégique","Études de faisabilité","Optimisation des processus"]',
 5,'published');
