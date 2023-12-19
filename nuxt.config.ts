// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@pinia/nuxt','@vueuse/nuxt','@nuxt/image','@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  colorMode: {
    preference: 'light',
  }
})