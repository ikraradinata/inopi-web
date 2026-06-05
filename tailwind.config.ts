import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark:    { DEFAULT: '#071422', 2: '#0e2235' },
        teal:    { DEFAULT: '#0b7b8a', 2: '#0d9488', btn: '#083344', light: '#e0f7f5' },
        muted:   { DEFAULT: '#4a6070', light: '#8fa5b5' },
        surface: { DEFAULT: '#f7f9fb', 2: '#eef2f7' },
        border:  '#e0e8ef',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(28px, 5vw, 44px)', { lineHeight: '1.1', fontWeight: '800' }],
        'h1':   ['clamp(24px, 4vw, 36px)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2':   ['clamp(20px, 3vw, 28px)', { lineHeight: '1.25', fontWeight: '700' }],
        'h3':   ['18px', { lineHeight: '1.35', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '1.65', fontWeight: '400' }],
        'sm':   ['13px', { lineHeight: '1.5' }],
        'xs':   ['11px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        DEFAULT: '12px',
        sm:      '8px',
        lg:      '16px',
        xl:      '20px',
        '2xl':   '24px',
      },
      boxShadow: {
        card:  '0 1px 4px rgba(7,20,34,0.07)',
        hover: '0 4px 16px rgba(13,148,136,0.12)',
        nav:   '0 1px 0 #e0e8ef',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
