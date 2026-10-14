'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/auth/TextField'
import { signIn } from '@/lib/account'
import { LOCK_DURATION_MS } from '@/lib/session'

const lockKey = 'reatics.lockedUntil'

type SignInViewProps = {
  onCreateAccount: () => void
  onForgot: () => void
  onSuccess: () => void
}

export function SignInView({ onCreateAccount, onForgot, onSuccess }: SignInViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [lockedUntil, setLockedUntil] = useState(0)

  useEffect(() => {
    const stored = Number(sessionStorage.getItem(lockKey) || 0)
    if (stored > Date.now()) setLockedUntil(stored)
  }, [])

  useEffect(() => {
    if (!lockedUntil) return
    const timer = window.setInterval(() => {
      if (Date.now() >= lockedUntil) {
        setLockedUntil(0)
        sessionStorage.removeItem(lockKey)
        setFormError('')
      }
    }, 1000)
    return () => window.clearInterval(timer)
  }, [lockedUntil])

  const locked = lockedUntil > Date.now()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (locked) return
    const nextEmailError = email.trim() ? '' : 'Enter your email address.'
    const nextPasswordError = password ? '' : 'Enter your password.'
    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)
    setFormError('')
    if (nextEmailError || nextPasswordError) return

    const result = await signIn(email.trim(), password)
    if (result.ok) {
      onSuccess()
      return
    }
    if (result.locked) {
      const until = Date.now() + LOCK_DURATION_MS
      sessionStorage.setItem(lockKey, String(until))
      setLockedUntil(until)
      setFormError('This account is locked. Try again in 15 minutes.')
      return
    }
    setFormError('Email or password is incorrect.')
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
        Sign in
      </h2>
      {formError ? <p className="mt-4 text-base text-brand">{formError}</p> : null}
      <div className="mt-6 space-y-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          placeholder="Email address"
          autoComplete="email"
          error={emailError}
          invalid={Boolean(formError)}
          onChange={setEmail}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          autoComplete="current-password"
          error={passwordError}
          invalid={Boolean(formError)}
          onChange={setPassword}
        />
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={locked}>
        Sign in
      </Button>
      <button className="mt-4 block text-base text-brand" type="button" onClick={onCreateAccount}>
        Create an account
      </button>
      <button className="mt-2 block text-base text-brand" type="button" onClick={onForgot}>
        Forgot password
      </button>
    </form>
  )
}
