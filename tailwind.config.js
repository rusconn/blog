/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/styles/**/*.{scss,css}"],
  theme: {
    extend: {
      colors: {
        "tag-link": "rgba(var(--link-color-rgb), 0.1)",
        "tag-link-hover": "rgba(var(--link-color-rgb), 0.9)",
        "tag-link-dark": "rgba(var(--link-color-rgb), 0.2)",
        "tag-link-dark-hover": "rgba(var(--link-color-rgb), 0.7)",
        "github-text": "black",
        "github-bg": "white",
        "github-text-dark": "#c9d1d9",
        "github-bg-dark": "#0d1117",
        "github-link": "#0969da",
        "github-link-dark": "#58a6ff",
        "github-tag-text-hover": "#f0f6fc",
      },
    },
  },
  plugins: [],
};
