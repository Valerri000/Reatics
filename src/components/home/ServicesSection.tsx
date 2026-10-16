import React from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'

const services = [
  'Commercial real estate search',
  'List your property',
  'Marketing for your listing',
]

export function ServicesSection() {
  return (
    <HomeSection id="services" tone="mist">
      <p className="m-0 text-base font-semibold text-brand">Services</p>
      <h2 className="m-0 mt-4 max-w-[18ch] text-[28px] font-extrabold leading-9 text-ink xl:text-title">
        Search, list and market commercial properties on our platform.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((title) => (
          <article key={title} className="bg-white">
            <div className="aspect-[3/2] bg-sand" />
            <h3 className="m-0 p-4 text-[22px] font-bold leading-8 text-ink md:text-card">
              {title}
            </h3>
          </article>
        ))}
      </div>
      <Button variant="secondary" href="/services" className="mt-8">
        Learn more
      </Button>
    </HomeSection>
  )
}
