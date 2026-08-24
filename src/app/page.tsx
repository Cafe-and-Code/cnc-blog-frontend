'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import PostBlog from '@/components/post-blog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { updatePostId } from '@/store/auth.store';

import { getPostsRequest } from '@/requests/posts';
import { isApiError } from '@/utils/error';

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
    router.push(`blogs/${title}`);
  };

  const recentCustomClasses = [
    { customClass: 'xl:row-span-2 flex-col justify-start' },
    {
      customClass: 'xl:items-center',
      imageClass: 'xl:max-w-[320px] xl:w-auto xl:h-fit',
      titleClass: 'xl:w-[300px]',
    },
    {
      customClass: 'xl:items-center',
      imageClass: 'xl:max-w-[320px] xl:w-auto xl:h-fit',
      titleClass: 'xl:w-[300px]',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center text-[var(--color-12)] text-[65px] font-bold border-y border-[var(--border-color-01)] my-[30px] md:text-[110px] xl:text-[180px]">
        THE BLOG
      </div>
      <div>
        <div className="flex flex-col gap-[30px] px-5 py-[30px] md:px-8 xl:px-20">
          <div className="text-2xl font-semibold leading-8 text-center md:text-left">
            {t('pages.posts.recent_blog_posts')}
          </div>
          <div className="mx-auto grid gap-8 grid-cols-1 xl:grid-cols-2 xl:grid-rows-2">
            {recentPosts?.map((item: IPostItem, index: number) => (
              <PostBlog
                key={index}
                postItems={item}
                customClass={recentCustomClasses[index]?.customClass}
                imageClass={recentCustomClasses[index]?.imageClass}
                titleClass={recentCustomClasses[index]?.titleClass}
                onClick={() => handleBlogDetail(item.title, item.id)}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--border-color-01)] px-5 py-[30px] flex flex-col gap-[30px] md:px-8 xl:px-20">
          <div className="text-2xl font-semibold leading-8 text-center md:text-left">
            All blog posts
          </div>
          <div className="mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {listPost?.map((item: IPostItem, index: number) => (
              <PostBlog
                key={index}
                postItems={item}
                customClass="xl:max-w-[440px] flex-col"
                imageClass="xl:max-w-[400px] xl:h-[240px]"
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
                <div className="flex flex-wrap justify-center">
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
