'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import '@/styles/components/header.scss';

import ToggleMode from '@/components/toggle-mode';
import { Button } from '@/components/ui/button';

import { logout } from '@/store/auth.store';

import { logoutRequest } from '@/requests/auth/logoutRequest';

import { IPathType } from '@/types/layout';
import { IUserState } from '@/types/store';

export default function Header() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mode, setMode] = useState(resolvedTheme || 'light');
  const userId = useSelector((state: IUserState) => state.user.userId);
  const [cookies, setCookie, removeCookie] = useCookies(['userId', 'userRole']);
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(pathName);

  const menuList = [
    { name: 'About', path: '/about' },
    { name: 'Newsletter', path: '/new-post' },
  ];

  const menuMobileList = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Newsletter', path: '/new-post' },
  ];

  const onToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const onLogin = () => {
    router.push('/login');
  };

  const onLogout = async () => {
    try {
      await logoutRequest();
      removeCookie('userId', { path: '/' });
      removeCookie('userRole', { path: '/' });
      dispatch(logout());
      router.push('/login');
    } catch (error: any) {
      const data = error?.response?.data;
      const messages = data?.message;
    }
  };

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    setActiveLink(pathName);
    setShowMenu(false);
  }, [pathName]);

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  return (
    <div className="header-cnc">
      <div className="cnc-logo-area" onClick={() => router.push('/')}>
        Cnc Blog
      </div>
      <div className="cnc-navigation">
        {menuList.map((item: IPathType, index: number) => (
          <div
            key={index}
            className={`cnc-item ${activeLink === item.path ? 'active-navigation' : ''}`}
            onClick={() => router.push(item.path)}
          >
            <div className="cnc-navigator">{item.name}</div>
          </div>
        ))}
        {userId ? (
          <Button variant="outline" onClick={onLogout}>
            Log out
          </Button>
        ) : (
          <Button variant="outline" onClick={onLogin}>
            Log In
          </Button>
        )}
        <ToggleMode value={mode} onChange={onToggle} />
      </div>
      {/* menu nav */}
      <img
        className="menu-nav"
        src="/images/icon/menu-nav.svg"
        alt=""
        onClick={handleOpenMenu}
      />
      {showMenu && (
        <div className="cnc-navigation-mobile">
          <div className="cnc-logo-area-mobile">Cnc Blog</div>
          {menuMobileList.map((item: IPathType, index: number) => (
            <div
              key={index}
              className={`cnc-item-mobile ${activeLink === item.path ? 'active-navigation' : ''}`}
              onClick={() => router.push(item.path)}
            >
              <div className="cnc-navigator-mobile">{item.name}</div>
            </div>
          ))}
          {userId ? (
            <Button variant="outline" onClick={onLogout}>
              Log out
            </Button>
          ) : (
            <Button variant="outline" onClick={onLogin}>
              Log In
            </Button>
          )}
          <ToggleMode value={mode} onChange={onToggle} />
          <img
            className="close-nav"
            src="/images/icon/close.svg"
            alt=""
            onClick={handleCloseMenu}
          />
        </div>
      )}
      {/* menu nav */}
    </div>
  );
}
