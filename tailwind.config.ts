/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx,css}', './components/**/*.{ts,tsx,css}', './pages/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'scroll-bg': 'scroll-bg 30s linear infinite',
      },
      keyframes: {
        'scroll-bg': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
