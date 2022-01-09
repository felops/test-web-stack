module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-custom':'#f8f8f8'
      },
      fontFamily: {
        sans: ['"Source Sans Pro", "Helvetica", "serif"']
      }
    },
  },
  plugins: [],
}
