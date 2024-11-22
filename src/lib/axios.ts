import axios from 'axios';
import { Cookies } from 'react-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.baseApi, // Replace with your API base URL
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const cookies = new Cookies();
    const token = cookies.get('token'); // Retrieve auth token from cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;