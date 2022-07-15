import { resolve } from 'path'
import axios from 'axios'
const dynamicRoutes = () => {
  return axios.get('https://instapins.herokuapp.com/pins').then((res) => {
    return res.data.map((pin) => `/pins/${pin.id}`)
  })
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

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
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'nuxt-supabase',
      {
        supabaseUrl: 'https://geqogioegammsiznrksj.supabase.co',
        supabaseKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcW9naW9lZ2FtbXNpem5ya3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUxNjQ3MjMsImV4cCI6MTk3MDc0MDcyM30.HXWRyc7e8T_k3c0gb-XTAuWIr-Ss1MiAjhPpTmtWtNM',
      },
    ],
  ],

  alias: {
    icons: resolve(__dirname, 'node_modules/vue-material-design-icons'),
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://instapins.herokuapp.com/' || 'http://localhost:8000/',
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
          user: { url: 'users/user/', method: 'get' },
        },
        user: {
          property: false,
        },
      },
    },
  },

  transpile: ['vee-validate/dist/rules'],

  generate: {
    routes: dynamicRoutes,
  },
}
