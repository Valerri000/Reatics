import Link from 'next/link'
import React from 'react'

import { PhoneNumber } from '@/components/PhoneNumber'
import { contactAddress } from '@/lib/contactDetails'

export function BrokerDirectory() {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-gray">Directory</p>
            <h1 className="m-0 mt-6 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">
              Find a broker.
            </h1>
            <p className="m-0 mt-6 max-w-xl text-xl font-medium leading-relaxed text-slate">
              A broker profile shows the person, a way to reach them, and the listings they publish.
            </p>
            <div className="mt-12 rounded-[2.5rem] border border-line bg-white px-8 py-16 text-center">
              <h2 className="m-0 text-2xl font-black tracking-tight text-ink">No brokers are listed yet.</h2>
              <p className="m-0 mt-3 text-base font-medium text-slate">
                Published broker profiles will appear on this page.
              </p>
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2.5rem] bg-ink p-8 text-white">
              <h2 className="m-0 text-3xl font-black leading-none tracking-tight">Talk with Reatics.</h2>
              <p className="m-0 mt-4 text-sm text-white/70">The office line answers while individual profiles are unpublished.</p>
              <div className="mt-8">
                <PhoneNumber tone="white" />
              </div>
              <a href="mailto:info@reatics.com" className="mt-4 block text-lg font-bold text-white">
                info@reatics.com
              </a>
              <Link href="/contact" className="mt-8 inline-flex w-full justify-center rounded-2xl bg-brand px-6 py-4 text-sm font-black no-underline">
                <span className="text-white">Send a message</span>
              </Link>
            </div>
            <div className="rounded-[2.5rem] border border-line bg-white p-8">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-gray">Office</p>
              <p className="m-0 mt-4 text-base font-bold text-ink">
                {contactAddress[0]}
                <br />
                {contactAddress[1]}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
