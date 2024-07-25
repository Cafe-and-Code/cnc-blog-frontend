'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react';

import '@/styles/components/header.scss'

export default function Header() {
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
            </div>
        </div>
    )
}