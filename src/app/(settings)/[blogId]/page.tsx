'use client'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '@/styles/components/blog-detail.scss'

import axios from '@/lib/axios';

import { API_URL } from '@/app/constant/api-config';

interface PostItemDetail {
    id: number,
    author: string,
    createdAt: string,
    title: string,
    description: string,
    titleImageUrl: string,
    categories: string[],
    content: string
}

export default function BlogDetail() {
    const postBlogId = useSelector((state: any) => state.user.postId);
    const [listPost, setListPost] = useState<PostItemDetail>()
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'OK',
        cancelBtn: 'Cancel'
    });

    const getPosts = useCallback(async () => {
        try {
            const api = `${API_URL.POSTS}/${postBlogId.id}`;
            const response = await axios.get(api);
            setListPost(response.data);
        } catch (error: any) {
            setDialogList((prev) => ({
                ...prev,
                visible: false,
            }));
            const data = error?.response?.data;
            const messages = data.errors.join('\n');
            setDialogList((prev) => ({
                ...prev,
                title: 'Error',
                visible: true,
                message: messages,
            }));
        }
    }, [postBlogId.id]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return <div className='blog-detail'>
        {listPost && <div>
            {listPost.id}
            {listPost.createdAt}
            {listPost.title}
            {listPost.description}
            <img src={listPost.titleImageUrl} alt={listPost.titleImageUrl} />
            <div dangerouslySetInnerHTML={{ __html: listPost.content }}></div>
        </div>}
    </div>
}