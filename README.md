# 2AC GROUPE — Site web vitrine + back-office CMS

Site web professionnel de **2AC GROUPE** (raison sociale : *2AC SARL*), entreprise multisectorielle basée à Lambanyi, Conakry (République de Guinée) : BTP, commerce de carreaux & finition, logistique internationale, import-export et conseil.

> **Marque commerciale** : 2AC GROUPE · **Entité légale** : 2AC SARL (utilisée uniquement là où elle a une valeur juridique, ex. mentions légales).

---

## Sommaire

- [Aperçu](#aperçu)
- [Identité visuelle & design system](#identité-visuelle--design-system)
- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Base de données Supabase](#base-de-données-supabase)
- [Back-office d'administration (`/admin`)](#back-office-dadministration-admin)
- [Structure du projet](#structure-du-projet)
- [Pages du site](#pages-du-site)
- [Déploiement (Vercel)](#déploiement-vercel)
- [Conformité & qualité](#conformité--qualité)
- [Crédits](#crédits)

---

## Aperçu

Site **responsive (mobile-first)**, **accessible (WCAG 2.1 AA)**, **optimisé SEO** et **conforme RGPD**, conçu pour positionner 2AC GROUPE comme un partenaire unique et fiable, de bout en bout.

- 12 pages publiques (accueil, à propos, 5 services, réalisations, blog, contact, pages légales)
- **Back-office CMS intégré** (`/admin`) : l'équipe gère tout le contenu sans ouvrir Supabase
- Design **« verre liquide » (liquid glass)** façon iOS, thème sombre par défaut
- Formulaires de contact et de devis avec stockage en base + notification email
- Données structurées Schema.org `LocalBusiness`, sitemap, robots.txt
- Bannière de consentement cookies + cases de consentement explicites (non pré-cochées)

---

## Identité visuelle & design system

La charte est dérivée du **logo** (rouge sur noir). Tout passe par des **tokens sémantiques** Tailwind — **aucune couleur n'est codée en dur** dans les composants.

| Rôle | Hex | Token | Usage |
|------|-----|-------|-------|
| Rouge de marque | `#E53323` | `brand` | accents, CTA, liens actifs, surbrillances |
| Rouge foncé | `#C2261A` | `brand-dark` | états hover/active |
| Noir | `#000000` | `background` (sombre) | fond principal |
| Surfaces | `#0A0A0A` / `#111111` | `surface`, `surface-2/3` | sections, cartes |
| Blanc | `#FFFFFF` | `ink` (sombre) | texte principal |
| Gris | `#D3D3D3` / `#818181` | `muted` / `faint` | textes secondaires |

- **Thème sombre par défaut** (cohérent avec le logo), thème clair optionnel via le sélecteur dans l'en-tête (`next-themes`). Les tokens basculent via des variables CSS (voir [`app/globals.css`](app/globals.css)).
- **Verre liquide** : utilitaire unique `.glass` (+ variantes `.glass--brand`, `.glass--solid`, `.glass-edge`) mutualisé dans `globals.css`. Cartes, nav, modales et panneaux CMS l'utilisent.
- **Arrière-plan « bulles d'eau »** : composant [`LiquidBackground`](components/ui/LiquidBackground.tsx) (blobs flous animés en CSS, sous les surfaces en verre).
- Le rouge est un **accent** (CTA, traits, hovers), jamais un aplat — pour préserver l'élégance et le contraste AA.

### Garde-fous (perf mobile + accessibilité) — non négociables

- `prefers-reduced-motion: reduce` → blobs et transitions désactivés (fondu instantané).
- **Dégradation mobile** : `backdrop-filter` allégé sous 640 px + fond plus opaque (GPU).
- `@supports not (backdrop-filter)` → repli **semi-opaque solide** (lisibilité garantie).
- Contraste texte **≥ 4.5:1** assuré par les tokens (`ink`/`muted`/`faint` testés sur fond sombre).
- Animations limitées à `transform`/`opacity` (jamais de propriété déclenchant le layout).

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript (mode strict) |
| Styles | Tailwind CSS 3 + `@tailwindcss/typography` + design system maison |
| Thèmes | `next-themes` (sombre par défaut) |
| Icônes | lucide-react |
| Base de données | Supabase (PostgreSQL + RLS + Storage) |
| Auth back-office | Supabase Auth (email + mot de passe) |
| Éditeur riche | Tiptap (admin uniquement) |
| Validation | Zod (client + serveur) |
| Notifications UI | Sonner (toasts) |
| Emails | Resend |
| Polices | Inter (corps) + Manrope (titres) |
| Hébergement | Vercel |

---

## Démarrage rapide

> Prérequis : **Node.js ≥ 20** et npm.

```bash
npm install
cp .env.local.example .env.local   # → renseigner les valeurs
npm run dev                          # → http://localhost:3000
```

### Scripts disponibles

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` | Analyse ESLint |
| `npm run type-check` | Vérification TypeScript (sans émission) |

---

## Variables d'environnement

À renseigner dans `.env.local` (voir [`.env.local.example`](.env.local.example)) :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
# (optionnel) SUPABASE_SECRET_KEY=sb_secret_xxxxxxxx

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=contact@2ac-gn.com
RESEND_FROM=onboarding@resend.dev

# Site
NEXT_PUBLIC_SITE_URL=https://www.2ac-gn.com
```

> ℹ️ L'ancien nom `NEXT_PUBLIC_SUPABASE_ANON_KEY` reste accepté en repli.
> Le site public fonctionne même sans Supabase (les formulaires se dégradent proprement, le contenu retombe sur les données de secours de [`lib/data.ts`](lib/data.ts)). Le **back-office** nécessite Supabase configuré.

---

## Base de données Supabase

Migrations à exécuter **dans l'ordre** dans le **SQL Editor** Supabase :

```text
supabase/migrations/001_initial.sql         # schéma + RLS + coordonnées + 5 services
supabase/migrations/002_seed_content.sql    # contenu : projets, articles, témoignages, équipe
supabase/migrations/003_fix_contact_rls.sql # correctif RLS : insertion publique des soumissions
supabase/migrations/004_cms_backoffice.sql  # buckets Storage + trigger profils + rebrand contenu
```

**Tables :** `profiles`, `services`, `projects`, `testimonials`, `blog_posts`, `team_members`, `contact_submissions`, `site_settings`.

**Buckets Storage** (créés par la migration 004) : `projects`, `blog`, `team`, `brand` — **lecture publique**, **écriture réservée aux administrateurs** (RLS via `is_admin()`).

Les politiques **RLS** garantissent que : le contenu publié est lisible par tous ; seuls les administrateurs créent/modifient/suppriment ; les soumissions de formulaires sont insérables publiquement mais lisibles uniquement par les administrateurs.

### Comment le contenu est servi

Les pages publiques lisent le contenu via [`lib/content.ts`](lib/content.ts) (Server Components, lecture seule, `status = 'published'`).

- **Revalidation ISR** : `export const revalidate = 60`. Une modification (via le back-office ou Supabase) apparaît sur le site **dans la minute**. Les mutations du back-office déclenchent en plus un `revalidatePath` immédiat des pages concernées.
- **Fallback gracieux** : si Supabase est indisponible, le site retombe sur [`lib/data.ts`](lib/data.ts).

---

## Back-office d'administration (`/admin`)

Interface complète pour gérer le contenu **sans ouvrir Supabase**. Même identité visuelle (verre liquide), mais **priorité à la lisibilité** (verre plus opaque, formulaires clairs).

### Créer le premier administrateur

1. **Supabase → Authentication → Users → Add user** : créez le compte (email + mot de passe). Le profil est créé automatiquement (trigger de la migration 004).
2. Promouvez-le administrateur dans le **SQL Editor** :
   ```sql
   update public.profiles set is_admin = true
    where id = (select id from auth.users where email = 'admin@2ac-gn.com');
   ```
3. Connectez-vous sur **`/admin/login`**.

### Sécurité

- Routes `/admin/**` protégées par [`middleware.ts`](middleware.ts) (session) **et** par une vérification serveur `is_admin()` dans le layout (défense en profondeur).
- Les mutations passent par des **Server Actions** utilisant le **client Supabase authentifié** (la session admin) : les **politiques RLS s'appliquent**, et `is_admin()` est re-vérifié à chaque action. Aucune clé service n'est exposée côté client.

### Fonctionnalités

| Section | Capacités |
|---------|-----------|
| **Tableau de bord** | compteurs (services/réalisations/articles publiés, demandes en attente) + dernières demandes |
| **Services** | CRUD des 5 domaines (descriptions, engagements, prestations, icône, ordre, statut) |
| **Réalisations** | CRUD projets + upload d'images, « à la une », statut |
| **Blog** | CRUD articles avec **éditeur riche (Tiptap)**, image de couverture, catégories, auteur, date |
| **Témoignages** | CRUD (nom, entreprise, note 1–5, avatar) |
| **Équipe** | CRUD membres + photo, dont le **dirigeant** (mot du CEO) |
| **Demandes** | boîte de réception filtrable, détail, changement de statut (`new` → `in_progress` → `closed`), données soumises en **lecture seule** |
| **Paramètres** | formulaire convivial (PAS de JSON) : coordonnées, horaires, etc. |

- **Upload d'images** réutilisable → Supabase Storage (URL publique stockée en base).
- **Validation Zod** côté client **et** serveur, messages en français.
- **Toasts** de confirmation, états de chargement, **confirmation avant suppression**.
- Bouton **Publier / Mettre en brouillon** sur chaque contenu.
- Responsive (utilisable depuis mobile).

---

## Structure du projet

```text
2ac-groupe/
├── app/
│   ├── layout.tsx                # Layout racine (html/body, thème, SEO)
│   ├── (site)/                   # Site public (en-tête, pied, bannière cookies)
│   │   ├── layout.tsx            # Chrome du site
│   │   ├── page.tsx              # Accueil
│   │   ├── a-propos, services, realisations, blog, contact, *légales*
│   │   └── template.tsx          # Transition de page (fondu)
│   ├── admin/                    # Back-office
│   │   ├── layout.tsx            # Toasts + noindex
│   │   ├── login/                # Connexion Supabase Auth
│   │   ├── actions.ts            # Server Actions (CRUD, settings, auth)
│   │   └── (dashboard)/          # Zone protégée (sidebar)
│   │       ├── layout.tsx        # Garde is_admin() + AdminShell
│   │       ├── page.tsx          # Tableau de bord
│   │       ├── [entity]/         # Liste + édition génériques (services, blog…)
│   │       ├── demandes/         # Boîte de réception
│   │       └── parametres/       # Paramètres du site
│   ├── api/contact/, sitemap.ts, not-found.tsx, globals.css
├── components/
│   ├── layout/ home/ forms/ services/ ui/   # Site public
│   ├── theme/                    # ThemeProvider + ThemeToggle
│   └── admin/                    # AdminShell, EntityForm, ImageUpload, RichTextEditor…
├── lib/
│   ├── content.ts data.ts types.ts utils.ts
│   ├── auth.ts                   # getAuthState / requireAdmin
│   ├── admin/entities.ts         # Config déclarative + schémas Zod du CMS
│   └── supabase/                 # client, server, middleware
├── supabase/migrations/          # 001 → 004
├── public/                       # logo (PNG transparent), icônes, images
└── tailwind.config.ts            # Design system (tokens, verre, animations)
```

---

## Pages du site

| URL | Page |
|-----|------|
| `/` | Accueil |
| `/a-propos` | À propos |
| `/services` + `/services/[slug]` | Services (5 domaines) |
| `/realisations` | Portfolio |
| `/blog` + `/blog/[slug]` | Blog |
| `/contact` | Contact & devis |
| `/mentions-legales`, `/politique-confidentialite` | Pages légales |
| `/admin`, `/admin/login`, `/admin/...` | Back-office (non indexé) |

---

## Déploiement (Vercel)

1. Poussez le code sur GitHub.
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, importez le dépôt.
3. Ajoutez toutes les variables d'environnement dans **Environment Variables**.
4. **Deploy**. Vercel détecte Next.js automatiquement.

**Après le premier déploiement :** configurez le domaine `2ac-gn.com` et vérifiez `NEXT_PUBLIC_SITE_URL`.

### Redirections 301 des anciennes URLs

Les anciennes URLs sont redirigées dans `LEGACY_REDIRECTS` de [`next.config.ts`](next.config.ts) (308 ≈ 301 pour le SEO).

---

## Conformité & qualité

- **Accessibilité (WCAG 2.1 AA)** : structure sémantique, ARIA, navigation clavier, focus visibles, lien d'évitement, `alt`, contrastes conformes, `prefers-reduced-motion`.
- **SEO** : titres/descriptions uniques, Schema.org `LocalBusiness`, `sitemap.xml`, `robots.txt`, Open Graph + Twitter Card, back-office en `noindex`.
- **Performance** : `next/image` (WebP/AVIF), verre dégradé sur mobile, bundle Tiptap chargé **uniquement** dans le back-office (pages publiques ≈ 102–119 kB JS).
- **RGPD** : bannière cookies, pages légales, consentement explicite (non pré-coché).
- **Sécurité** : en-têtes HSTS/X-Frame-Options/etc., honeypot anti-spam, validation client **et** serveur, RLS Supabase, `is_admin()` revérifié sur chaque mutation.

---

## Crédits

Développement : **LynxaTech (LYNXA SARL)**

© 2AC GROUPE (2AC SARL) — Tous droits réservés.
