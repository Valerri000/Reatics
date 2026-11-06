import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/contact/ContactForm'
import { FormattedBody } from '@/components/content/FormattedBody'
import { PhoneNumber } from '@/components/PhoneNumber'
import { contactAddress } from '@/lib/contactDetails'
import { contactMapPhoto } from '@/lib/pageImages'
import type { RichTextBody } from '@/lib/richTextBody'

export function ContactPage({ h1, content }: { h1: string; content?: RichTextBody | null }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone pb-8 pt-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Get in touch
          </p>
          <h1 className="m-0 mt-8 max-w-3xl text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">{h1}</h1>
          <div className="mt-8 max-w-3xl">
            <FormattedBody value={content} />
          </div>
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-line bg-white p-8">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-gray">Headquarters</p>
              <p className="m-0 mt-6 text-xl font-bold text-ink">
                {contactAddress[0]}
                <br />
                {contactAddress[1]}
              </p>
              <div className="mt-6">
                <PhoneNumber tone="ink" />
              </div>
              <a href="mailto:info@reatics.com" className="mt-4 inline-block text-xl font-bold no-underline">
                <span className="text-brand">info@reatics.com</span>
              </a>
            </div>
            <Link href="/map" className="relative block overflow-hidden rounded-[2rem] no-underline">
              <img src={contactMapPhoto} alt="" className="h-64 w-full object-cover" />
              <span className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-3 text-[10px] font-black uppercase tracking-widest text-ink">
                Open the map
              </span>
            </Link>
          </div>
          <div className="rounded-[2.5rem] border border-line bg-white p-8 md:p-12">
            <h2 className="m-0 text-3xl font-black tracking-tight text-ink">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
