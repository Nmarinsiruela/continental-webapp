/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      // Accessible palette — every text/background pairing used in the app is
      // listed in scripts/check-contrast.js and verified with `npm run check:contrast`.
      // Rules of thumb:
      //   • White text only on felt-700 or darker (≥ 5.4:1).
      //   • Gold surfaces carry dark ink (felt-950), never white.
      //   • Secondary text: felt-700 (light) / felt-300 (dark). Never felt-400–600 for text on light.
      //   • Form-control borders use `line` (≥ 3:1 against their surface).
      colors: {
        felt: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        gold: {
          50: '#fefcf3',
          100: '#fdf5d9',
          200: '#fbeaae',
          300: '#f7d97a',
          400: '#f2c44a',
          500: '#e6a817',
          600: '#cc8a0e',
          700: '#94600f', // darkened from #a96a0f so gold text passes AA on light surfaces
          800: '#7a4b12',
          900: '#5f3a10',
          950: '#422406',
        },
        casino: {
          black: '#0a0f0f',
          dark: '#111a1a',
          card: '#182424',
          surface: '#1f2e2e',
          border: '#283a3a', // decorative dividers only — use `line-dark` for controls
        },
        // Form-control outlines (WCAG 1.4.11 non-text contrast ≥ 3:1)
        line: {
          DEFAULT: '#4f8a84',
          dark: '#5f817d',
        },
        // Playing-card faces (start screen + guide). Dimmed in dark mode to avoid glare.
        paper: {
          DEFAULT: '#ffffff',
          dim: '#e4ebe9',
        },
        // Red card suits (♥ ♦) — passes AA on both paper tones
        suit: {
          red: '#b91c1c',
        },
      },
      backgroundImage: {
        'felt-texture': 'radial-gradient(ellipse at 20% 50%, rgba(20, 184, 166, 0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(230, 168, 23, 0.04) 0%, transparent 50%)',
        'felt-texture-dark': 'radial-gradient(ellipse at 20% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(230, 168, 23, 0.06) 0%, transparent 50%)',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.08)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25)',
        'gold-glow': '0 0 20px rgba(230, 168, 23, 0.15), 0 0 60px rgba(230, 168, 23, 0.05)',
        'gold-glow-strong': '0 0 30px rgba(230, 168, 23, 0.25), 0 0 80px rgba(230, 168, 23, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        // `backwards` (not `forwards`) so the card's own transform takes over
        // after the deal and hover/focus can still straighten it.
        'deal': 'deal 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) backwards',
      },
      keyframes: {
        deal: {
          '0%': { opacity: '0', transform: 'translateY(48px) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(var(--tilt, 0deg))' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
