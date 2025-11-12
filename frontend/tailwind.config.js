// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: This is where Tailwind looks for your classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all files inside the 'src' directory and its subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}