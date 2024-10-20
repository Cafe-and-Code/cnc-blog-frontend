'use client';
import { Lora } from 'next/font/google'
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@/styles/globals.scss'
import '@/styles/_variable.scss'

import { ThemeProvider } from "@/components/theme-provider"

import { persistor,store } from '@/store/auth';

import Footer from "@/app/templates/Footer"
import Header from "@/app/templates/Header"
const inter = Lora({ subsets: ['latin'] })
 
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = usePathname()
  const listIsHeader = ['/', '/blog', '/new-post']
  const checkLayout = () => {
    return listIsHeader.includes(router)
  }
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
              {checkLayout() && <Header />}
              {children}
              {checkLayout() && <Footer />}
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
