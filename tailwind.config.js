/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{scss,css}",
  ],
  theme: {
    extend: {
      colors: {
        "tag-link": "rgba(var(--link-color-rgb), 0.1)",
        "tag-link-hover": "rgba(var(--link-color-rgb), 0.9)",
        "tag-link-dark": "rgba(var(--link-color-rgb), 0.2)",
        "tag-link-dark-hover": "rgba(var(--link-color-rgb), 0.7)",
      },
    },
  },
  plugins: [],
};
