import dayjs from 'dayjs'

import '@/styles/components/post-blog.scss'
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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const RandomColorBox = () => {
        const randomColor = getRandomColor();
        const rgbaBackgroundColor = `${randomColor}2A`;
        return { color: randomColor, background: rgbaBackgroundColor }
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
                        <div key={index} style={RandomColorBox()} className='category-item'>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}   