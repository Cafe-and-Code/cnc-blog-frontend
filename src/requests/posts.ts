import axios from '@/lib/axios';

import { API_URL } from '@/constants/api-config';

import { ICreatePostPayload, IPostList } from '@/types/model/posts';

export const getPostsRequest = (pageNumber: number, pageSize: number) => {
  return axios
    .get<IPostList>(API_URL.POSTS, {
      params: { pageNumber, pageSize },
    })
    .then((res) => res.data);
};

export const getPostDetailRequest = (parramDetail: string | string[]) => {
  return axios.get(`${API_URL.POSTS}/${parramDetail}`).then((res) => res.data);
};

export const createPostRequest = (data: ICreatePostPayload) => {
  return axios.post(API_URL.POSTS, data).then((res) => res.data);
};
