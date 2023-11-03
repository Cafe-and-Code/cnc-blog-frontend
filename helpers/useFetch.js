import axios from 'axios'
import { Constants } from '@/utils/Constants'
import { Urls } from '@/utils/Urls'

const requestElic = axios.create({
  baseURL: Urls.BASE_URL_ELIC,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json'
  }
})

requestElic.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constants.TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete requestElic.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error)
)

const requestOther = axios.create({
  baseURL: Urls.BASE_URL_OTHER,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json'
  }
})

requestOther.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constants.TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete requestOther.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error)
)

const requestDownload = axios.create({
  baseURL: Urls.BASE_URL_ELIC,
  timeout: 10000,
  responseType: 'blob'
})

requestDownload.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constants.TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete requestDownload.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error)
)

const requestForm = axios.create({
  baseURL: Urls.BASE_URL_ELIC,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

requestForm.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constants.TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete requestForm.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error)
)

export const useApi = {
  requestElic,
  requestOther,
  requestDownload,
  requestForm
}
