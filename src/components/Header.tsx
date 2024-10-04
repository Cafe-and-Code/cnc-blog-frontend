'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
import '@/styles/components/header.scss'

export default function Header() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mode, setMode] = useState(resolvedTheme || 'light');
  
    useEffect(() => {
      setTheme(mode);
    }, [mode, setTheme]);
  
    const toggle = () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };
    const router = usePathname();
    const menuList = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Login', path: '/login' }
    ]

    const [activeLink, setActiveLink] = useState(router);
  
    const handleLinkClick = (path:any) => {
      setActiveLink(path);
    };

    return (
        <div className='header-cnc'>
            <div className='cnc-logo-area'>
                Cnc Blog
            </div>
            <div className='cnc-navigation'>
                {menuList.map((item, index) => (
                   <div key={index} className={`cnc-page ${activeLink === item.path? 'active-navigation' : ''}`}><Link href={{pathname:item.path}} onClick={() => handleLinkClick(item.path)}>{item.name}</Link></div>
                ))}
                <div><button onClick={toggle}>Toggle</button></div>
            </div>
        </div>
    )
}