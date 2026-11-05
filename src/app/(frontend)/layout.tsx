import { Inter } from 'next/font/google'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

import { SiteShell } from '@/components/SiteShell'
import config from '@/payload.config'
import type { AccountUser } from '@/lib/account'

import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'Commercial real estate listings, brokers, and coworking.',
  title: 'Reatics',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headers = await getHeaders()
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers })
  const account: AccountUser | null = user
    ? {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        verified: user.verified,
      }
    : null

  return (
    <html className={inter.variable} lang="en">
      <body className={`${inter.className} font-sans`}>
        <Suspense>
          <SiteShell user={account}>{children}</SiteShell>
        </Suspense>
      </body>
    </html>
  )
}
