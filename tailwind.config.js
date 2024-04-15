/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: ['cupcake'], // This array should be empty to prevent automatic dark theme application
  },
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        "green": "#39DB4A",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#FCFCFC",
        
      },
      // fontFamily:{
      //   "primary":['Inter','sans-serif']
      // }
    },
  },
  plugins: [require('daisyui')],
};
