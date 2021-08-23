module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme : {
    backgroundColor: theme => ({
      ...theme('colors'),
      "blue": "#011627",
      "white": "#fdfffc",
      "cyan": "#2ec4b6",
      "red": "#e71d36",
      "yellow": "#ff9f1c",
      "wheat": "#f0dab5",
      "peru": "#b58962"
    }),
    textColor: theme => ({
      ...theme('colors')
    })
  },
}
