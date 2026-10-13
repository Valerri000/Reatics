import { Nunito_Sans } from 'next/font/google'
import React from 'react'

import './styles.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={nunitoSans.variable} lang="en">
      <body className={`${nunitoSans.className} font-sans`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
