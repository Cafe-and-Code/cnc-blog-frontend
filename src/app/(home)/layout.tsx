import { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import '@/styles/globals.scss'
import '@/styles/_variable.scss'

import Footer from "@/components/Footer"
import Header from "@/components/Header"

const inter = Lora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cnc-blog',
  description: 'cnc-blog'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
