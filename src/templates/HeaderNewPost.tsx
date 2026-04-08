'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ToggleMode from '@/components/toggle-mode';
import { Button } from '@/components/ui/button';

import { logout } from '@/store/auth.store';

import { logoutRequest } from '@/requests/auth/logoutRequest';
import { isApiError } from '@/utils/error';

import { IHeaderOtherType, IPathType } from '@/types/layout';
import { IUserState } from '@/types/store';

export default function HeaderNewPost({
  onPost,
  disabledPublish,
}: IHeaderOtherType) {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const userId = useSelector((state: IUserState) => state.user.userId);
  const { setTheme, resolvedTheme } = useTheme();
  const [mode, setMode] = useState(resolvedTheme || 'light');
  const [cookies, setCookie, removeCookie] = useCookies([
    'userId',
    'userRole',
    'isLoggedIn',
  ]);
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
    } catch (error: unknown) {
      let message;
      if (isApiError(error)) {
        message = error.message;
      }
      console.log('Logout error:', message);
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
    <div className="sticky top-0 z-10 flex items-center justify-between gap-8 bg-[var(--color-11)] p-5">
      <div className="cursor-pointer text-3xl" onClick={() => router.push('/')}>
        Cnc Blog
      </div>
      <div className="hidden flex-1 gap-5 md:flex">
        {menuList.map((item: IPathType, index: number) => (
          <div
            key={index}
            className="group cursor-pointer p-2 text-[var(--color-01)]"
            onClick={() => router.push(item.path)}
          >
            <div
              className={`relative inline-block before:absolute before:left-0 before:top-[4px] before:h-full before:w-0 before:border-b before:border-[var(--color-01)] before:transition-all before:duration-500 before:content-[''] group-hover:before:w-full ${activeLink === item.path ? 'before:!w-full' : ''} `}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden flex-1 justify-end gap-5 md:flex">
        <Button
          variant={disabledPublish ? 'disabled' : 'default'}
          onClick={onPost}
        >
          Publish
        </Button>
        {cookies.isLoggedIn ? (
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
      <div className="flex flex-1 justify-end gap-5 md:hidden">
        <Button
          variant={disabledPublish ? 'disabled' : 'default'}
          onClick={onPost}
        >
          Publish
        </Button>
        <img
          className="cursor-pointer brightness-[--brightness-03]"
          src="/images/icon/menu-nav.svg"
          alt=""
          onClick={handleOpenMenu}
        />
      </div>
      {showMenu && (
        <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-[30px] bg-[var(--color-11)] transition-all duration-100 ease-linear md:hidden">
          <div className="text-3xl text-[var(--color-12)]">Cnc Blog</div>
          {menuMobileList.map((item: IPathType, index: number) => (
            <div
              key={index}
              className="text-[color: var(--color-12)] group text-lg font-normal"
              onClick={() => router.push(item.path)}
            >
              <div
                className={`relative before:absolute before:left-0 before:top-[4px] before:h-full before:w-0 before:border-b before:border-[var(--color-01)] before:transition-all before:duration-500 before:content-[''] group-hover:before:w-full ${activeLink === item.path ? 'before:!w-full' : ''} `}
              >
                {item.name}
              </div>
            </div>
          ))}
          {cookies.isLoggedIn ? (
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
            className="brightness-[--brightness-03]"
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
