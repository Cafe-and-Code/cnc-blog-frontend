'use client'
import Link from 'next/link'
import { useTheme } from "next-themes"
import React, { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import '@/styles/components/header.scss'

import { logout } from '@/store/auth';

interface HeaderOtherType {
    onPost?: () => void
}

export default function HeaderNewPost({onPost}:HeaderOtherType) {
  const dispatch = useDispatch();
    const { setTheme, resolvedTheme } = useTheme();
    const [mode, setMode] = useState(resolvedTheme || 'light');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
    useEffect(() => {
      setTheme(mode);
    }, [mode, setTheme]);
  
    const onToggle = () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const onLogout = () => {
      removeCookie('token', { path: '/' })
      dispatch(logout());
      window.location.href = '/login';
    }
    return (
        <div className='header-cnc'>
            <div className='cnc-logo-area'>
                <Link href={{pathname:'/'}}>Cnc Blog</Link>
            </div>
            <div className='cnc-navigation'>
                <button onClick={onPost}>Publish</button>
                <button onClick={onLogout}>Log out</button>
                <button onClick={onToggle}>Toggle</button>
            </div>
        </div>
    )
}