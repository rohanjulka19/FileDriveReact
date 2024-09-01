/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: '#F7F5F1',
        hoverColor: '#EBE9E5',
        hoverColor1: '#F7F5F1',
        siebarTextColor: '#736C64',
        dialogButtonHoverColor: '#EFEDE9',
        dialogButtonColor: '#d9d4cc3b',
        createButtonHoverColor: '#393634',
        dialogButtonDisabled: '#BBB5AE',
        darkHoverColor: '#393634'
      },
      fontFamily: {
        text: ['Poppins', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
