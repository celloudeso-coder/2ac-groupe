-- ============================================================
-- 2AC GROUPE — Migration 004 : back-office CMS
-- ------------------------------------------------------------
--  1. Buckets de stockage (images) : lecture publique, écriture admin
--  2. Création automatique du profil à l'inscription (auth.users → profiles)
--  3. Rebrand du contenu déjà en base : « 2AC SARL » → « 2AC GROUPE »
-- Idempotent : peut être rejoué sans risque.
-- ============================================================

-- ===== 1. Buckets de stockage =====
insert into storage.buckets (id, name, public)
values
  ('projects', 'projects', true),
  ('blog',     'blog',     true),
  ('team',     'team',     true),
  ('brand',    'brand',    true)
on conflict (id) do update set public = excluded.public;

-- Politiques sur storage.objects :
--  - lecture publique (les images du site sont publiques) ;
--  - insertion / mise à jour / suppression réservées aux administrateurs.
drop policy if exists "2ac storage public read" on storage.objects;
create policy "2ac storage public read" on storage.objects
  for select
  using (bucket_id in ('projects', 'blog', 'team', 'brand'));

drop policy if exists "2ac storage admin insert" on storage.objects;
create policy "2ac storage admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('projects', 'blog', 'team', 'brand') and public.is_admin());

drop policy if exists "2ac storage admin update" on storage.objects;
create policy "2ac storage admin update" on storage.objects
  for update to authenticated
  using (bucket_id in ('projects', 'blog', 'team', 'brand') and public.is_admin());

drop policy if exists "2ac storage admin delete" on storage.objects;
create policy "2ac storage admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('projects', 'blog', 'team', 'brand') and public.is_admin());

-- ===== 2. Profil automatique à l'inscription =====
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===== 3. Rebrand du contenu déjà en base =====
update public.site_settings
   set value = jsonb_set(value, '{name}', '"2AC GROUPE"')
 where key = 'company';

update public.services
   set body = replace(body, '2AC SARL', '2AC GROUPE')
 where body like '%2AC SARL%';

update public.blog_posts
   set body   = replace(coalesce(body, ''),   '2AC SARL', '2AC GROUPE'),
       author = replace(coalesce(author, ''), '2AC SARL', '2AC GROUPE')
 where body like '%2AC SARL%' or author like '%2AC SARL%';

update public.testimonials
   set content = replace(content, '2AC SARL', '2AC GROUPE')
 where content like '%2AC SARL%';

update public.team_members
   set bio = replace(coalesce(bio, ''), '2AC SARL', '2AC GROUPE')
 where bio like '%2AC SARL%';

-- ============================================================
-- APRÈS la migration : promouvoir un compte en administrateur.
-- 1) Créer l'utilisateur dans Supabase → Authentication → Users (email + mot de passe).
-- 2) Exécuter (en remplaçant l'email) :
--
--   update public.profiles set is_admin = true
--    where id = (select id from auth.users where email = 'admin@2ac-gn.com');
--
-- Cet utilisateur pourra alors se connecter sur /admin/login.
-- ============================================================
