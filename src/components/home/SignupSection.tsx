'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'
import { PhoneIcon } from '@/components/icons'
import { PhoneNumber } from '@/components/PhoneNumber'

const inputClass =
  'h-12 w-full rounded-lg border border-line bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder'

function Field({
  label,
  name,
  value,
  placeholder,
  error,
  type = 'text',
  onChange,
}: {
  label: string
  name: string
  value: string
  placeholder: string
  error?: string
  type?: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${error ? 'border-2 border-brand' : ''}`}
      />
      {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
    </label>
  )
}

export function SignupSection() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function setField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  function saveEmail(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim()) {
      setError('Enter your email address.')
      setSaved(false)
      return
    }
    setError('')
    setEmail('')
    setSaved(true)
  }

  function sendMessage(event: React.FormEvent) {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Enter your last name.'
    if (!form.email.trim()) next.email = 'Enter your email address.'
    if (!form.message.trim()) next.message = 'Enter your message.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      location: '',
      message: '',
    })
    setSent(true)
  }

  return (
    <HomeSection id="signup" tone="mist">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
        <div>
          <h2 className="m-0 text-3xl font-bold text-ink">Connect with us</h2>
          <p className="m-0 mt-4 max-w-xl text-base leading-7 text-slate">
            Have questions about listings? Leave your email for news and updates, or send the office
            a message.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-sm">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="m-0 text-xs font-bold uppercase text-gray">Call Main Office</p>
              <PhoneNumber />
            </div>
          </div>
          {saved ? (
            <p className="m-0 mt-8 text-base font-bold text-ink">Your email has been saved.</p>
          ) : (
            <form onSubmit={saveEmail} className="mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-start">
              <label className="block flex-1">
                <span className="sr-only">Email</span>
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Your preferred e-mail"
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${inputClass} ${error ? 'border-2 border-brand' : ''}`}
                />
                {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
              </label>
              <Button type="submit">Keep in touch</Button>
            </form>
          )}
        </div>
        <div className="rounded-2xl border border-line bg-white p-8 shadow-lg">
          <h3 className="m-0 text-xl font-bold text-ink">Send us a message.</h3>
          {sent ? (
            <p className="m-0 mt-6 text-base font-bold text-ink">Your message has been sent.</p>
          ) : (
            <form onSubmit={sendMessage} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  placeholder="Enter first name"
                  error={errors.firstName}
                  onChange={(value) => setField('firstName', value)}
                />
                <Field
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  placeholder="Enter your last name"
                  error={errors.lastName}
                  onChange={(value) => setField('lastName', value)}
                />
              </div>
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter your e-mail here"
                error={errors.email}
                onChange={(value) => setField('email', value)}
              />
              <Field
                label="Phone number"
                name="phone"
                value={form.phone}
                placeholder="Enter your phone here"
                onChange={(value) => setField('phone', value)}
              />
              <Field
                label="Your company"
                name="company"
                value={form.company}
                placeholder="Enter company name"
                onChange={(value) => setField('company', value)}
              />
              <Field
                label="Location of interest"
                name="location"
                value={form.location}
                placeholder="Where are you interested in?"
                onChange={(value) => setField('location', value)}
              />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  placeholder="Leave us any questions or requests"
                  onChange={(event) => setField('message', event.target.value)}
                  className={`h-28 w-full rounded-lg bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-placeholder ${
                    errors.message ? 'border-2 border-brand' : 'border border-line'
                  }`}
                />
                {errors.message ? <p className="m-0 mt-2 text-sm text-brand">{errors.message}</p> : null}
              </label>
              <Button type="submit">Send</Button>
            </form>
          )}
        </div>
      </div>
    </HomeSection>
  )
}
