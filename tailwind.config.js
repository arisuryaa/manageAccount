/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "assets/bg.png",
      },
      colors: {
        secondary: "#97E200",
      },
    },
  },
  plugins: [],
};
