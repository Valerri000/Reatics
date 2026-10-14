'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/auth/TextField'
import { createAccount, type AccountRole } from '@/lib/account'
import { MIN_PASSWORD_LENGTH } from '@/lib/session'

type DetailsViewProps = {
  role: AccountRole
  onSignIn: () => void
  onCreated: () => void
}

type FormState = {
  firstName: string
  lastName: string
  company: string
  jobTitle: string
  mobilePhone: string
  officePhone: string
  phone: string
  email: string
  dreNumber: string
  password: string
  confirm: string
}

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

const emptyCopy: Record<keyof FormState, string> = {
  firstName: 'Enter your first name.',
  lastName: 'Enter your last name.',
  company: 'Enter your company.',
  jobTitle: 'Enter your title.',
  mobilePhone: 'Enter your mobile phone.',
  officePhone: 'Enter your office phone.',
  phone: 'Enter your phone.',
  email: 'Enter your email address.',
  dreNumber: 'Enter your DRE number.',
  password: 'Enter your password.',
  confirm: 'Enter your password.',
}

function fieldsFor(role: AccountRole): (keyof FormState)[] {
  if (role === 'space-seeker') return ['firstName', 'lastName', 'email', 'password', 'confirm']
  if (role === 'coworking')
    return ['firstName', 'lastName', 'company', 'phone', 'email', 'password', 'confirm']
  return [
    'firstName',
    'lastName',
    'company',
    'jobTitle',
    'mobilePhone',
    'officePhone',
    'email',
    'dreNumber',
    'password',
    'confirm',
  ]
}

const labels: Record<keyof FormState, string> = {
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

export function DetailsView({ role, onSignIn, onCreated }: DetailsViewProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'referral', string>>>({})
  const [referral, setReferral] = useState(false)
  const names = fieldsFor(role)

  function setValue(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next: Partial<Record<keyof FormState | 'referral', string>> = {}
    for (const name of names) {
      if (!form[name].trim()) next[name] = emptyCopy[name]
    }
    if (form.password && form.password.length < MIN_PASSWORD_LENGTH) {
      next.password = 'Use at least 8 characters.'
    }
    if (form.confirm && form.password !== form.confirm) {
      next.confirm = 'Passwords do not match.'
    }
    if (role === 'coworking' && !referral) {
      next.referral = 'The referral agreement is required.'
    }
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
      <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
        Create an account
      </h2>
      <div className="mt-6 space-y-4">
        {names.map((name) => (
          <TextField
            key={name}
            label={labels[name]}
            name={name}
            type={
              name === 'password' || name === 'confirm'
                ? 'password'
                : name === 'email'
                  ? 'email'
                  : 'text'
            }
            value={form[name]}
            placeholder={name === 'email' ? 'Email address' : labels[name]}
            error={errors[name]}
            onChange={(value) => setValue(name, value)}
          />
        ))}
        {role === 'coworking' ? (
          <label className="block text-base text-ink">
            <input
              className="mr-2"
              type="checkbox"
              checked={referral}
              onChange={(event) => setReferral(event.target.checked)}
            />
            I agree that Reatics receives 10% of a signed referral. My contact details are not shown
            on listings. Inquiries go to 1-888-518-9168.
            {errors.referral ? (
              <span className="mt-2 block text-sm text-brand">{errors.referral}</span>
            ) : null}
          </label>
        ) : null}
      </div>
      <Button className="mt-6 w-full" type="submit">
        Create account
      </Button>
      {errors.email === 'An account with this email already exists.' ? (
        <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
          Sign in
        </button>
      ) : (
        <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
          Already have an account? Sign in
        </button>
      )}
    </form>
  )
}
