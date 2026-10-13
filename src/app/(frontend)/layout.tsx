import { Nunito_Sans } from 'next/font/google'
import React from 'react'

import { PhoneNumber } from '@/components/PhoneNumber'
import { Wordmark } from '@/components/Wordmark'

import './styles.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'Commercial real estate listings, brokers, and coworking.',
  title: 'Reatics',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={nunitoSans.variable} lang="en">
      <body className={`${nunitoSans.className} font-sans`}>
        <header className="flex items-center justify-between px-4 py-6 md:px-16">
          <Wordmark />
          <PhoneNumber />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
