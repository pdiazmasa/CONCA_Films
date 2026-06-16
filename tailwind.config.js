/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#E10600',
          black: '#000000',
          white: '#F5F5F5',
          dark: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}
