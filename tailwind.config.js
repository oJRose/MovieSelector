/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'old-yellow': '#e0d8c8'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

