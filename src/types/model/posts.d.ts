export interface IPostItem {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
}

export interface IPostItemDetail {
  id: number;
  author: string;
  createdAt: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  content: string;
}

export interface IPostType {
  postItems: {
    id?: number | string;
    createdAt?: string;
    title?: string;
    description?: string;
    image?: string;
    categories?: string[];
  };
  customClass?: string;
  onClick?: () => void;
}

export interface IPostList {
  currentPage: number;
  posts: IPostItem[];
  totalPage: number;
  totalPosts: number;
}

export interface ICreatePostPayload {
  title: string;
  description: string;
  image: string;
  categories: string[];
  content: string;
  user_id: number;
  status: number;
}
