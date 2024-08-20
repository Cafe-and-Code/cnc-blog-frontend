import { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import '@/styles/globals.scss'

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
    <html lang="en">
      <body>
        <ThemeProvider
              attribute="class"
              defaultTheme="light"
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
