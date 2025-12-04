import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

import type { ILoginResponse } from '@/types/model/auth';

export const loginRequest = (data: { username: string; password: string }) => {
  return axios
    .post<ILoginResponse>(API_URL.LOGIN, data)
    .then((res) => res.data);
};

export const refreshRequest = () => {
  return axios
    .post<ILoginResponse>(API_URL.REFRESH_TOKEN)
    .then((res) => res.data);
};
