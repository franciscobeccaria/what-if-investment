module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        100: '26rem',
        110: '28rem',
        120: '30rem',
        130: '32rem',
        140: '34rem',
        150: '36rem',
        '90%': '90%',
        '95%': '95%',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      dark: '#252525',
    }),
    zIndex: {
      'neg-30': '-30',
      'neg-20': '-20',
      'neg-10': '-10',
      10: '10',
    },
    fontFamily: {
      inter: ['inter', 'serif'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
