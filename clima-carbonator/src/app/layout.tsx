import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LayoutWrap from './layoutWrap'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Clima Carbonator',
  description: 'Predicts Carbon Emission',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

          <LayoutWrap children={children}></LayoutWrap>
      </body>
    </html>
  )
}
