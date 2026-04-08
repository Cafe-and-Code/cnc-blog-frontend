import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

import type { ILogoutResponse } from '@/types/model/auth';

export const logoutRequest = () => {
  return axios.post<ILogoutResponse>(API_URL.LOG_OUT).then((res) => res);
};
