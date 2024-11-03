/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2f2f31",
        secondary: "#3A76D2"
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },

  },
  plugins: [],
}

