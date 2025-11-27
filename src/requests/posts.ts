import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

import { IPostList } from '@/types/model/posts';

export const getPostsRequest = (pageNumber: number, pageSize: number) => {
  return axios
    .get<IPostList>(API_URL.POSTS, {
      params: { pageNumber, pageSize },
    })
    .then((res) => res.data);
};
