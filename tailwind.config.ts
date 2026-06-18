import type { Config } from 'tailwindcss'

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
        primary: {
          50: '#EEF3FB',
          100: '#D5E2F4',
          200: '#AABFEA',
          300: '#7A99DB',
          400: '#4D74CB',
          500: '#2D55B4',
          600: '#1E4295',
          700: '#1B3870',
          800: '#152A54',
          900: '#0E1C38',
          DEFAULT: '#1B3358',
          foreground: '#FFFFFF',
        },
        accent: {
          50: '#FEF5EB',
          100: '#FDEACE',
          200: '#FAD09A',
          300: '#F7B462',
          400: '#F39533',
          500: '#E8761E',
          600: '#C45C12',
          700: '#9D4711',
          800: '#7B3610',
          900: '#5C280E',
          DEFAULT: '#E8761E',
          foreground: '#FFFFFF',
        },
        surface: '#F7F6F3',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.12), 0 4px 10px -6px rgb(0 0 0 / 0.08)',
        section: '0 20px 60px -15px rgb(27 51 88 / 0.15)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'count-up': 'countUp 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
