'use client';
import { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import '@/styles/globals.scss'
import '@/styles/_variable.scss'

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/auth';

import { usePathname } from 'next/navigation';
const inter = Lora({ subsets: ['latin'] })
 
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = usePathname()
  const listNotHeader = ['/login']
  const checkLayout = () => {
    return listNotHeader.includes(router)
  }
  console.log(checkLayout())
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>cnc-blog</title>
        <meta name="cnc-blog" content="cnc-blog" />
      </head>
      <body style={{ overflow: 'hidden' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {!checkLayout() && <Header />}
              {children}
              <Footer />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
