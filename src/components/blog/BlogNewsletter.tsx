'use client'

import React, { useState } from 'react'

export function BlogNewsletter() {
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
    setEmail('')
    setError('')
    setSaved(true)
  }

  return (
    <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-ink px-8 py-12 text-center text-white">
        <h2 className="m-0 text-4xl font-black tracking-tight">Stay in touch.</h2>
        <p className="m-0 mt-4 text-lg text-white/70">Leave your email for news and updates.</p>
        {saved ? (
          <p className="m-0 mt-8 text-base font-bold">Your email has been saved.</p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 md:flex-row">
            <input
              type="email"
              name="newsletter"
              value={email}
              placeholder="Your email"
              aria-label="Your email"
              onChange={(event) => setEmail(event.target.value)}
              className="h-14 flex-1 rounded-2xl bg-white px-5 font-bold text-ink outline-none"
            />
            <button type="submit" className="rounded-2xl bg-brand px-8 py-4 text-sm font-black uppercase tracking-widest text-white">
              Submit
            </button>
          </form>
        )}
        {error ? <p className="m-0 mt-3 text-sm text-white">{error}</p> : null}
      </div>
    </section>
  )
}
