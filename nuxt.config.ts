// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,

    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-security',
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
      files: '',
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          'self',
          'data:',
          'http://localhost:3333',
          'https://avengers.steewo.io/',
          'https://steewo-space-fr-01.fra1.cdn.digitaloceanspaces.com/',
        ],
      },
    },
  },
})
