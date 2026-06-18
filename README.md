# 2AC SARL — Site web vitrine

Site web professionnel de **2AC SARL**, entreprise multisectorielle basée à Lambanyi, Conakry (République de Guinée) : BTP, commerce de carreaux & finition, logistique internationale, import-export et conseil.

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
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

Site **responsive (mobile-first)**, **accessible (WCAG 2.1 AA)**, **optimisé SEO** et **conforme RGPD**, conçu pour positionner 2AC SARL comme un partenaire unique et fiable, de bout en bout.

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
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=contact@2ac-gn.com

# Site
NEXT_PUBLIC_SITE_URL=https://www.2ac-gn.com
```

> ℹ️ Le site fonctionne même sans Supabase/Resend configurés : les formulaires se dégradent proprement (l'envoi échoue silencieusement côté serveur sans bloquer l'utilisateur). Pour la production, configurez les deux services.

---

## Base de données Supabase

Le schéma complet (tables, politiques RLS, données initiales) se trouve dans :

```text
supabase/migrations/001_initial.sql
```

**Pour l'appliquer :**

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Ouvrir le **SQL Editor** dans le tableau de bord Supabase.
3. Copier-coller le contenu de `supabase/migrations/001_initial.sql` et exécuter.
4. Récupérer l'URL du projet et les clés API (Settings → API) pour `.env.local`.

**Tables créées :** `profiles`, `services`, `projects`, `testimonials`, `blog_posts`, `team_members`, `contact_submissions`, `site_settings`.

Les politiques **RLS (Row Level Security)** garantissent que :

- le contenu publié est lisible par tous ;
- seuls les administrateurs peuvent créer/modifier/supprimer du contenu ;
- les soumissions de formulaires sont insérables publiquement mais lisibles uniquement par les administrateurs.

> ⚠️ Actuellement, les contenus affichés (services, projets, articles, témoignages) proviennent de [`lib/data.ts`](lib/data.ts) pour garantir un site fonctionnel immédiatement. Pour brancher le site sur Supabase, remplacer les imports depuis `lib/data.ts` par des requêtes Supabase (les types correspondent déjà dans [`lib/types.ts`](lib/types.ts)).

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
│   └── ui/                   # Button, SectionHeader, AnimatedCounter, ScrollReveal
├── lib/
│   ├── data.ts               # Contenu éditorial (services, projets, blog…)
│   ├── types.ts              # Types TypeScript
│   ├── utils.ts              # Utilitaires (cn, formatDate…)
│   └── supabase/             # Clients Supabase (client + server)
├── supabase/migrations/      # Migration SQL (schéma + RLS + seed)
├── public/                   # robots.txt, assets statiques
├── middleware.ts             # Middleware Next.js
├── next.config.ts            # Config Next.js (images, en-têtes de sécurité)
└── tailwind.config.ts        # Design system (couleurs, typo, ombres)
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

---

## Conformité & qualité

- **Accessibilité (WCAG 2.1 AA)** : structure sémantique, attributs ARIA, navigation clavier, focus visibles, lien d'évitement, attributs `alt`, contrastes conformes.
- **SEO** : `<title>` et meta description uniques par page, Schema.org `LocalBusiness`, `sitemap.xml`, `robots.txt`, Open Graph + Twitter Card.
- **Performance** : composant `next/image` (WebP/AVIF), lazy-loading, animations CSS légères, polices optimisées.
- **RGPD** : bannière de consentement cookies, pages légales, cases de consentement explicites (non pré-cochées) sur tous les formulaires.
- **Sécurité** : en-têtes HSTS/CSP/X-Frame-Options, protection anti-spam (honeypot), validation côté client **et** serveur.

---

## Crédits

Développement : **Groupe Wolikhai**

© 2AC SARL — Tous droits réservés.
