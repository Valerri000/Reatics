'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { DetailsView } from '@/components/auth/DetailsView'
import { ResetView } from '@/components/auth/ResetView'
import { RoleView } from '@/components/auth/RoleView'
import { SignInView } from '@/components/auth/SignInView'
import { CloseIcon } from '@/components/icons'
import { useAuth } from '@/components/auth/AuthProvider'
import type { AccountRole } from '@/lib/account'

export function AuthModal() {
  const auth = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<AccountRole>('space-seeker')
  const [registerStep, setRegisterStep] = useState<'role' | 'details'>('role')

  useEffect(() => {
    if (auth.view !== 'register') setRegisterStep('role')
  }, [auth.view])

  useEffect(() => {
    if (!auth.view) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') auth.close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [auth])

  useEffect(() => {
    if (!auth.view) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [auth.view])

  if (!auth.view) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-ink/45 md:items-center md:p-6"
      onClick={auth.close}
    >
      <div
        className="relative h-full w-full overflow-y-auto bg-white p-4 md:h-auto md:max-h-[90vh] md:w-[480px] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-ink"
          aria-label="Close"
          onClick={auth.close}
        >
          <CloseIcon />
        </button>
        {auth.view === 'sign-in' ? (
          <SignInView
            onCreateAccount={auth.openRegister}
            onForgot={auth.openReset}
            onSuccess={auth.finishSignIn}
          />
        ) : null}
        {auth.view === 'register' && registerStep === 'role' ? (
          <RoleView
            onSignIn={auth.openSignIn}
            onContinue={(next) => {
              setRole(next)
              setRegisterStep('details')
            }}
          />
        ) : null}
        {auth.view === 'register' && registerStep === 'details' ? (
          <DetailsView
            role={role}
            onSignIn={auth.openSignIn}
            onCreated={() => auth.setView('success')}
          />
        ) : null}
        {auth.view === 'reset' ? (
          <ResetView initialToken={auth.token} onSignIn={auth.openSignIn} />
        ) : null}
        {auth.view === 'success' ? (
          <div>
            <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
              You are now registered.
            </h2>
            <p className="mt-4 text-base text-ink">Would you like to set up your profile now?</p>
            <Button
              className="mt-6 w-full"
              type="button"
              onClick={() => {
                auth.close()
                router.push('/')
                router.refresh()
              }}
            >
              Yes
            </Button>
            <Button
              className="mt-4 w-full"
              variant="secondary"
              type="button"
              onClick={() => {
                auth.close()
                router.refresh()
              }}
            >
              Not now
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
