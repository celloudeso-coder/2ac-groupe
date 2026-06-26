-- ============================================================
-- 2AC GROUPE — Migration 008 : partenaires (bandeau défilant « À propos »)
-- ------------------------------------------------------------
-- NB : nommée 008 car 007 est déjà utilisée (007_submissions_delete_policy).
-- ADDITIVE & idempotente. RLS calquée sur le pattern existant
-- (lecture publique du published, écriture is_admin()). AUCUN seed
-- (table vide au départ) → le bandeau reste masqué tant qu'aucun partenaire.
-- ============================================================

-- ===== Table PARTNERS =====
create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text,
  website_url text,
  sort_order  int not null default 0,
  status      content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_partners_updated on public.partners;
create trigger trg_partners_updated before update on public.partners
  for each row execute function public.set_updated_at();

-- ===== RLS (lecture publique du published / écriture admin) =====
alter table public.partners enable row level security;

do $$
declare t text;
begin
  foreach t in array array['partners'] loop
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

-- ===== Bucket Storage `partners` (lecture publique, écriture admin) =====
insert into storage.buckets (id, name, public)
values ('partners', 'partners', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "partners storage public read" on storage.objects;
create policy "partners storage public read" on storage.objects
  for select using (bucket_id = 'partners');

drop policy if exists "partners storage admin insert" on storage.objects;
create policy "partners storage admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'partners' and public.is_admin());

drop policy if exists "partners storage admin update" on storage.objects;
create policy "partners storage admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'partners' and public.is_admin());

drop policy if exists "partners storage admin delete" on storage.objects;
create policy "partners storage admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'partners' and public.is_admin());
