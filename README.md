# 2AC GROUPE — Site web vitrine

Site web professionnel de **2AC GROUPE** (raison sociale : **2AC SARL**), entreprise multisectorielle basée à Lambanyi, Conakry (République de Guinée) : BTP, commerce de carreaux & finition, logistique internationale, import-export et conseil.

> **Marque vs raison sociale** : la marque affichée partout est **2AC GROUPE** (`SITE_CONFIG.name`). La dénomination légale **2AC SARL** (`SITE_CONFIG.legalName`) n'est utilisée que là où elle a une valeur juridique (mentions légales, copyright).

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Design system](#design-system)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Base de données Supabase](#base-de-données-supabase)
- [Structure du projet](#structure-du-projet)
- [Pages du site](#pages-du-site)
- [Guide d'utilisation (pour l'équipe non-technique)](#guide-dutilisation-pour-léquipe-non-technique)
- [Déploiement (Vercel)](#déploiement-vercel)
- [Conformité & qualité](#conformité--qualité)
- [Crédits](#crédits)

---

## Aperçu

Site **responsive (mobile-first)**, **accessible (WCAG 2.1 AA)**, **optimisé SEO** et **conforme RGPD**, conçu pour positionner 2AC GROUPE comme un partenaire unique et fiable, de bout en bout.

- 12 pages (accueil, à propos, 5 services, réalisations, blog, contact, pages légales)
- Formulaires de contact et de devis avec stockage en base + notification email
- Données structurées Schema.org `LocalBusiness`, sitemap, robots.txt
- Bannière de consentement cookies + cases de consentement explicites (non pré-cochées)
- Architecture i18n-ready (FR par défaut, anglais prévu)

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript (mode strict) |
| Styles | Tailwind CSS 3 + `@tailwindcss/typography` |
| Icônes | lucide-react |
| Base de données | Supabase (PostgreSQL + RLS) |
| Emails | Resend |
| Polices | Inter (corps) + Manrope (titres) |
| Hébergement | Vercel |

---

## Design system

La charte est dérivée du **logo** et centralisée dans [`tailwind.config.ts`](tailwind.config.ts) + les variables CSS de [`app/globals.css`](app/globals.css). **Aucune couleur n'est codée en dur dans les composants** : tout passe par des tokens.

- **Thème sombre par défaut** (cohérent avec le logo sur fond noir), thème clair prévu. Les couleurs sont exposées en variables CSS (canaux RGB pour gérer l'opacité Tailwind via `<alpha-value>`).
- **Rouge de marque constant** `#E53323` (token `brand`) — réservé aux accents : CTA, liens actifs, traits, surbrillances, dégradés. À utiliser avec parcimonie.
- **Tokens sémantiques** (basculent clair/sombre) : `background`, `surface` (+ `surface-2`, `surface-3`), `ink` (texte principal), `muted`, `faint`, `line` (bordures), plus des tokens « verre » pour les effets glassmorphism.
- **Alias rétro-compatibles** : les anciens `primary`/`accent` pointent désormais vers le rouge de marque (les CTA restent rouges).
- **Composants UI** : `Logo`, `Button`, `SectionHeader`, `PageHero`, `AnimatedCounter`, `ScrollReveal`, `LiquidBackground` (fond animé) dans [`components/ui/`](components/ui/).

> Le logo est rendu via le composant [`Logo`](components/ui/Logo.tsx) (et non une image en dur) pour s'adapter automatiquement au thème.

---

## Démarrage rapide

> Prérequis : **Node.js ≥ 20** et npm.

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.local.example .env.local
# → renseigner les valeurs (voir section ci-dessous)

# 3. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

### Scripts disponibles

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement (avec Turbopack) |
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
# Nouvelle clé publishable (sb_publishable_...) — l'ancienne anon key reste acceptée
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
# Clé secrète server-only (optionnelle, pour usages côté serveur privilégiés)
# SUPABASE_SECRET_KEY=sb_secret_xxxxxxxx

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=contact@2ac-gn.com
# Expéditeur des emails. Utiliser onboarding@resend.dev tant que le domaine
# 2ac-gn.com n'est pas vérifié dans Resend, puis no-reply@2ac-gn.com.
RESEND_FROM=onboarding@resend.dev

# Site
NEXT_PUBLIC_SITE_URL=https://www.2ac-gn.com
```

> ℹ️ Le code accepte aussi l'ancien nom `NEXT_PUBLIC_SUPABASE_ANON_KEY` en repli, pour rester compatible avec les projets Supabase existants.
>
> ℹ️ Le site fonctionne même sans Supabase/Resend configurés : les formulaires se dégradent proprement (l'envoi échoue silencieusement côté serveur sans bloquer l'utilisateur). Pour la production, configurez les deux services.
>
> ⚠️ **Resend en mode test** : tant que le domaine `2ac-gn.com` n'est pas vérifié, l'expéditeur `onboarding@resend.dev` ne peut envoyer que vers l'adresse du titulaire du compte Resend. Pour tester les notifications avant la vérification du domaine, pointez temporairement `CONTACT_EMAIL` vers cette adresse.

---

## Base de données Supabase

Trois migrations à exécuter **dans l'ordre** :

```text
supabase/migrations/001_initial.sql        # schéma + RLS + coordonnées + 5 services
supabase/migrations/002_seed_content.sql   # contenu : projets, articles, témoignages, équipe
supabase/migrations/003_fix_contact_rls.sql # correctif RLS : insertion publique du formulaire
```

**Pour les appliquer :**

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Ouvrir le **SQL Editor** dans le tableau de bord Supabase.
3. Copier-coller et exécuter `001_initial.sql`, puis `002_seed_content.sql`, puis `003_fix_contact_rls.sql`.
4. Récupérer l'URL du projet et la clé publishable (Settings → API Keys) pour `.env.local`.

> Les seeds/correctifs `002` et `003` sont **idempotents** : ils peuvent être rejoués sans créer de doublon ni d'erreur.
>
> Le « mot du dirigeant » est volontairement en `status = 'draft'` tant que le **nom réel** et la **photo** ne sont pas fournis (à publier ensuite).
>
> La migration `003` corrige la policy d'insertion publique de `contact_submissions` (sans elle, le formulaire de contact/devis affiche un succès mais **n'enregistre rien** en base).

**Tables créées :** `profiles`, `services`, `projects`, `testimonials`, `blog_posts`, `team_members`, `contact_submissions`, `site_settings`.

Les politiques **RLS (Row Level Security)** garantissent que :

- le contenu publié est lisible par tous ;
- seuls les administrateurs peuvent créer/modifier/supprimer du contenu ;
- les soumissions de formulaires sont insérables publiquement mais lisibles uniquement par les administrateurs.

### Comment le contenu est servi

Les pages lisent le contenu via [`lib/content.ts`](lib/content.ts) — des fonctions **asynchrones** (`getServices()`, `getProjects()`, `getBlogPosts()`, `getTestimonials()`, `getTeamMembers()`, `getSiteSettings()`…) exécutées dans des **Server Components** et interrogeant Supabase en lecture seule (filtre `status = 'published'`, tris côté requête).

- **Revalidation ISR** : les pages déclarent `export const revalidate = 60`. Une modification dans Supabase apparaît sur le site **dans la minute**, sans redéploiement.
- **Fallback gracieux** : si Supabase n'est pas configuré ou renvoie une erreur, le site retombe automatiquement sur les données statiques de [`lib/data.ts`](lib/data.ts) (jeu de secours) et logue l'erreur côté serveur — le site ne plante jamais.
- Les constantes de marque (nom, téléphone, **horaires**, libellés de navigation) restent dans `lib/data.ts` (`SITE_CONFIG`) : source unique garantissant des **horaires uniformes** partout, y compris dans les composants client (en-tête).

---

## Structure du projet

```text
2ac-groupe/
├── app/                      # Pages (App Router)
│   ├── layout.tsx            # Layout racine (header, footer, SEO, cookies)
│   ├── page.tsx              # Accueil
│   ├── a-propos/             # À propos
│   ├── services/             # Aperçu + sous-pages dynamiques [slug]
│   ├── realisations/         # Portfolio
│   ├── blog/                 # Liste + articles dynamiques [slug]
│   ├── contact/              # Contact + devis
│   ├── mentions-legales/
│   ├── politique-confidentialite/
│   ├── api/contact/          # Route API des formulaires
│   ├── sitemap.ts            # Sitemap dynamique
│   └── not-found.tsx         # Page 404
├── components/
│   ├── layout/               # Header, Footer, CookieBanner
│   ├── home/                 # Sections de la page d'accueil
│   ├── forms/                # ContactForm, DevisForm
│   ├── services/             # ServiceCard
│   └── ui/                   # Logo, Button, SectionHeader, PageHero,
│                             #   AnimatedCounter, ScrollReveal, LiquidBackground
├── lib/
│   ├── content.ts            # Accès contenu Supabase (async) + fallback
│   ├── data.ts               # Données de secours + constantes de marque (SITE_CONFIG)
│   ├── types.ts              # Types TypeScript
│   ├── utils.ts              # Utilitaires (cn, formatDate…)
│   └── supabase/             # Clients Supabase (client + server)
├── supabase/migrations/      # Migrations SQL (schéma + RLS + seed + correctifs)
├── public/                   # robots.txt, assets statiques
├── app/globals.css           # Tokens de thème (variables CSS) + styles de base
├── middleware.ts             # Middleware Next.js
├── next.config.ts            # Config Next.js (images, en-têtes, redirections)
└── tailwind.config.ts        # Design system (tokens couleurs, typo, ombres)
```

---

## Pages du site

| URL | Page |
|-----|------|
| `/` | Accueil |
| `/a-propos` | À propos (histoire, valeurs, mot du dirigeant) |
| `/services` | Aperçu des services |
| `/services/btp` | Bâtiment & Travaux Publics |
| `/services/commerce-general` | Commerce général (carreaux & finition) |
| `/services/logistique-transport` | Logistique & Transport international |
| `/services/import-export` | Import-Export |
| `/services/conseil` | Conseil & Services |
| `/realisations` | Portfolio / Réalisations |
| `/blog` | Blog & Actualités |
| `/blog/[slug]` | Article de blog |
| `/contact` | Contact & demande de devis |
| `/mentions-legales` | Mentions légales |
| `/politique-confidentialite` | Politique de confidentialité |

---

## Guide d'utilisation (pour l'équipe non-technique)

Cette section explique comment gérer le contenu du site **sans toucher au code**, une fois le site connecté à Supabase.

### Accéder à l'administration

1. Connectez-vous au tableau de bord **Supabase** de l'entreprise ([supabase.com](https://supabase.com)).
2. Dans le menu de gauche, cliquez sur **Table Editor**.
3. Sélectionnez la table à modifier (voir ci-dessous).

> 💡 Pour publier un élément, mettez son champ **`status`** sur **`published`**. Pour le masquer du site, mettez-le sur **`draft`** ou **`archived`**.

### Gérer les articles de blog (`blog_posts`)

- **Ajouter un article** : cliquez sur *Insert row*, remplissez `title`, `slug` (ex : `mon-article`), `excerpt` (résumé), `body` (contenu), `author`, `categories` (ex : `["BTP", "Conseil"]`), puis `status = published`.
- **Modifier** : cliquez sur la ligne et éditez les champs.
- **Supprimer** : sélectionnez la ligne → *Delete*.

### Gérer le portfolio (`projects`)

Remplissez `title`, `slug`, `description`, `location`, `images` (liste d'URLs), `cover_image`, `project_date`, `featured` (true pour l'afficher en page d'accueil), `status`.

### Gérer les témoignages (`testimonials`)

Remplissez `author_name`, `company`, `content`, `rating` (1 à 5), `avatar_url`, `status`.

### Modifier les coordonnées et horaires (`site_settings`)

Modifiez la ligne `company` (adresse, téléphones, emails) ou `hours` (horaires d'ouverture). Le format est du JSON — respectez la structure existante.

### Consulter les demandes de contact / devis (`contact_submissions`)

Toutes les soumissions de formulaires sont enregistrées ici. Vous pouvez :

- changer le `status` (`new` → `in_progress` → `closed`) pour suivre le traitement ;
- les recevoir aussi par email si Resend est configuré (`CONTACT_EMAIL`).

### Rôles utilisateurs

Dans la table `profiles`, le champ `is_admin = true` donne les droits de modification du contenu. Créez les comptes via **Authentication → Users** dans Supabase.

---

## Déploiement (Vercel)

1. Poussez le code sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), cliquez sur **Add New → Project** et importez le dépôt.
3. Dans **Environment Variables**, ajoutez toutes les variables de `.env.local`.
4. Cliquez sur **Deploy**.

Vercel détecte automatiquement Next.js. Les déploiements suivants se font à chaque push sur la branche principale.

**Après le premier déploiement :**

- Configurez le domaine `2ac-gn.com` dans **Settings → Domains**.
- Vérifiez que `NEXT_PUBLIC_SITE_URL` pointe vers le domaine final (pour le sitemap et les balises Open Graph).

### Redirections des anciennes URLs

Pour préserver le référencement, les anciennes URLs du site Laravel sont redirigées dans la constante `LEGACY_REDIRECTS` de [`next.config.ts`](next.config.ts). Cartographie **vérifiée en production** (juin 2026) : `/about → /a-propos`, `/service → /services`, `/domaines/* → /services/*`, `/blog-detail/:id → /blog` (ancien blog = Lorem Ipsum, pas de mapping article), `/login → /`.

> `permanent: true` renvoie un **308** (méthode préservée), traité comme un 301 par Google. **Après mise en ligne**, testez chaque ancienne URL : elle doit renvoyer un 308 vers la nouvelle, sans chaîne ni boucle de redirection.
>
> **Espace admin indépendant** : ne pas lier `/admin` depuis la navigation ou le pied de page publics ; il est exclu du `sitemap.ts` et bloqué dans `robots.txt` (`Disallow: /admin`). Accès uniquement via son URL dédiée (`/admin/login`).

---

## Conformité & qualité

- **Accessibilité (WCAG 2.1 AA)** : structure sémantique, attributs ARIA, navigation clavier, focus visibles, lien d'évitement, attributs `alt`, contrastes conformes.
- **SEO** : `<title>` et meta description uniques par page, Schema.org `LocalBusiness`, `sitemap.xml`, `robots.txt`, Open Graph + Twitter Card.
- **Performance** : composant `next/image` (WebP/AVIF), lazy-loading, animations CSS légères, polices optimisées.
- **RGPD** : bannière de consentement cookies, pages légales, cases de consentement explicites (non pré-cochées) sur tous les formulaires.
- **Sécurité** : en-têtes HSTS/CSP/X-Frame-Options, protection anti-spam (honeypot), validation côté client **et** serveur.

---

## Crédits

Développement : **LynxaTech (LYNXA SARL)**

© 2AC GROUPE (2AC SARL) — Tous droits réservés.
