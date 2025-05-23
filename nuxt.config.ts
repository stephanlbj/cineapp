import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    tmdbAccessToken: process.env.NUXT_TMDB_ACCESS_TOKEN,
    public: {
      apiBaseUrl: process.env.NUXT_API_URL,
      tmdbApiKey: process.env.NUXT_TMDB_API_KEY,
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/styles/main.scss',
    '~/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@hebilicious/vue-query-nuxt',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
  ],
  test: true,
})
