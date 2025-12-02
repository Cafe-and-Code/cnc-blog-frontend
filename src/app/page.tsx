'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import '@/styles/home.scss';

import axios from '@/lib/axios';

import PostBlog from '@/components/post-blog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { updatePostId } from '@/store/auth.store';

import { isApiError } from '@/app/utils/error';
import { API_URL } from '@/constants/api-config';
import { getPostsRequest } from '@/requests/posts';

import { IPostItem } from '@/types/model/posts';

export default function Home() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [recentPosts, setRecentPots] = useState<IPostItem[]>([]);
  const [listPost, setListPost] = useState<IPostItem[]>([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel',
  });

  const getRecentPosts = async () => {
    try {
      const response = await getPostsRequest(1, 3);
      setRecentPots(response?.posts);
    } catch (error: unknown) {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }));
      let message = '';
      if (isApiError(error)) {
        message = error.message;
      }
      setDialogList((prev) => ({
        ...prev,
        title: 'Error',
        visible: true,
        message,
      }));
    }
  };

  const getPosts = async (page = 1, perPage = 6) => {
    try {
      const response = await getPostsRequest(page, perPage);
      setListPost(response?.posts);
      const mathPerpage = Math.ceil(response?.totalPosts / 6);
      setTotalPage(mathPerpage);
    } catch (error: unknown) {
      setDialogList((prev) => ({
        ...prev,
        visible: false,
      }));
      let message = '';
      if (isApiError(error)) {
        message = error.message;
      }
      setDialogList((prev) => ({
        ...prev,
        title: 'Error',
        visible: true,
        message,
      }));
    }
  };

  const changePage = (index: number) => {
    getPosts(index + 1, 6);
    sessionStorage.setItem('currentPage', `${index + 1}`);
    setActiveCurrentPage(index + 1);
  };

  const prevPage = () => {
    getPosts(activeCurrentPage - 1, 6);
    sessionStorage.setItem('currentPage', `${activeCurrentPage - 1}`);
    setActiveCurrentPage(activeCurrentPage - 1);
  };

  const nextPage = () => {
    getPosts(activeCurrentPage + 1, 6);
    sessionStorage.setItem('currentPage', `${activeCurrentPage + 1}`);
    setActiveCurrentPage(activeCurrentPage + 1);
  };

  useEffect(() => {
    getRecentPosts();
    const storedValue = sessionStorage.getItem('currentPage');
    if (storedValue) {
      getPosts(Number(storedValue), 6);
      setActiveCurrentPage(Number(storedValue));
    } else {
      getPosts();
    }
  }, []);

  const handleBlogDetail = (title: string, id: number) => {
    const updatedUserInfo = {
      id: id,
      name: title,
    };
    dispatch(updatePostId(updatedUserInfo));
    router.push(`/${title}`);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">THE BLOG</div>
      <div className="blog-body">
        <div className="recent-blog-post">
          <div className="title">{t('pages.posts.recent_blog_posts')}</div>
          <div className="recent-content">
            {recentPosts?.map((item: IPostItem, index: number) => (
              <PostBlog
                key={index}
                postItems={item}
                customClass={`post-${index}`}
                onClick={() => handleBlogDetail(item.title, item.id)}
              />
            ))}
          </div>
        </div>
        <div className="all-blog-post">
          <div className="title">All blog posts</div>
          <div className="all-content">
            {listPost?.map((item: IPostItem, index: number) => (
              <PostBlog
                key={index}
                postItems={item}
                customClass={`post-${index}`}
                onClick={() => handleBlogDetail(item.title, item.id)}
              />
            ))}
          </div>
          {!listPost.length && (
            <div className="text-center text-lg font-medium">No posts</div>
          )}
          {!!listPost.length && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      activeCurrentPage <= 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                    onClick={prevPage}
                  />
                </PaginationItem>
                <div className="pagination">
                  {Array.from({ length: totalPage }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          activeCurrentPage === index + 1 ? true : false
                        }
                        onClick={() => changePage(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>
                <PaginationItem>
                  <PaginationNext
                    className={
                      activeCurrentPage >= totalPage
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                    onClick={nextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
