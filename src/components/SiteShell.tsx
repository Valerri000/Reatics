'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

import { AuthModal } from '@/components/auth/AuthModal'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { SessionGuard } from '@/components/auth/SessionGuard'
import { Header } from '@/components/header/Header'
import { SiteFooter } from '@/components/home/SiteFooter'
import type { AccountUser } from '@/lib/account'

export function SiteShell({
  user,
  children,
}: {
  user: AccountUser | null
  children: React.ReactNode
}) {
  const params = useSearchParams()
  const token = params.get('token') || ''

  return (
    <AuthProvider user={user} initialToken={token}>
      <SessionGuard user={user} />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <AuthModal />
    </AuthProvider>
  )
}
