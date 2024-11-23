'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import '@/styles/home.scss'

import axios from '@/lib/axios';

import PostBlog from '@/components/post-blog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton";

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

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [listPost, setListPost] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6)
  const [userInfo, setUserInfo] = useState({ id: 0, name: '' });
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel'
  });

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

  useEffect(() => {
    getPosts();
  }, [])

  const handleBlogDetail = (title: string, id: number) => {
    setUserInfo((prev) => {
      const updatedUserInfo = {
        ...prev,
        id: id,
        name: title,
      };
      dispatch(updatePostId(updatedUserInfo));
      return updatedUserInfo;
    });
    let endpoint
    if (title.trim().split(' ').length > 1) {
      endpoint = title.replace(/ /g, '-');
    } else {
      endpoint = title
    }
    router.push(`/${endpoint}`)
  }

  return (
    <div className='blog-page'>
      <div className="blog-header">
        THE BLOG
      </div>
      {listPost && <div className='blog-body'>
        <div className='recent-blog-post'>
          <div className='title'>Recent blog posts</div>
          <div className='recent-content'>
            {listPost?.map((item: PostItem, index: number) => (
              index < 3 && <PostBlog key={index} postItems={item} customClass={`post-${index}`} onClick={() => handleBlogDetail(item.title, item.id)} />
            ))}
          </div>
        </div>
        <div className='all-blog-post'>
          <div className='title'>All blog posts</div>
          <div className='all-content'>
            {listPost?.map((item: PostItem, index: number) => (
              <PostBlog key={index} postItems={item} customClass={`post-${index}`} onClick={() => handleBlogDetail(item.title, item.id)} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>}
    </div>
  )
}