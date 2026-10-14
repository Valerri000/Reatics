'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/auth/TextField'
import { requestPasswordReset, saveNewPassword } from '@/lib/account'
import { MIN_PASSWORD_LENGTH } from '@/lib/session'

type ResetViewProps = {
  initialToken: string
  onSignIn: () => void
}

export function ResetView({ initialToken, onSignIn }: ResetViewProps) {
  const [step, setStep] = useState<'request' | 'sent' | 'choose' | 'done'>(
    initialToken ? 'choose' : 'request',
  )
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [token, setToken] = useState(initialToken)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [tokenError, setTokenError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')

  async function sendLink(event?: React.FormEvent) {
    event?.preventDefault()
    if (!email.trim()) {
      setEmailError('Enter your email address.')
      return
    }
    setEmailError('')
    await requestPasswordReset(email.trim())
    setStep('sent')
  }

  async function savePassword(event: React.FormEvent) {
    event.preventDefault()
    const nextTokenError = token.trim() ? '' : 'Enter the code.'
    let nextPasswordError = password ? '' : 'Enter your password.'
    if (password && password.length < MIN_PASSWORD_LENGTH)
      nextPasswordError = 'Use at least 8 characters.'
    const nextConfirmError = !confirm
      ? 'Enter your password.'
      : password !== confirm
        ? 'Passwords do not match.'
        : ''
    setTokenError(nextTokenError)
    setPasswordError(nextPasswordError)
    setConfirmError(nextConfirmError)
    if (nextTokenError || nextPasswordError || nextConfirmError) return

    const result = await saveNewPassword(token.trim(), password)
    if (!result.ok) {
      setTokenError(result.message)
      return
    }
    setStep('done')
  }

  if (step === 'done') {
    return (
      <div>
        <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
          Your password has been reset.
        </h2>
        <Button className="mt-6 w-full" type="button" onClick={onSignIn}>
          Sign in
        </Button>
      </div>
    )
  }

  if (step === 'sent') {
    return (
      <div>
        <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
          Reset password
        </h2>
        <p className="mt-4 text-base text-ink">
          If you have an account with us, an email with a link to reset the password has been sent
          to your email.
        </p>
        <button
          className="mt-4 block text-base text-brand"
          type="button"
          onClick={() => void sendLink()}
        >
          Resend link
        </button>
        <button className="mt-2 block text-base text-brand" type="button" onClick={onSignIn}>
          Back to sign in
        </button>
      </div>
    )
  }

  if (step === 'choose') {
    return (
      <form onSubmit={savePassword}>
        <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
          Reset password
        </h2>
        <div className="mt-6 space-y-4">
          <TextField
            label="Verification code"
            name="token"
            value={token}
            placeholder="Code from the email"
            error={tokenError}
            onChange={setToken}
          />
          <TextField
            label="New password"
            name="password"
            type="password"
            value={password}
            placeholder="New password"
            autoComplete="new-password"
            error={passwordError}
            onChange={setPassword}
          />
          <TextField
            label="Confirm password"
            name="confirm"
            type="password"
            value={confirm}
            placeholder="Re-enter the password"
            autoComplete="new-password"
            error={confirmError}
            onChange={setConfirm}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Save password
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={sendLink}>
      <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
        Reset password
      </h2>
      <div className="mt-6">
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          placeholder="Email address"
          error={emailError}
          onChange={setEmail}
        />
      </div>
      <Button className="mt-6 w-full" type="submit">
        Send link
      </Button>
      <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
        Back to sign in
      </button>
    </form>
  )
}
