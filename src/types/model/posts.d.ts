export interface IPostItem {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  titleImageUrl: string;
  categories: string[];
}

export interface IPostItemDetail {
  id: number;
  author: string;
  createdAt: string;
  title: string;
  description: string;
  titleImageUrl: string;
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
