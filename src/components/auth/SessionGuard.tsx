'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { signOut, type AccountUser } from '@/lib/account'
import { markSessionStarted, sessionExpired, touchActivity } from '@/lib/session'

export function SessionGuard({ user }: { user: AccountUser | null }) {
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    if (!localStorage.getItem('reatics.sessionStarted')) markSessionStarted()

    const endSession = () => {
      void signOut().then(() => router.refresh())
    }

    if (sessionExpired()) {
      endSession()
      return
    }

    const onActivity = () => touchActivity()
    window.addEventListener('pointerdown', onActivity)
    window.addEventListener('keydown', onActivity)
    const timer = window.setInterval(() => {
      if (sessionExpired()) endSession()
    }, 15000)

    return () => {
      window.removeEventListener('pointerdown', onActivity)
      window.removeEventListener('keydown', onActivity)
      window.clearInterval(timer)
    }
  }, [router, user])

  return null
}
