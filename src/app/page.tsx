'use client'
import '@/styles/home.scss'
import { useSelector } from 'react-redux';
export default function Home() {
  const userId = useSelector((state: any) => state.user.userId);

  return (
    <div className='text-center'>
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome to our Blog!
      </h1>
      <p className="scroll-m-20">
        This is a blog where you can read about Code Exp and other cool things.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "Code can't lie, comments can" 🐧
      </blockquote>
      <div>{process.env.baseApi}</div>
      <h2>Thông Tin Người Dùng</h2>
      {userId && (
        <div>User ID: {userId}</div>
      )}</div>

  );
}
