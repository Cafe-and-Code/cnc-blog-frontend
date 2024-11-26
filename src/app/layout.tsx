'use client';
import { Lora } from 'next/font/google'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@/styles/globals.scss'
import '@/styles/_variable.scss'

import { ThemeProvider } from "@/components/theme-provider"

import { persistor, store } from '@/store/auth';

import Footer from "@/app/templates/Footer"
import Header from "@/app/templates/Header"
const inter = Lora({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode,
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const router = usePathname()
  const listNoHeader = ['/new-post', '/login', '/create-account', '/forgot-password']
  const checkLayout = () => {
    return !listNoHeader.includes(router)
  }

  const [width, setWidth] = useState(0);
  const layoutClass = () => {
    if (width < 800) {
      return 'layout-mobile'
    } else if (width < 1180 && width > 799) {
      return 'layout-tablet'
    } else {
      return 'layout-desktop'
    }
  }
  const handleResize = () => {
    // Perform actions on window resize
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize()
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
              <div className={`${layoutClass()}`}>
                {checkLayout() && <Header />}
                {children}
                {checkLayout() && <Footer />}
              </div>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
