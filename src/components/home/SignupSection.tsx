'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'

export function SignupSection() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  function submit(event: React.FormEvent) {
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

  return (
    <HomeSection id="signup">
      <h2 className="m-0 text-[28px] font-extrabold leading-9 text-ink xl:text-title">
        Connect with us
      </h2>
      <p className="m-0 mt-4 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">
        Reatics will continue to improve. If you are interested in the latest news, updates and blog
        posts, leave us your email and we&apos;ll keep you in the loop!
      </p>
      {saved ? (
        <p className="m-0 mt-6 text-base font-bold text-ink">Your email has been saved.</p>
      ) : (
        <form
          onSubmit={submit}
          className="mt-6 flex max-w-xl flex-col gap-4 md:flex-row md:items-start"
        >
          <label className="block flex-1">
            <span className="sr-only">Email</span>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="Your preferred e-mail"
              onChange={(event) => setEmail(event.target.value)}
              className={`h-12 w-full bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder md:h-14 ${
                error ? 'border-2 border-brand' : 'border border-hairline'
              }`}
            />
            {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
          </label>
          <Button type="submit">Keep in touch</Button>
        </form>
      )}
    </HomeSection>
  )
}
