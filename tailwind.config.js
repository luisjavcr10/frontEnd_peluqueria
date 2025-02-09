/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'serif'], // Define la familia de la fuente Kanit
      },
      fontWeight: {
        'kanit-bold': 700, // Crea un alias para el peso 700 de Kanit
      },
    },
  },
  plugins: [],
}

