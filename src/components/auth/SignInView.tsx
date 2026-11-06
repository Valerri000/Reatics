'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { useAuth } from '@/components/auth/AuthProvider'
import { TextField } from '@/components/auth/TextField'
import { signIn } from '@/lib/account'
import { LOCK_DURATION_MS } from '@/lib/session'

const lockKey = 'reatics.lockedUntil'

type SignInViewProps = {
  onCreateAccount: () => void
  onForgot: () => void
  onSuccess: () => void
}

function remainingClock(until: number, now: number) {
  const seconds = Math.max(0, Math.ceil((until - now) / 1000))
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

export function SignInView({ onCreateAccount, onForgot, onSuccess }: SignInViewProps) {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [lockedUntil, setLockedUntil] = useState(0)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const stored = Number(sessionStorage.getItem(lockKey) || 0)
    if (stored > Date.now()) setLockedUntil(stored)
  }, [])

  useEffect(() => {
    if (!lockedUntil) return
    const timer = window.setInterval(() => {
      const current = Date.now()
      setNow(current)
      if (current >= lockedUntil) {
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
      setNow(Date.now())
      setFormError('This account is locked. Try again in 15 minutes.')
      return
    }
    setFormError('Email or password is incorrect.')
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tighter text-ink">Welcome back.</h2>
        <p className="mt-4 text-sm font-bold text-slate">Enter your professional credentials to continue.</p>
      </div>
      {locked ? (
        <div className="space-y-8 text-center">
          <div>
            <h3 className="text-3xl font-black tracking-tighter text-ink">Access suspended.</h3>
            <p className="mt-4 font-medium leading-relaxed text-slate">
              Too many failed attempts. This account is locked. Try again in 15 minutes.
            </p>
          </div>
          <div className="rounded-3xl border border-mist bg-sand p-6">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate">Try again in</p>
            <p className="text-3xl font-black text-ink">{remainingClock(lockedUntil, now)}</p>
          </div>
          <Button href="/contact" className="w-full" onClick={auth.close}>
            Contact
          </Button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={onSubmit}>
          {formError ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
              <p className="text-xs font-bold uppercase tracking-widest">{formError}</p>
            </div>
          ) : null}
          <TextField
            label="Work email"
            name="email"
            type="email"
            value={email}
            placeholder="name@company.com"
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
            placeholder="Min. 8 characters"
            autoComplete="current-password"
            error={passwordError}
            invalid={Boolean(formError)}
            aside={
              <button className="text-[10px] font-black uppercase tracking-widest text-brand" type="button" onClick={onForgot}>
                Forgot?
              </button>
            }
            onChange={setPassword}
          />
          <Button className="w-full" type="submit">
            Sign in
          </Button>
          <p className="pt-2 text-center text-sm font-bold text-slate">
            Don&apos;t have an account?{' '}
            <button className="text-brand" type="button" onClick={onCreateAccount}>
              Create an account
            </button>
          </p>
        </form>
      )}
    </div>
  )
}
