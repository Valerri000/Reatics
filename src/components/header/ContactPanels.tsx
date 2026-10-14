'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { MailIcon, PhoneIcon } from '@/components/icons'
import { PhoneNumber } from '@/components/PhoneNumber'
import { TextField } from '@/components/auth/TextField'

export function PhonePanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex h-[54px] w-[54px] items-center justify-center text-ink"
        aria-label="Phone"
        onClick={() => setOpen((value) => !value)}
      >
        <PhoneIcon />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 w-56 border border-line bg-white p-4">
          <p className="text-base text-slate">Main office</p>
          <PhoneNumber />
        </div>
      ) : null}
    </div>
  )
}

export function MailPanel() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="relative">
      <button
        className="flex h-[54px] w-[54px] items-center justify-center text-ink"
        aria-label="Mail"
        onClick={() => setOpen((value) => !value)}
      >
        <MailIcon />
      </button>
      {open ? (
        <form
          className="absolute right-0 top-full z-30 w-80 border border-line bg-white p-4"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
            setName('')
            setEmail('')
            setMessage('')
          }}
        >
          <p className="mb-4 text-base font-bold text-ink">Send us a message</p>
          <div className="space-y-4">
            <TextField
              label="Name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={setName}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              placeholder="Email address"
              onChange={setEmail}
            />
            <label className="block">
              <span className="mb-2 block text-base font-semibold leading-6 text-ink">Message</span>
              <textarea
                name="message"
                value={message}
                placeholder="Message"
                onChange={(event) => setMessage(event.target.value)}
                className="h-28 w-full border border-hairline bg-white px-3 py-3 text-base text-ink outline-none placeholder:text-placeholder"
              />
            </label>
          </div>
          <Button className="mt-6 w-full" type="submit">
            Send
          </Button>
          {sent ? <p className="mt-4 text-base text-slate">Message sent.</p> : null}
        </form>
      ) : null}
    </div>
  )
}

export function PhoneBar() {
  return (
    <div className="flex h-12 items-center gap-2 border-b border-line px-inset-phone md:hidden">
      <PhoneIcon className="h-5 w-5 text-brand" />
      <PhoneNumber size="md" />
    </div>
  )
}
