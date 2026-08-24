import dayjs from 'dayjs';

import BaseTab from './base/BaseTab';

import { IPostType } from '@/types/model/posts';

export default function PostBlog({
  postItems,
  customClass,
  imageClass,
  titleClass,
  onClick = () => {},
}: IPostType) {
  const formatDate = (date: string) => {
    return dayjs(date).format('dddd, D MMM YYYY');
  };

  return (
    <div
      className={`flex gap-6 p-5 cursor-pointer hover:shadow-[0_0_11px_var(--color-01)] hover:rounded-2xl ${customClass}`}
      onClick={onClick}
    >
      {postItems.image && (
        <img
          className={`w-full ${imageClass || ''}`}
          src={postItems.image}
          alt={postItems.image}
        />
      )}
      <div className="w-full flex flex-col gap-3">
        {postItems.createdAt && (
          <div className="text-[var(--color-02)] text-sm font-semibold leading-5">
            {formatDate(postItems.createdAt)}
          </div>
        )}
        {postItems.title && (
          <div className={`h-[70px] text-2xl font-semibold leading-8 text-[var(--color-01)] overflow-hidden max-h-[70px] text-ellipsis ${titleClass || ''}`} title={postItems.title}>
            {postItems.title}
          </div>
        )}
        {postItems.description && (
          <div className="h-[60px] relative text-[var(--color-05)] text-base font-normal leading-6 break-all overflow-hidden text-ellipsis max-h-[50px]" title={postItems.description}>
            {postItems.description}
          </div>
        )}
        <div className="mt-3 flex gap-2 flex-wrap">
          {postItems?.categories?.map((item, index) => (
            <BaseTab key={index} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
