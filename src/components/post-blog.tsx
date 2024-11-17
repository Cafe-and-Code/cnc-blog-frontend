import '@/styles/components/post-blog.scss'
interface PostType {
    postItems: {
        id?: number | string,
        dateTime?: string,
        title?: string,
        description?: string,
        image?: string,
        category?: string[]
    },
    onClick: () => void
}
export default function postBlog({ postItems, onClick = () => { } }: PostType) {
    return (
        <div className='post' onClick={onClick}>
            {postItems.image && <img src={postItems.image} alt={postItems.image} />}
            <div className='post-content'>
                {postItems.dateTime && <div className='post-date-time'>{postItems.dateTime}</div>}
                {postItems.title && <div className='post-title'>{postItems.title}</div>}
                {postItems.description && <div className='post-description'>{postItems.description}</div>}
                <div className='post-category'>
                    {postItems?.category?.map((item, index) => (
                        <div key={index} className='category-item'>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}   