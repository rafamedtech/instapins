import { resolve } from 'path'
import axios from 'axios'
const dynamicRoutes = () => {
  return axios.get('https://instapins-api.herokuapp.com/pins/').then((res) => {
    return res.data.map((pin) => `/${pin.id}`)
  })
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Instapins',
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

    // '@nuxtjs/html-validator',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',

    [
      'nuxt-supabase',
      {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
      },
    ],
  ],

  alias: {
    icons: resolve(__dirname, 'node_modules/vue-material-design-icons'),
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000/',
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
    watchLoggedIn: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'users/token/',
            method: 'post',
            propertyName: 'access',
          },
          refresh: {
            url: 'users/token/refresh/',
            method: 'post',
            propertyName: 'access',
          },
          logout: { url: 'users/logout/', method: 'post' },
          user: { url: 'users/user/', method: 'get' },
        },
        user: {
          property: false,
        },
      },
    },
  },

  generate: {
    routes: dynamicRoutes,
  },
}
