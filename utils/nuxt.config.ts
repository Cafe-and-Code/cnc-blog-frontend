// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vuestic/nuxt'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/common/_variables.scss" as *;'
        }
      }
    }
  },
  css: ['~/assets/scss/vendor/main.scss']
})
