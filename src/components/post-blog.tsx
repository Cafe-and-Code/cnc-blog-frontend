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
    onClick?: () => void
}
export default function PostBlog({ postItems, onClick = () => { } }: PostType) {
    return (
        <div className='post' onClick={onClick}>
            {postItems.titleImageUrl && <img src={postItems.titleImageUrl} alt={postItems.titleImageUrl} />}
            <div className='post-content'>
                {postItems.createdAt && <div className='post-date-time'>{postItems.createdAt}</div>}
                {postItems.title && <div className='post-title'>{postItems.title}</div>}
                {postItems.description && <div className='post-description'>{postItems.description}</div>}
                <div className='post-category'>
                    {postItems?.categories?.map((item, index) => (
                        <div key={index} className='category-item'>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}   