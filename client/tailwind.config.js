/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robo: ["Roboto"],
        popi: ["Poppins"],
      },
      colors: {
        slack: "#3f0f40",
        slack_dark:"#2C0A2C",
        primary: "#541554",
        secondary: "#F4EDE4",
        primaryDark: "#4a154b",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
