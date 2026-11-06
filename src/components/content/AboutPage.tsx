import Link from 'next/link'
import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { PhoneNumber } from '@/components/PhoneNumber'
import { contactAddress } from '@/lib/contactDetails'
import { aboutOfficePhoto, aboutPhoto } from '@/lib/pageImages'
import type { RichTextBody } from '@/lib/richTextBody'

const roles = [
  {
    title: 'Space seekers',
    text: 'Search by place, sale or lease, and coworking. An account can save listings and searches.',
    className: 'bg-white text-ink',
  },
  {
    title: 'Brokers',
    text: 'Brokers add a listing from the account tools. A public profile appears here when one is published.',
    className: 'bg-ink text-white',
  },
  {
    title: 'Property owners',
    text: 'Owners publish a listing and keep the details current.',
    className: 'bg-white text-ink',
  },
  {
    title: 'Providers',
    text: 'Coworking providers list a space from their account.',
    className: 'bg-emerald-600 text-white',
  },
]

export function AboutPage({ h1, content }: { h1: string; content?: RichTextBody | null }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 text-center md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-4xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            About Reatics
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">{h1}</h1>
        </div>
      </section>
      <section className="px-inset-phone pb-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <img src={aboutPhoto} alt="" className="h-[420px] w-full rounded-[2.5rem] object-cover" />
          <div className="rounded-[2.5rem] bg-ink p-10 text-white">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Headquarters</p>
            <p className="m-0 mt-6 text-2xl font-black leading-tight">
              {contactAddress[0]}
              <br />
              {contactAddress[1]}
            </p>
            <div className="mt-6">
              <PhoneNumber tone="white" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-inset-phone pb-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-line bg-white p-8 md:p-12">
          <FormattedBody value={content} />
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => (
            <article key={role.title} className={`rounded-[2rem] border border-line p-8 ${role.className}`}>
              <h2 className="m-0 text-xl font-black">{role.title}</h2>
              <p className="m-0 mt-4 text-sm font-medium leading-6 opacity-80">{role.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-2">
          <img src={aboutOfficePhoto} alt="" className="h-full min-h-[360px] w-full rounded-[2.5rem] object-cover" />
          <div className="flex flex-col justify-center rounded-[2.5rem] border border-line bg-white p-10">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-gray">Headquarters</p>
            <h2 className="m-0 mt-4 text-4xl font-black tracking-tight text-ink">Visit us in Glendale.</h2>
            <p className="m-0 mt-8 text-xl font-bold text-ink">
              {contactAddress[0]}
              <br />
              {contactAddress[1]}
            </p>
            <div className="mt-6">
              <PhoneNumber tone="ink" />
            </div>
            <Link href="/contact" className="mt-10 inline-flex w-fit rounded-3xl bg-brand px-8 py-4 text-sm font-black no-underline">
              <span className="text-white">Send a message</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
