import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

export const uploadImageRequest = (dataBody: FormData) => {
  return axios.post(API_URL.UPLOAD_IMAGE, dataBody, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
