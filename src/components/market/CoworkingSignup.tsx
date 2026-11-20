'use client'

import { useState } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'

const points = ['Zero upfront costs', 'Professional verification', 'High-intent leads directly to your dashboard']

export function CoworkingSignup() {
  const auth = useAuth()
  const [space, setSpace] = useState('')
  const [email, setEmail] = useState('')

  function start(event: React.FormEvent) {
    event.preventDefault()
    auth.openRegister()
  }

  return (
    <section className="relative overflow-hidden bg-charcoal py-32 text-white">
      <div className="absolute right-0 top-0 h-full w-[600px] rounded-full bg-white/10 blur-[120px]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-4 sm:px-6 lg:flex-row lg:px-8">
        <div className="max-w-xl">
          <h2 className="m-0 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
            Own a Space? <br /> <span className="text-white">List it for Free.</span>
          </h2>
          <p className="mb-10 mt-8 text-xl font-medium leading-relaxed text-white/70">
            Join the Reatics network. Coworking providers list for free after verification. We only charge a 10% referral fee when you sign a tenant.
          </p>
          <ul className="mb-12 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-4 font-bold text-white">
                <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-full bg-white px-12 py-6 text-sm font-black uppercase tracking-widest text-brand shadow-2xl hover:bg-blue-50"
            onClick={auth.openRegister}
          >
            Get Started Today
          </button>
        </div>
        <div className="w-full lg:w-2/5">
          <div className="rounded-[4rem] border border-white/20 bg-white/10 p-12 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-brand shadow-xl">
              <svg className="h-10 w-10" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 17c.6-1.6 2-2.4 4-2.4s3.4.8 4 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </div>
            <h3 className="m-0 text-2xl font-black tracking-tight">Provider Signup</h3>
            <p className="mb-8 mt-4 font-medium text-white/70">Enter your basic details to start the verification process.</p>
            <form className="space-y-6" onSubmit={start}>
              <input
                type="text"
                value={space}
                onChange={(event) => setSpace(event.target.value)}
                placeholder="Space Name"
                aria-label="Space Name"
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Business Email"
                aria-label="Business Email"
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-white py-5 text-xs font-black uppercase tracking-widest text-brand hover:bg-blue-50"
              >
                Submit for Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
