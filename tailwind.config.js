/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swipe-green': '#00D54B', // Swipe's brand green
        'swipe-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
}

