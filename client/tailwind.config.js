/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          sand: "#f7efe4",
          clay: "#b8744f",
          soil: "#5a3e2b",
          olive: "#6f7d4d",
        },
      },
    },
  },
  plugins: [],
};
