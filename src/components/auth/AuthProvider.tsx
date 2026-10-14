'use client'

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { signOut, type AccountUser } from '@/lib/account'

export type AuthView = 'sign-in' | 'register' | 'reset' | 'success'

type AuthContextValue = {
  user: AccountUser | null
  view: AuthView | null
  token: string
  openSignIn: () => void
  openRegister: () => void
  openReset: () => void
  close: () => void
  setView: (view: AuthView) => void
  finishSignIn: () => void
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({
  user,
  initialToken = '',
  children,
}: {
  user: AccountUser | null
  initialToken?: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const [view, setView] = useState<AuthView | null>(initialToken ? 'reset' : null)
  const [token] = useState(initialToken)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      view,
      token,
      openSignIn: () => setView('sign-in'),
      openRegister: () => setView('register'),
      openReset: () => setView('reset'),
      close: () => setView(null),
      setView,
      finishSignIn: () => {
        setView(null)
        router.refresh()
      },
      signOutUser: async () => {
        await signOut()
        setView(null)
        router.refresh()
      },
    }),
    [router, token, user, view],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('AuthProvider missing')
  }
  return value
}
