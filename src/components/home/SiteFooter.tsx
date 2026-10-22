'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { PhoneNumber } from '@/components/PhoneNumber'
import { Wordmark } from '@/components/Wordmark'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/featured', label: 'Featured properties' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/scholarship', label: 'Scholarship' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/steps', label: 'Steps to renting' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

const areas = [
  { href: '/coworking', label: 'Coworking spaces' },
  { href: '/commercial', label: 'Commercial real estate' },
]

const inputClass =
  'h-12 w-full border border-hairline bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder'

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
      <span className="mb-2 block text-base font-semibold text-white">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${error ? 'border-2 border-brand' : ''}`}
      />
      {error ? <p className="m-0 mt-2 text-sm text-white">{error}</p> : null}
    </label>
  )
}

export function SiteFooter() {
  const [newsletter, setNewsletter] = useState('')
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterSaved, setNewsletterSaved] = useState(false)
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

  function saveNewsletter(event: React.FormEvent) {
    event.preventDefault()
    if (!newsletter.trim()) {
      setNewsletterError('Enter your email address.')
      setNewsletterSaved(false)
      return
    }
    setNewsletter('')
    setNewsletterError('')
    setNewsletterSaved(true)
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
    <footer className="bg-brand-deep px-inset-phone py-section-phone text-white md:px-inset-tablet md:py-section xl:px-inset-desktop 2xl:px-inset-wide">
      <Wordmark tone="white" />
      <div className="mt-10 grid gap-10 xl:grid-cols-3">
        <div>
          <p className="m-0 text-base font-bold">Navigation</p>
          <ul className="m-0 mt-4 list-none p-0">
            {navigation.map((link) => (
              <li key={link.href} className="mt-2">
                <Link href={link.href} className="text-base text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="m-0 mt-6 list-none p-0">
            {areas.map((link) => (
              <li key={link.href} className="mt-2">
                <Link href={link.href} className="text-base text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="m-0 text-base font-bold">Contact Us</p>
          <p className="m-0 mt-4 text-base leading-7">
            201 N Brand Suite 200
            <br />
            Glendale CA, 91203
          </p>
          <p className="m-0 mt-4">
            <PhoneNumber tone="white" size="md" />
          </p>
          <p className="m-0 mt-2">
            <a className="text-base text-white" href="mailto:info@reatics.com">
              info@reatics.com
            </a>
          </p>
          <p className="m-0 mt-8 text-base font-bold">Join our newsletter for news!</p>
          {newsletterSaved ? (
            <p className="m-0 mt-4 text-base">Your email has been saved.</p>
          ) : (
            <form onSubmit={saveNewsletter} className="mt-4">
              <input
                name="newsletter"
                type="email"
                value={newsletter}
                placeholder="Your email"
                onChange={(event) => setNewsletter(event.target.value)}
                className={`${inputClass} ${newsletterError ? 'border-2 border-brand' : ''}`}
              />
              <p className="m-0 mt-2 text-sm text-white">e.g. John@email.com</p>
              {newsletterError ? <p className="m-0 mt-2 text-sm">{newsletterError}</p> : null}
              <Button className="mt-4" type="submit">
                Submit
              </Button>
            </form>
          )}
        </div>
        <div>
          <p className="m-0 text-base font-bold">Send us a message.</p>
          {sent ? (
            <p className="m-0 mt-6 text-base font-bold">Your message has been sent.</p>
          ) : (
            <form onSubmit={sendMessage} className="mt-4 grid gap-4">
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
                <span className="mb-2 block text-base font-semibold text-white">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  placeholder="Leave us any questions or requests"
                  onChange={(event) => setField('message', event.target.value)}
                  className={`h-28 w-full bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-placeholder ${
                    errors.message ? 'border-2 border-brand' : 'border border-hairline'
                  }`}
                />
                {errors.message ? <p className="m-0 mt-2 text-sm">{errors.message}</p> : null}
              </label>
              <Button type="submit">Send</Button>
            </form>
          )}
        </div>
      </div>
    </footer>
  )
}
