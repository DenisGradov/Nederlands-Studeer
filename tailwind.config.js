/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure all relevant files are included
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'gray': 'rgba(99, 103, 115, 0.80)',
        'selection': 'rgba(99, 103, 115, 0.8)',
        'border-custom': 'rgba(255, 255, 255, 0.05)',
      },
      backgroundColor: {
        'custom-bg': 'rgba(255, 255, 255, 0.02)',
        'custom-bg2': 'rgba(255, 255, 255, 0.02)',
      },
    },
  },
  plugins: [],
}
