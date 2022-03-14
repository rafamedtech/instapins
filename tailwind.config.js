module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      boxShadow: {
        pinterest: 'rgb(0 0 0 / 10%) 0px 1px 20px 0px',
        nav: 'rgb(0 0 0 / 10%) 0px 8px 8px -8px',
      },
      container: {
        center: true,
        screens: {
          lg: '1124px',
          xl: '1124px',
          '2xl': '1124px',
        },
      },
    },
  },
  plugins: [],
}
