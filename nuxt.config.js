import { resolve } from 'path'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'image_uploader_frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'nuxt-supabase',
      {
        supabaseUrl: 'https://kkacmmdynlmnvnvjismq.supabase.co',
        supabaseKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYWNtbWR5bmxtbnZudmppc21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcyNjg3MjUsImV4cCI6MTk2Mjg0NDcyNX0.VQdkKKIz3wccr-54OOyh55gFRPTeuprJ62JmN4VJj5U',
      },
    ],
  ],

  alias: {
    icons: resolve(__dirname, 'node_modules/vue-material-design-icons'),
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'users/token/',
            method: 'post',
            propertyName: 'access',
          },
          logout: { url: 'users/logout/', method: 'post' },
          user: { url: 'users/', method: 'get' },
        },
        user: {
          property: false,
        },
      },
    },
  },
  // server: {
  //   host: '0',
  // },
}
