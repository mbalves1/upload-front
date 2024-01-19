// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    'vuetify-nuxt-module',
    '@unocss/nuxt',
    ['@pinia/nuxt',
      {
        autoImportsimport: ['defineStore']
      }
    ],
    '@nuxtjs/google-fonts'
  ],
  imports: {
    dirs: [
      'store',
      'composables',
      'composables/*/index.{ts,js,mjs,mts}'
    ],
  },
  build: {
    transpile: ['chart.js', 'xlsx'],
  },
})
