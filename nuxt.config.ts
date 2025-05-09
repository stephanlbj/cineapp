import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config

const API_URL = 'https://api.themoviedb.org/3'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      apiBaseUrl: API_URL,
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss', '~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@hebilicious/vue-query-nuxt', '@vueuse/motion/nuxt'],
})
