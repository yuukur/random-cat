/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: false,
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },

  content: [],
  theme: {
    extend: {
      screens: {
        "my-break-point": "350px",
      },
    },
  },
  plugins: [],
};
