/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,js,ts,jsx,tsx}", "./src/styles/**/*.{scss,css}"],
  theme: {
    extend: {},
    listStyleType: {
      none: "none",
      disc: "disc",
      circle: "circle",
      square: "square",
      decimal: "decimal",
    },
  },
  plugins: [],
};
