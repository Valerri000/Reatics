'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { AuthModal } from '@/components/auth/AuthModal'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { SessionGuard } from '@/components/auth/SessionGuard'
import { Header } from '@/components/header/Header'
import { SiteFooter } from '@/components/home/SiteFooter'
import { CoworkingHeader } from '@/components/market/CoworkingChrome'
import type { AccountUser } from '@/lib/account'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export function SiteShell({
  user,
  children,
}: {
  user: AccountUser | null
  children: React.ReactNode
}) {
  const params = useSearchParams()
  const path = usePathname()
  const token = params.get('token') || ''
  const coworking = path === '/coworking'

  return (
    <AuthProvider user={user} initialToken={token}>
      <SessionGuard user={user} />
      <div className="flex min-h-screen flex-col">
        {coworking ? (
          <div className={jakarta.className}>
            <CoworkingHeader />
          </div>
        ) : (
          <Header />
        )}
        <main className={`flex flex-1 flex-col ${coworking ? jakarta.className : ''}`}>{children}</main>
        <SiteFooter />
      </div>
      <AuthModal />
    </AuthProvider>
  )
}
