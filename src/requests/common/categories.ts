import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

export const getCategoriesRequest = (category: string) => {
  return axios.get(`${API_URL.CATEGORIES}/${category}`).then((res) => res.data);
};
