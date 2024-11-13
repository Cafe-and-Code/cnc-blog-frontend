'use client'
import Link from 'next/link'
import { useTheme } from "next-themes"
import React, { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import '@/styles/components/header.scss'

import ToggleMode from '@/components/toggle-mode';
import { Button } from '@/components/ui/button';

import { logout } from '@/store/auth';

interface HeaderOtherType {
    disabledPublish?: boolean,
    onPost?: () => void
}

export default function HeaderNewPost({onPost, disabledPublish}:HeaderOtherType) {
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
                <Button variant={disabledPublish ? 'disabled' : 'default'} onClick={onPost}>Publish</Button>
                <Button variant='outline' onClick={onLogout}>Log out</Button>
                <ToggleMode value={mode} onChange={onToggle}/>
            </div>
        </div>
    )
}