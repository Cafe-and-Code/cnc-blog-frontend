'use client';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import '@/styles/components/blog-detail.scss';

import axios from '@/lib/axios';

import BaseTab from '@/components/base/BaseTab';
import PostBlog from '@/components/post-blog';

import { updatePostId } from '@/store/auth';

import { isApiError } from '@/app/utils/error';
import { API_URL } from '@/constants/api-config';

import { IPostItem, IPostItemDetail } from '@/types/model/posts';
import { IUserState } from '@/types/store';

export default function BlogDetail() {
  const router = useRouter();
  const parrams = useParams();
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([]);
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
      const response = await axios.get(API_URL.POSTS);
      setListPost(response?.data?.posts);
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
      console.log(parramDetail);

      const api = `${API_URL.POSTS}/${parramDetail}`;
      const response = await axios.get(api);
      setListPostDetail(response.data);
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
    router.push(`/${title}`);
  };

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="blog-detail">
      <div className="recent-post">
        <div className="title">Recent blog posts</div>
        <div className="recent-content">
          {listPost?.map(
            (item: IPostItem, index: number) =>
              index < 4 && (
                <PostBlog
                  key={index}
                  postItems={item}
                  customClass={`post-${index}`}
                  onClick={() => handleBlogDetail(item.title, item.id)}
                />
              ),
          )}
        </div>
      </div>
      {listPostDetail && (
        <div className="post-detail">
          <div className="post-date">
            {formatDate(listPostDetail.createdAt)}
          </div>
          <div className="post-title">{listPostDetail.title}</div>
          <div className="post-description">{listPostDetail.description}</div>
          <div className="post-category">
            {listPostDetail?.categories?.map((item, index) => (
              <BaseTab key={index} name={item} />
            ))}
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: listPostDetail.content }}
          ></div>
        </div>
      )}
    </div>
  );
}
