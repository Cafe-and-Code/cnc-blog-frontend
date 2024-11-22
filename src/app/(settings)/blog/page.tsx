'use client'
import { useEffect, useState } from 'react';

import '@/styles/blog.scss'

import axios from '@/lib/axios';

import PostBlog from '@/components/post-blog';
import { Skeleton } from "@/components/ui/skeleton";

import { API_URL } from '@/app/constant/api-config';

export default function Blog() {
    const [listPost, setListPost] = useState([])
    const [post, setPost] = useState({
        id: '',
        title: '',
        createdAt: '',
        description: '',
        titleImageUrl: '',
        categories: ''
    })
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'OK',
        cancelBtn: 'Cancel'
    });

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(API_URL.POSTS);
                setListPost(response.data);
                setPost(response.data[0])
                console.log(response.data); // Log the response data instead
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
                {/* <Skeleton className="h-[200px] w-[650px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div> */}
                THE BLOG
            </div>
            <div className='recent-blog-post'>
                <div></div>
                <div>
                    {listPost?.map((item, index) => (
                        index < 3 && <PostBlog key={index} postItems={item} />
                    ))}
                </div>
            </div>
            <div className='all-blog-post'>
                {/* {listPost?.map((item, index) => (
                    <PostBlog key={index} postItems={item} />
                ))} */}
            </div>
        </div>
    )
}