'use client'
import { useEffect, useState } from 'react';

import '@/styles/blog.scss'

import axios from '@/lib/axios';

import PostBlog from '@/components/post-blog';
import { Skeleton } from "@/components/ui/skeleton";

import { API_URL } from '@/app/constant/api-config';

export default function Blog() {
    const [listPost, setListPost] = useState([])
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'OK',
        cancelBtn: 'Cancel'
    });

    const renderClass = () => {

    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(API_URL.POSTS);
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
        };
        getPosts();
    }, [])

    return (
        <div className='blog-page'>
            <div className="blog-header">
                THE BLOG
            </div>
            {listPost && <div className='blog-body'>
                <div className='recent-blog-post'>
                    <div className='title'>Recent blog posts</div>
                    <div className='recent-content'>
                        {listPost?.map((item, index) => (
                            index < 3 && <PostBlog key={index} postItems={item} customClass={`post-${index}`} />
                        ))}
                    </div>
                </div>
                <div className='all-blog-post'>
                    {/* {listPost?.map((item, index) => (
                    <PostBlog key={index} postItems={item} />
                ))} */}
                </div>
            </div>}
        </div>
    )
}