import dayjs from 'dayjs';

import '@/styles/components/post-blog.scss';

import BaseTab from './base/BaseTab';

import { IPostType } from '@/types/model/posts';

export default function PostBlog({
  postItems,
  customClass,
  onClick = () => {},
}: IPostType) {
  const formatDate = (date: string) => {
    return dayjs(date).format('dddd, D MMM YYYY');
  };

  return (
    <div className={`post ${customClass}`} onClick={onClick}>
      {postItems.image && (
        <img
          className="post-image"
          src={postItems.image}
          alt={postItems.image}
        />
      )}
      <div className="post-content">
        {postItems.createdAt && (
          <div className="post-date-time">
            {formatDate(postItems.createdAt)}
          </div>
        )}
        {postItems.title && (
          <div className="post-title" title={postItems.title}>
            {postItems.title}
          </div>
        )}
        {postItems.description && (
          <div className="post-description" title={postItems.description}>
            {postItems.description}
          </div>
        )}
        <div className="post-category">
          {postItems?.categories?.map((item, index) => (
            <BaseTab key={index} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
