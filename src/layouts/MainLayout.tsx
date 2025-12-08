'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { LIST_NO_HEADER } from '@/constants/layout';
import Footer from '@/templates/Footer';
import Header from '@/templates/Header';

export default function MainLayout({ ...props }) {
  const router = usePathname();
  const pathName = router.split('/')[2] ? `/${router.split('/')[2]}` : '/';
  const showLayout = useMemo(
    () => !LIST_NO_HEADER.includes(pathName),
    [pathName],
  );

  const [width, setWidth] = useState(0);
  const layoutClass = () => {
    if (width < 800) {
      return 'layout-mobile';
    } else if (width < 1180 && width > 799) {
      return 'layout-tablet';
    } else {
      return 'layout-desktop';
    }
  };
  const handleResize = () => {
    // Perform actions on window resize
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`${layoutClass()} flex min-h-screen flex-col`}>
      {showLayout && <Header />}
      <div className="flex flex-1 flex-col" {...props} />
      <Footer />
    </div>
  );
}
