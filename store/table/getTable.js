import { defineStore } from 'pinia'
import { useApi } from '@/helpers/useFetch'

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null
  }),

  actions: {
    async registerUser() {
      try {
        this.userData = await useApi.requestElic.get('https://api.nuxtjs.dev/beers')
      } catch (error) {
        // let the form component display the error
        return error
      }
    }
  }
})
