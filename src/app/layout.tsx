'use client';
import { Lora } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import '@/styles/globals.scss'
import '@/styles/_variable.scss'

import Footer from "@/app/templates/Footer"
import Header from "@/app/templates/Header"
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
