'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { TextField } from '@/components/auth/TextField'
import { CloseIcon, HeartIcon } from '@/components/icons'
import { PhoneNumber } from '@/components/PhoneNumber'
import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'

const labels: Record<ListingKind, string> = {
  sale: 'For sale',
  lease: 'For lease',
  coworking: 'Coworking',
}

type ListingCardProps = {
  href: string
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  price: number | null
  street: string
  cityLine: string
  propertyType: string
  saved?: boolean
  signedIn?: boolean
  onFavorite?: () => void
  onSignIn?: () => void
}

export function ListingCard({
  href,
  imageUrl,
  imageAlt,
  kind,
  price,
  street,
  cityLine,
  propertyType,
  saved = false,
  signedIn = false,
  onFavorite,
  onSignIn,
}: ListingCardProps) {
  function saveListing() {
    if (!signedIn) {
      onSignIn?.()
      return
    }
    onFavorite?.()
  }

  return (
    <article className="relative border border-line bg-white">
      <Link href={href}>
        <span className="relative block">
          <img src={imageUrl} alt={imageAlt} className="aspect-[3/2] w-full object-cover" />
          <span className="absolute left-3 top-3 bg-brand px-3 py-2 text-sm font-bold text-white">
            {labels[kind]}
          </span>
        </span>
        <span className="block p-4">
          <span className="block text-[22px] font-extrabold leading-8 text-ink md:text-[25px]">
            {formatListingPrice(kind, price)}
          </span>
          <span className="mt-2 block text-base text-slate">{street}</span>
          <span className="block text-base text-slate">{cityLine}</span>
          <span className="mt-2 block text-base text-gray">{propertyType}</span>
        </span>
      </Link>
      <div className="flex items-center justify-between border-t border-line p-4">
        <button
          type="button"
          aria-label={saved ? 'Saved' : 'Save listing'}
          className="flex h-10 w-10 items-center justify-center text-brand"
          onClick={saveListing}
        >
          <HeartIcon filled={saved} />
        </button>
        {kind === 'coworking' ? <PhoneNumber size="md" /> : <ContactPanel />}
      </div>
    </article>
  )
}

function ContactPanel() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const next: { name?: string; email?: string; message?: string } = {}
    if (!name.trim()) next.name = 'Enter your name.'
    if (!email.trim()) next.email = 'Enter your email address.'
    if (!message.trim()) next.message = 'Enter your message.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setName('')
    setEmail('')
    setMessage('')
    setSent(true)
  }

  return (
    <div>
      <button
        type="button"
        className="text-base font-bold text-accent"
        onClick={() => setOpen((value) => !value)}
      >
        Contact
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 bg-white p-4 md:absolute md:inset-auto md:right-0 md:top-full md:z-30 md:w-80 md:border md:border-line">
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 text-ink md:hidden"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
          {sent ? (
            <div>
              <p className="pr-10 text-[20px] font-bold text-ink">Your message has been sent.</p>
              <Button
                className="mt-6 w-full"
                type="button"
                onClick={() => {
                  setOpen(false)
                  setSent(false)
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="pr-10 text-[20px] font-bold text-ink">Contact the broker</p>
              <div className="mt-4 space-y-4">
                <TextField
                  label="Name"
                  name="name"
                  value={name}
                  placeholder="Your name"
                  error={errors.name}
                  onChange={setName}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Your email address"
                  error={errors.email}
                  onChange={setEmail}
                />
                <label className="block">
                  <span className="mb-2 block text-base font-semibold leading-6 text-ink">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={message}
                    placeholder="Your message"
                    onChange={(event) => setMessage(event.target.value)}
                    className={`h-28 w-full bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-placeholder ${
                      errors.message ? 'border-2 border-brand' : 'border border-hairline'
                    }`}
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-brand">{errors.message}</p>
                  ) : null}
                </label>
              </div>
              <Button className="mt-6 w-full" type="submit">
                Send
              </Button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  )
}
