/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx,html}", "./src/*.{jsx,tsx,html}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
};
