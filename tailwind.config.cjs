/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        almostWhite: "#fefefe",
        almostBlack: "#303030",
      },
      letterSpacing: {
        wide: ".3rem",
        wider: ".4rem",
      },
    },
  },
  plugins: [],
};
