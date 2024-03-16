/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "selector",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    colors: {
      bynlegreen: {
        50: "#ebfef7",
        100: "#d0fbe9",
        200: "#a4f6d7",
        300: "#6aebc3",
        400: "#2fd8a8",
        500: "#0abf92",
        600: "#009775",
        700: "#007c64",
        800: "#03624f",
        900: "#045042",
        950: "#012d27",
      },

      bynlemain: "#0017e6",
      bynleblue: {
        50: "#f4f6fb",
        100: "#e7edf7",
        200: "#cad8ed",
        300: "#9bb7de",
        400: "#6692ca",
        500: "#4274b5",
        600: "#315b98",
        700: "#29497b",
        800: "#253f67",
        900: "#233757",
        950: "#101827",
      },
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      violet: colors.violet,
      cyan: colors.cyan,
      teal: colors.teal,
      rose: colors.rose,
      sky: colors.sky,
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
