import Link from 'next/link'
import React from 'react'

import { AddListingButton } from '@/components/content/AddListingButton'
import { FormattedBody } from '@/components/content/FormattedBody'
import { coworkHeroPhoto } from '@/lib/pageImages'
import type { RichTextBody } from '@/lib/richTextBody'

const cards = [
  {
    title: 'Search',
    text: 'Search published listings by place, transaction, and use.',
    href: '/featured',
    label: 'Search listings',
    className: 'border border-line bg-white text-ink',
  },
  {
    title: 'Marketing for your listing',
    text: 'A published listing can appear on the city page and in Featured.',
    href: '/brokers',
    label: 'Find a broker',
    className: 'border border-line bg-white text-ink',
  },
]

export function ServicesPage({ h1, content }: { h1: string; content?: RichTextBody | null }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 text-center md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-4xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Services
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">{h1}</h1>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <FormattedBody value={content} />
          </div>
        </div>
      </section>
      <section className="px-inset-phone pb-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <article className={`flex flex-col rounded-[2.5rem] p-8 ${cards[0].className}`}>
            <h2 className="m-0 text-3xl font-black tracking-tight">{cards[0].title}</h2>
            <p className="m-0 mt-4 flex-1 text-base leading-7 text-slate">{cards[0].text}</p>
            <Link href={cards[0].href} className="mt-8 inline-flex justify-center rounded-2xl bg-sand px-6 py-4 text-xs font-black uppercase tracking-widest no-underline">
              <span className="text-ink">{cards[0].label}</span>
            </Link>
          </article>
          <article className="flex flex-col rounded-[2.5rem] bg-ink p-8 text-white">
            <h2 className="m-0 text-3xl font-black tracking-tight">List your property</h2>
            <p className="m-0 mt-4 flex-1 text-base leading-7 text-white/70">
              Owners and brokers add a listing from the account tools.
            </p>
            <AddListingButton className="mt-8 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-ink">
              Add a Listing
            </AddListingButton>
          </article>
          <article className={`flex flex-col rounded-[2.5rem] p-8 ${cards[1].className}`}>
            <h2 className="m-0 text-3xl font-black tracking-tight">{cards[1].title}</h2>
            <p className="m-0 mt-4 flex-1 text-base leading-7 text-slate">{cards[1].text}</p>
            <Link href={cards[1].href} className="mt-8 inline-flex justify-center rounded-2xl bg-sand px-6 py-4 text-xs font-black uppercase tracking-widest no-underline">
              <span className="text-ink">{cards[1].label}</span>
            </Link>
          </article>
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.5rem] border border-line bg-white p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Coworking</p>
            <h2 className="m-0 mt-4 text-4xl font-black tracking-tight text-ink">Coworking spaces</h2>
            <p className="m-0 mt-4 text-lg leading-8 text-slate">
              Coworking providers list a space from their account. People looking for a desk search on the coworking page.
            </p>
            <Link href="/coworking" className="mt-8 inline-flex rounded-full bg-emerald-600 px-8 py-4 text-sm font-black no-underline">
              <span className="text-white">View coworking</span>
            </Link>
          </div>
          <img src={coworkHeroPhoto} alt="" className="h-80 w-full rounded-[2rem] object-cover" />
        </div>
      </section>
    </div>
  )
}
