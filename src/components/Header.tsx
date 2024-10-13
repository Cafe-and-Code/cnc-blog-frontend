'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
import { useCookies } from 'react-cookie';
import '@/styles/components/header.scss'

export default function Header() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mode, setMode] = useState(resolvedTheme || 'light');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
    useEffect(() => {
      setTheme(mode);
    }, [mode, setTheme]);
  
    const toggle = () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };
    const router = usePathname();
    const menuList = [
        { name: 'Blog', path: '/blog' },
        { name: 'Newsletter', path: '/new-post' },
    ]

    const [activeLink, setActiveLink] = useState(router);
  
    const handleLinkClick = (path:any) => {
      setActiveLink(path);
    };

    const logout = () => {
      removeCookie('token', { path: '/' })
      window.location.href = '/login';
    }
    return (
        <div className='header-cnc'>
            <div className='cnc-logo-area'>
                <Link href={{pathname:'/'}}>Cnc Blog</Link>
            </div>
            <div className='cnc-navigation'>
                {menuList.map((item, index) => (
                   <div key={index} className={`cnc-page ${activeLink === item.path? 'active-navigation' : ''}`}><Link className='cnc-navigator' href={{pathname:item.path}} onClick={() => handleLinkClick(item.path)}>{item.name}</Link></div>
                ))}
                <button onClick={logout}>Log out</button>
                <button onClick={toggle}>Toggle</button>
            </div>
        </div>
    )
}