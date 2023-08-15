/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        'custom-black': '#0f0f0f',
        'custom-gray': '#606060',
        'custom-f2': '#f2f2f2',
        'custom-13': '#131313',
        'custom-ce': '#cecece',
      },
    },
  },
  plugins: [],
};
