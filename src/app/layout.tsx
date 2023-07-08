import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flexible',
  description: 'Showcase and discover remarkable developer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='px-5 lg:px-10 py-5 border-b-2 border-slate-100 '><Navbar></Navbar></div>
        <div>{children}</div>
        <div className='px-5 lg:px-10 py-5 bg-zinc-100'><Footer></Footer></div>
      </body>
    </html>
  )
}
