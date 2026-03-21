/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:      '#ED1C24',
          'red-dark': '#C3171E',
          'red-light': '#F16D71',
          'red-surface': '#FDE4E5',
        },
        neutral: {
          100: '#F9F9F9',
          300: '#E0E0E0',
          500: '#9A9A9A',
          700: '#4F4F4F',
        },
        white: '#FCFCFC',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s ease-out',
        'fade-up':   'fadeUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.5s infinite',
      },
      keyframes: {
        bounceIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '60%':  { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)',   opacity: '1'   },
          '50%':      { transform: 'scale(1.4)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
