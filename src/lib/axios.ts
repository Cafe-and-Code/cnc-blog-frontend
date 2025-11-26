import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import { IErrorResponse } from '@/types/error';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.baseApi, // Replace with your API base URL
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //   const cookies = new Cookies();
  //   const accessToken = cookies.get('accessToken'); // Retrieve auth token from cookies

  //   if (accessToken) {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //   }
  //   return config;
  return config;
});

// Add a request interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<IErrorResponse>) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response.data);
    }
    // Handle the error
    return Promise.reject(error);
  },
);

export default axiosInstance;
