'use client'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import '@/styles/components/blog-detail.scss'

import axios from '@/lib/axios';

import BaseTab from '@/components/base/BaseTab';
import PostBlog from '@/components/post-blog';

import { updatePostId } from '@/store/auth';

import { API_URL } from '@/app/constant/api-config';

interface PostItem {
    id: number,
    createdAt: string,
    title: string,
    description: string,
    titleImageUrl: string,
    categories: string[]
}
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
    const router = useRouter()
    const parrams = useParams()
    const dispatch = useDispatch();
    const [listPost, setListPost] = useState([])
    const postBlogId = useSelector((state: any) => state.user.postId);
    const [listPostDetail, setListPostDetail] = useState<PostItemDetail>()
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'OK',
        cancelBtn: 'Cancel'
    });

    const formatDate = (date: string) => {
        return dayjs(date).format('dddd, D MMM YYYY')
    }

    const getPosts = async () => {
        try {
            const response = await axios.get(API_URL.POSTS);
            setListPost(response?.data?.posts);
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

    const getPostDetail = useCallback(async () => {
        try {
            const parramDetail = postBlogId.name !== parrams?.blogId ? parrams?.blogId : postBlogId.name
            console.log(parramDetail);

            const api = `${API_URL.POSTS}/${parramDetail}`;
            const response = await axios.get(api);
            setListPostDetail(response.data);
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
    }, [postBlogId.name, parrams.blogId]);

    const handleBlogDetail = (title: string, id: number) => {
        const updatedUserInfo = {
            id: id,
            name: title,
        };
        dispatch(updatePostId({ ...updatedUserInfo }));
        router.push(`/${title}`)
    }

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        getPostDetail();
    }, [getPostDetail]);

    return <div className='blog-detail'>
        <div className='recent-post'>
            <div className='title'>Recent blog posts</div>
            <div className='recent-content'>
                {listPost?.map((item: PostItem, index: number) => (
                    index < 4 && <PostBlog key={index} postItems={item} customClass={`post-${index}`} onClick={() => handleBlogDetail(item.title, item.id)} />
                ))}
            </div>
        </div>
        {listPostDetail && <div className='post-detail'>
            <div className='post-date'>{formatDate(listPostDetail.createdAt)}</div>
            <div className='post-title'>{listPostDetail.title}</div>
            <div className='post-description'>{listPostDetail.description}</div>
            <div className='post-category'>
                {listPostDetail?.categories?.map((item, index) => (
                    <BaseTab key={index} name={item} />
                ))}
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: listPostDetail.content }}></div>
        </div>}
    </div>
}