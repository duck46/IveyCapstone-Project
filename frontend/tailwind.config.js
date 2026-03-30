/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fsra: {
          green: '#1a4731',
          'green-light': '#2d6a4f',
          'green-muted': '#e8f0ec',
          gold: '#c9a84c',
          'gold-light': '#f0dfa0',
        },
      },
    },
  },
  plugins: [],
}
