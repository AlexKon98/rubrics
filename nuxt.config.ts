export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: [
    '@/assets/style/style.scss',
  ],
  modules: [
    '@pinia/nuxt',
  ]
});
