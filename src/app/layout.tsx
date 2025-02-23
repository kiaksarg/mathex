import { Metadata } from 'next'

import './globals.css'

import { Inter } from 'next/font/google'

import Chakra from '../chakra' // Adjust the import path

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js by João Pedro Schmitz`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Chakra>{children}</Chakra> {/* Wrap children with ChakraProvider */}
      </body>
    </html>
  )
}
