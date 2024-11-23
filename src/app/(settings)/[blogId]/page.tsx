'use client'
import { useSelector } from 'react-redux';

import '@/styles/components/blog-detail.scss'

export default function BlogDetail() {
    const postBlogId = useSelector((state: any) => state.user.postId);
    return <div className='blog-detail'>My Post: {postBlogId.name} {postBlogId.id}</div>
}