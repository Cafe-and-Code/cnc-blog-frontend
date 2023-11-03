import { defineStore } from 'pinia'
import { useApi } from '@/helpers/useFetch'

export const useTableData = defineStore('table', {
  state: () => ({
    tableData: null
  }),

  actions: {
    async getTableItems() {
      try {
        this.tableData = await useApi.requestElic.get('https://api.nuxtjs.dev/beers')
      } catch (error) {
        // let the form component display the error
        return error
      }
    }
  }
})
