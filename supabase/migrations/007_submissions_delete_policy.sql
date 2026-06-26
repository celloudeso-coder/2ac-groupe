-- ============================================================
-- 2AC GROUPE — Migration 007 : suppression des demandes par l'admin
-- ------------------------------------------------------------
-- Symptôme : impossible de supprimer une demande (contact/devis) depuis le
--   back-office — la suppression ne retire aucune ligne.
-- Cause : contact_submissions avait des policies insert / select / update
--   (001 + 003) mais AUCUNE policy DELETE → la RLS bloque la suppression
--   (0 ligne supprimée, sans erreur visible).
-- Correctif : ajouter une policy DELETE réservée aux administrateurs.
-- Additive & idempotente.
-- ============================================================

drop policy if exists "submissions admin delete" on public.contact_submissions;
create policy "submissions admin delete" on public.contact_submissions
  for delete using (public.is_admin());
