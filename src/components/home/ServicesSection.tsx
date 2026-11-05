import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'

const services = [
  {
    title: 'Search',
    text: 'Search published listings by place, transaction, and use.',
  },
  {
    title: 'List your property',
    text: 'Owners and brokers add a listing from the account tools.',
  },
  {
    title: 'Marketing for your listing',
    text: 'A published listing can appear on the city page and in Featured.',
  },
]

export function ServicesSection() {
  return (
    <HomeSection id="services">
      <div className="mx-auto max-w-xl lg:ml-8 lg:mr-auto">
        <p className="m-0 text-xs font-bold uppercase tracking-widest text-gray">Services</p>
        <div className="mt-6 grid gap-8">
          {services.map((service) => (
            <article key={service.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sand text-brand">
                <span className="text-lg font-bold">{service.title.slice(0, 1)}</span>
              </span>
              <div>
                <h3 className="m-0 text-base font-bold text-ink">{service.title}</h3>
                <p className="m-0 mt-1 text-sm leading-6 text-slate">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/services" className="mt-8 inline-block text-base font-bold text-brand">
          Learn more
        </Link>
      </div>
    </HomeSection>
  )
}
