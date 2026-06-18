-- ============================================================
-- 2AC SARL — Correctif RLS : insertion publique des soumissions de contact/devis
-- ============================================================
-- Symptôme : un visiteur anonyme (clé publishable, rôle `anon`) reçoit
--   « new row violates row-level security policy for table contact_submissions »
--   lors de l'envoi du formulaire → les soumissions ne s'enregistrent pas.
-- Cause : la policy d'insertion publique n'était pas effective pour le rôle anon.
-- Correctif : recréer explicitement la policy pour anon + authenticated.
-- Idempotent : peut être rejoué sans risque.
-- ============================================================

-- S'assurer que RLS est bien activée
alter table public.contact_submissions enable row level security;

-- Recréer proprement la policy d'insertion publique
drop policy if exists "submissions public insert" on public.contact_submissions;
create policy "submissions public insert"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Privilège de table (RLS contrôle les lignes, le GRANT contrôle la table)
grant insert on public.contact_submissions to anon, authenticated;

-- Rappel : la lecture/gestion reste réservée aux administrateurs
--   (policies "submissions admin read" / "submissions admin update" de 001).
