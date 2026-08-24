'use client';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import axios from '@/lib/axios';

import BaseTab from '@/components/base/BaseTab';
import PostBlog from '@/components/post-blog';

import { updatePostId } from '@/store/auth.store';

import { API_URL } from '@/constants/api-config';
import { getPostDetailRequest, getPostsRequest } from '@/requests/posts';
import { isApiError } from '@/utils/error';

import { IPostItem, IPostItemDetail } from '@/types/model/posts';
import { IUserState } from '@/types/store';

export default function BlogDetail() {
  const router = useRouter();
  const parrams = useParams();
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState<IPostItem[]>([]);
  const postBlogId = useSelector((state: IUserState) => state.user.postId);
  const [listPostDetail, setListPostDetail] = useState<IPostItemDetail>();
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel',
  });

  const formatDate = (date: string) => {
    return dayjs(date).format('dddd, D MMM YYYY');
  };

  const getPosts = async () => {
    try {
      const response = await getPostsRequest(1, 3);
      setListPost(response?.posts);
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

  const getPostDetail = useCallback(async () => {
    try {
      const parramDetail =
        postBlogId.name !== parrams?.blogId ? parrams?.blogId : postBlogId.name;
      const response = await getPostDetailRequest(parramDetail);
      setListPostDetail(response);
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
  }, [postBlogId.name, parrams.blogId]);

  const handleBlogDetail = (title: string, id: number) => {
    const updatedUserInfo = {
      id: id,
      name: title,
    };
    dispatch(updatePostId({ ...updatedUserInfo }));
    console.log(router);

    router.push(`/blogs/${title}`);
  };

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col-reverse gap-8 p-[30px] xl:flex-row xl:py-[30px] xl:px-[112px]">
      <div className="flex flex-col items-center gap-8 xl:items-start">
        <div className="text-2xl font-semibold leading-8">Recent blog posts</div>
        <div className="flex flex-col gap-8 w-full md:mx-auto md:grid md:grid-cols-[342px_342px] md:grid-rows-[auto_auto] xl:flex xl:flex-col">
          {listPost?.map((item: IPostItem, index: number) => (
            <PostBlog
              key={index}
              postItems={item}
              customClass={`flex-col w-full xl:w-[342px]`}
              onClick={() => handleBlogDetail(item.title, item.id)}
            />
          ))}
        </div>
      </div>
      {listPostDetail && (
        <div className="flex flex-col gap-8">
          <div className="text-[var(--color-02)] text-sm font-semibold leading-5 break-all">
            {formatDate(listPostDetail.createdAt)}
          </div>
          <div className="text-2xl font-semibold leading-8 text-[var(--color-01)] break-all overflow-hidden text-ellipsis">
            {listPostDetail.title}
          </div>
          <div className="relative text-[var(--color-05)] text-base leading-6 break-all overflow-hidden text-ellipsis max-h-[100px]">
            {listPostDetail.description}
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {listPostDetail?.categories?.map((item, index) => (
              <BaseTab key={index} name={item} />
            ))}
          </div>
          <div
            className="[&_h1]:text-[2em] [&_h2]:text-[1.5em] [&_h3]:text-[1.17em] [&_h4]:text-[1em] [&_h5]:text-[0.83em] [&_h6]:text-[0.67em] [&_pre]:text-[var(--color-11)] [&_pre]:bg-[var(--color-01)] [&_pre]:p-5 [&_pre]:rounded"
            dangerouslySetInnerHTML={{ __html: listPostDetail.content }}
          ></div>
        </div>
      )}
    </div>
  );
}
