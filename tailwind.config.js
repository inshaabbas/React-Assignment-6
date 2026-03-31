/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f5f4f2',
          100: '#e8e5e0',
          200: '#d0cbc3',
          300: '#b3ab9f',
          400: '#918578',
          500: '#756860',
          600: '#5c5049',
          700: '#453c37',
          800: '#2d2724',
          900: '#1a1614',
          950: '#0e0c0b',
        },
        sage: {
          400: '#8aab8e',
          500: '#6b9470',
          600: '#547a59',
        },
        ember: {
          400: '#e8896a',
          500: '#d96b45',
          600: '#c05535',
        },
        gold: {
          400: '#d4a84b',
          500: '#bc8f32',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease forwards',
        'fade-in':    'fadeIn 0.3s ease forwards',
        'slide-in':   'slideIn 0.35s ease forwards',
        'scale-in':   'scaleIn 0.25s ease forwards',
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
