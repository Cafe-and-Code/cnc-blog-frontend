import dayjs from 'dayjs'

import '@/styles/components/post-blog.scss'

import BaseTab from './base/BaseTab'
interface PostType {
    postItems: {
        id?: number | string,
        createdAt?: string,
        title?: string,
        description?: string,
        titleImageUrl?: string,
        categories?: string[]
    },
    customClass?: string,
    onClick?: () => void
}
export default function PostBlog({ postItems, customClass, onClick = () => { } }: PostType) {
    const formatDate = (date: string) => {
        return dayjs(date).format('dddd, D MMM YYYY')
    }

    return (
        <div className={`post ${customClass}`} onClick={onClick}>
            {postItems.titleImageUrl && <img className='post-image' src={postItems.titleImageUrl} alt={postItems.titleImageUrl} />}
            <div className='post-content'>
                {postItems.createdAt && <div className='post-date-time'>{formatDate(postItems.createdAt)}</div>}
                {postItems.title && <div className='post-title'>{postItems.title}</div>}
                {postItems.description && <div className='post-description'>{postItems.description}</div>}
                <div className='post-category'>
                    {postItems?.categories?.map((item, index) => (
                        <BaseTab key={index} name={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}   