import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import { API_URL } from '@/constants/api-config';
import * as httpCode from '@/constants/enum/httpStatus';
import { refreshRequest } from '@/requests/auth/loginRequest';

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
    const status = response?.status;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (status === httpCode.UNAUTHENTICATED && originalRequest) {
      // Prevent infinite loop (call back hell) if refresh_token request itself gets 401
      if (originalRequest.url === API_URL.REFRESH_TOKEN) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // If another request has been tried, reject it immediately.
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      try {
        await refreshRequest();
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    if (response) {
      return Promise.reject(response.data);
    }
    // Handle the error
    return Promise.reject(error);
  },
);

export default axiosInstance;
