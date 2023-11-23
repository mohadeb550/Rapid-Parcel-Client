/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      play: ['Play', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      darkMode: 'class',
    },
  },
  plugins: [require("daisyui")],
}

