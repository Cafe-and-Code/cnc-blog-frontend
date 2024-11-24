'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from "next-themes"
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import '@/styles/components/header-new-post.scss'

import ToggleMode from '@/components/toggle-mode';
import { Button } from '@/components/ui/button';

import { logout } from '@/store/auth';

interface HeaderOtherType {
  disabledPublish?: boolean,
  onPost?: () => void
}

interface PathType {
  name: string,
  path: string
}

export default function HeaderNewPost({ onPost, disabledPublish }: HeaderOtherType) {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter()
  const userId = useSelector((state: any) => state.user.userId);
  const { setTheme, resolvedTheme } = useTheme();
  const [mode, setMode] = useState(resolvedTheme || 'light');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [showMenu, setShowMenu] = useState(false)
  const [activeLink, setActiveLink] = useState(pathName);

  const menuMobileList = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Newsletter', path: '/new-post' },
  ]

  const onToggle = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const onLogoutLogIn = () => {
    removeCookie('token', { path: '/' })
    dispatch(logout());
    window.location.href = '/login';
  }

  const handleOpenMenu = () => {
    setShowMenu(true)
  }

  const handleCloseMenu = () => {
    setShowMenu(false)
  }

  const handleChangePath = async (path: any) => {
    router.push(path)
  }

  useEffect(() => {
    setActiveLink(pathName);
    setShowMenu(false);
  }, [pathName])

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);
  return (
    <div className='header-new-post-cnc'>
      <div className='cnc-logo-area' onClick={() => handleChangePath('/')}>
        Cnc Blog
      </div>
      <div className='cnc-navigation'>
        <Button variant={disabledPublish ? 'disabled' : 'default'} onClick={onPost}>Publish</Button>
        <Button variant='outline' onClick={onLogoutLogIn}>{userId ? 'Log out' : 'Log In'}</Button>
        <ToggleMode value={mode} onChange={onToggle} />
      </div>
      {/* menu nav */}
      <div className='menu-nav'>
        <Button className='publish-mobile' variant={disabledPublish ? 'disabled' : 'default'} onClick={onPost}>Publish</Button>
        <img className='icon-menu' src="/images/icon/menu-nav.svg" alt="" onClick={handleOpenMenu} />
      </div>
      {showMenu && <div className='cnc-navigation-mobile'>
        <div className='cnc-logo-area-mobile'>
          Cnc Blog
        </div>
        {menuMobileList.map((item: PathType, index: number) => (
          <div key={index} className={`cnc-item-mobile ${activeLink === item.path ? 'active-navigation' : ''}`} onClick={() => handleChangePath(item.path)}><div className='cnc-navigator-mobile'>{item.name}</div></div>
        ))}
        <Button variant='outline' onClick={onLogoutLogIn}>{userId ? 'Log out' : 'Log In'}</Button>
        <ToggleMode value={mode} onChange={onToggle} />
        <img className="close-nav" src="/images/icon/close.svg" alt="" onClick={handleCloseMenu} />
      </div>}
      {/* menu nav */}
    </div>
  )
}