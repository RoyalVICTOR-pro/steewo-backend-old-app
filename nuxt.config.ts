// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Prompt: [300, 400, 500, 600, 700],
          'DM Sans': true,
          download: true,
          inject: true,
        },
      },
    ],
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  colorMode: {
    preference: 'light',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {
    public: {
      api: '',
    },
  },
})
