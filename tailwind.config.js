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
      colors: {
        felt: {
          50: '#f0faf4',
          100: '#d4f0df',
          200: '#a8e0bf',
          300: '#6bc894',
          400: '#3aad6e',
          500: '#1e8a52',
          600: '#166e41',
          700: '#125836',
          800: '#0e4429',
          900: '#0a331f',
          950: '#051f13',
        },
        gold: {
          50: '#fefcf3',
          100: '#fdf5d9',
          200: '#fbeaae',
          300: '#f7d97a',
          400: '#f2c44a',
          500: '#e6a817',
          600: '#cc8a0e',
          700: '#a96a0f',
          800: '#8a5413',
          900: '#724513',
          950: '#422406',
        },
        casino: {
          black: '#0c0f0a',
          dark: '#141a14',
          card: '#1c241c',
          surface: '#232e23',
          border: '#2d3a2d',
        },
      },
      backgroundImage: {
        'felt-texture': 'radial-gradient(ellipse at 20% 50%, rgba(30, 138, 82, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(230, 168, 23, 0.04) 0%, transparent 50%)',
        'felt-texture-dark': 'radial-gradient(ellipse at 20% 50%, rgba(30, 138, 82, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(230, 168, 23, 0.06) 0%, transparent 50%)',
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
      },
      keyframes: {
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
