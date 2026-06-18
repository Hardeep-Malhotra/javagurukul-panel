/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2f8dae",
          "blue-dark": "#17647e",
          orange: "#fb991d",
          ink: "#14212a",
          muted: "#5d6971",
          paper: "#fffaf3",
        },
      },
    },
  },
  plugins: [],
};
