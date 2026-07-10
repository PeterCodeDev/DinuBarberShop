/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"]
      },
      boxShadow: {
        premium: "0 25px 60px -20px rgba(0, 0, 0, 0.65)"
      }
    }
  },
  plugins: []
};
