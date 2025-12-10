/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa': {
          'salmao': '#E76F7F',
          DEFAULT: '#E76F7F',
        },
        'bege': '#FDF8F4',
        'cinza': {
          'texto': '#5A5755',
          DEFAULT: '#5A5755',
        },
      },
    },
  },
}

