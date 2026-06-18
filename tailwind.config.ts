import type { Config } from 'tailwindcss'

/**
 * Design system 2AC GROUPE — charte d'après le logo.
 *
 * Couleurs sémantiques exposées via variables CSS (voir globals.css) afin de
 * basculer proprement entre thème sombre (par défaut) et thème clair.
 * Le rouge de marque (#E53323) est constant : c'est un ACCENT, à utiliser
 * avec parcimonie (CTA, traits, hovers, dégradés). Aucune couleur ne doit être
 * codée en dur dans les composants — tout passe par ces tokens.
 */
const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Rouge de marque (constant) — accents, CTA, liens actifs, surbrillances.
        brand: {
          50: '#FDECEA',
          100: '#FBD0CB',
          200: '#F4A59C',
          300: '#EE7C6F',
          400: '#EA5544',
          500: '#E53323', // DEFAULT — rouge du logo
          600: '#C2261A', // hover / active
          700: '#9C1E14',
          800: '#76170F',
          900: '#4F0F0A',
          DEFAULT: '#E53323',
          dark: '#C2261A',
          foreground: '#FFFFFF',
        },
        // Tokens sémantiques (flip clair/sombre via variables CSS).
        background: withAlpha('--background'),
        surface: { DEFAULT: withAlpha('--surface'), 2: withAlpha('--surface-2'), 3: withAlpha('--surface-3') },
        ink: withAlpha('--ink'),
        muted: withAlpha('--muted'),
        faint: withAlpha('--faint'),
        line: withAlpha('--line'),

        // Alias rétro-compatibles : l'ancien design "primary/accent" pointe
        // désormais vers le rouge de marque (les CTA restent rouges).
        primary: { DEFAULT: '#E53323', foreground: '#FFFFFF', 50: '#FDECEA', 100: '#FBD0CB', 500: '#E53323', 600: '#C2261A', 700: '#9C1E14' },
        accent: { DEFAULT: '#E53323', foreground: '#FFFFFF', 300: '#EE7C6F', 400: '#EA5544', 500: '#E53323', 600: '#C2261A' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.25)',
        'card-hover': '0 18px 50px -12px rgb(0 0 0 / 0.6)',
        glass: 'inset 0 1px 0 rgb(255 255 255 / 0.18), 0 8px 30px rgb(0 0 0 / 0.35)',
        glow: '0 0 0 1px rgb(229 51 35 / 0.35), 0 10px 40px -8px rgb(229 51 35 / 0.45)',
        'glow-sm': '0 6px 24px -8px rgb(229 51 35 / 0.5)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'blob-1': 'blob1 20s ease-in-out infinite',
        'blob-2': 'blob2 26s ease-in-out infinite',
        'blob-3': 'blob3 23s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, -8%) scale(1.15)' },
          '66%': { transform: 'translate(-5%, 6%) scale(0.92)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-8%, 5%) scale(1.1)' },
          '66%': { transform: 'translate(7%, -6%) scale(0.95)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(5%, 7%) scale(1.2)' },
        },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
