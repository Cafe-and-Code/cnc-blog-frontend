'use client';
import { Lora } from 'next/font/google';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@/styles/globals.scss';
import '@/styles/_variable.scss';

import { persistor, store } from '@/store/auth.store';

import { I18nProviders } from '@/providers/i18n-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import Footer from '@/templates/Footer';
import Header from '@/templates/Header';

import { IRootLayoutProps } from '@/types/layout';
const inter = Lora({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  const router = usePathname();
  const listNoHeader = [
    '/new-post',
    '/login',
    '/create-account',
    '/forgot-password',
  ];
  const checkLayout = () => {
    return !listNoHeader.includes(router);
  };

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>cnc-blog</title>
        <meta name="cnc-blog" content="cnc-blog" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <I18nProviders>
                <div className={`${layoutClass()} flex min-h-screen flex-col`}>
                  {checkLayout() && <Header />}
                  <div className="flex flex-1 flex-col">{children}</div>
                  {checkLayout() && <Footer />}
                </div>
              </I18nProviders>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
