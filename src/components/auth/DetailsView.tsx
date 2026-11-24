'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/auth/TextField'
import { createAccount, type AccountRole } from '@/lib/account'
import { referralScopeSentence, referralWaitingLabel } from '@/lib/referralRule'
import { signupFieldNames, signupFormErrors, type SignupField } from '@/lib/signupFields'
import { signupLayout } from '@/lib/signupLayout'

type DetailsViewProps = {
  role: AccountRole
  onBack: () => void
  onSignIn: () => void
  onCreated: () => void
}

type FormState = Record<SignupField, string>

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  mobilePhone: '',
  officePhone: '',
  phone: '',
  email: '',
  dreNumber: '',
  password: '',
  confirm: '',
}

const labels: Record<SignupField, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  company: 'Company',
  jobTitle: 'Title',
  mobilePhone: 'Mobile phone',
  officePhone: 'Office phone',
  phone: 'Phone',
  email: 'Email',
  dreNumber: 'DRE number',
  password: 'Password',
  confirm: 'Confirm password',
}

export function DetailsView({ role, onBack, onSignIn, onCreated }: DetailsViewProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<SignupField | 'referral', string>>>({})
  const [referral, setReferral] = useState(false)
  const names = signupFieldNames(role)

  function setValue(name: SignupField, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next = signupFormErrors(role, form, referral)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = await createAccount({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      role,
      company: form.company.trim() || undefined,
      jobTitle: form.jobTitle.trim() || undefined,
      mobilePhone: form.mobilePhone.trim() || undefined,
      officePhone: form.officePhone.trim() || undefined,
      phone: form.phone.trim() || undefined,
      dreNumber: form.dreNumber.trim() || undefined,
      listsProperties: role === 'owner' || role === 'broker-owner',
      referralAccepted: role === 'coworking' ? true : undefined,
    })

    if (!result.ok) {
      if (result.fields.email) {
        setErrors({ email: 'An account with this email already exists.' })
        return
      }
      if (result.fields.dreNumber) {
        setErrors({ dreNumber: 'Enter your DRE number.' })
        return
      }
      if (result.fields.referralAccepted) {
        setErrors({ referral: 'The referral agreement is required.' })
        return
      }
      if (/8 characters/i.test(result.message)) {
        setErrors({ password: 'Use at least 8 characters.' })
        return
      }
      setErrors({ email: 'An account with this email already exists.' })
      return
    }
    onCreated()
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black leading-none tracking-tighter text-ink">Almost there.</h2>
        <p className="mt-4 text-lg font-bold text-slate">We need a few details to set up your account.</p>
      </div>
      <div className={`${signupLayout.phone} ${signupLayout.desktop}`}>
        {names.map((name) => (
          <div key={name} className={name === 'dreNumber' ? 'md:col-span-2' : undefined}>
            <TextField
              label={labels[name]}
              name={name}
              type={
                name === 'password' || name === 'confirm'
                  ? 'password'
                  : name === 'email'
                    ? 'email'
                    : name === 'mobilePhone' || name === 'officePhone' || name === 'phone'
                      ? 'tel'
                      : 'text'
              }
              value={form[name]}
              placeholder={
                name === 'email'
                  ? 'name@company.com'
                  : name === 'password' || name === 'confirm'
                    ? 'Min. 8 characters'
                    : name === 'dreNumber'
                      ? 'DRE number'
                      : labels[name]
              }
              autoComplete={
                name === 'email' ? 'email' : name === 'password' || name === 'confirm' ? 'new-password' : undefined
              }
              error={errors[name]}
              onChange={(value) => setValue(name, value)}
            />
          </div>
        ))}
        {role === 'coworking' ? (
          <label className="block text-base text-ink md:col-span-2">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate">
              {referralWaitingLabel}
            </span>
            <input
              className="mr-2"
              type="checkbox"
              checked={referral}
              onChange={(event) => setReferral(event.target.checked)}
            />
            {referralScopeSentence}
            {errors.referral ? <span className="mt-2 block text-sm text-brand">{errors.referral}</span> : null}
          </label>
        ) : null}
      </div>
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <Button className="w-full md:w-1/3" variant="secondary" type="button" onClick={onBack}>
          Go back
        </Button>
        <Button className="w-full md:w-2/3" type="submit">
          Create account
        </Button>
      </div>
      <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
        {errors.email === 'An account with this email already exists.'
          ? 'Sign in'
          : 'Already have an account? Sign in'}
      </button>
    </form>
  )
}
