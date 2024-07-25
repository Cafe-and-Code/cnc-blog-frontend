import { Metadata } from 'next'
import { Lora } from 'next/font/google'

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
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
