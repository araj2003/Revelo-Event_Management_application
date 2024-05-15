/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // add colors
      colors: {
        slack: "#3f0f40",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
