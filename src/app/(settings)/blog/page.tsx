import { useEffect,useState } from 'react';

import '@/styles/blog.scss'

import postBlog from '@/components/post-blog';
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
    const [allPost, setAllPost] = useState({

    })
    const [dialogList, setDialogList] = useState({
        visible: false,
        message: '',
        title: '',
        submitBtn: 'OK',
        cancelBtn: 'Cancel'
    });

    useEffect(() => {

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
            <div className='recent-blog-post'></div>
            <div className='all-blog-post'>

            </div>
        </div>
    )
}