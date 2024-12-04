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
  const [recentPosts, setRecentPots] = useState([])
  const [listPost, setListPost] = useState([])
  const [activeCurrentPage, setActiveCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [userInfo, setUserInfo] = useState({ id: 0, name: '' });
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'OK',
    cancelBtn: 'Cancel'
  });

  const getRecentPosts = async () => {
    try {
      const response = await axios.get(API_URL.POSTS);
      setRecentPots(response?.data?.posts)
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
  }

  const getPosts = async (page = 1, perPage = 6) => {
    try {
      const response = await axios.get(API_URL.POSTS, { params: { pageNumber: page, pageSize: perPage } });
      setListPost(response?.data?.posts);
      const mathPerpage = Math.ceil(response?.data?.totalPosts / 6)
      setTotalPage(mathPerpage)
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

  const changePage = (index: number) => {
    getPosts(index + 1, 6)
    sessionStorage.setItem('currentPage', `${index + 1}`);
    setActiveCurrentPage(index + 1)
  }

  const prevPage = () => {
    getPosts(activeCurrentPage - 1, 6)
    sessionStorage.setItem('currentPage', `${activeCurrentPage - 1}`);
    setActiveCurrentPage(activeCurrentPage - 1)
  }

  const nextPage = () => {
    getPosts(activeCurrentPage + 1, 6)
    sessionStorage.setItem('currentPage', `${activeCurrentPage + 1}`);
    setActiveCurrentPage(activeCurrentPage + 1)
  }

  useEffect(() => {
    getRecentPosts()
    const storedValue = sessionStorage.getItem('currentPage');
    if (storedValue) {
      getPosts(Number(storedValue), 6);
      setActiveCurrentPage(Number(storedValue))
    } else {
      getPosts();
    }
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
      <div className='blog-body'>
        <div className='recent-blog-post'>
          <div className='title'>Recent blog posts</div>
          <div className='recent-content'>
            {recentPosts?.map((item: PostItem, index: number) => (
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
                <PaginationPrevious className={
                  activeCurrentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                } onClick={prevPage} />
              </PaginationItem>
              {Array.from({ length: totalPage }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink isActive={activeCurrentPage === index + 1 ? true : false} onClick={() => changePage(index)}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext className={
                  activeCurrentPage >= totalPage ? "pointer-events-none opacity-50" : undefined
                } onClick={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}