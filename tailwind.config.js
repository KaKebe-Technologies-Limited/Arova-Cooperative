// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // FIX THIS SECTION
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This covers App.js and all other component files
    "./public/index.html", // This covers the main HTML file
  ],
  // END FIX
  theme: {
    extend: {},
  },
  plugins: [],
};
