import React from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'

export function AboutSection() {
  return (
    <HomeSection id="about">
      <p className="m-0 text-base font-semibold text-brand">About Reatics</p>
      <div className="mt-6 grid gap-8 xl:grid-cols-2">
        <h2 className="m-0 text-[28px] font-extrabold leading-9 text-ink xl:text-title">
          Commercial real estate listing platform founded on unparalleled industry knowledge +
          expertise.
        </h2>
        <div>
          <p className="m-0 text-[16px] font-light leading-6 text-ink md:text-body">
            Reatics is a platform built for brokers, workspace providers, and landlords to advertise
            commercial real estate for lease or sale, so a tenant can find a workplace or an
            investment property.
          </p>
          <Button variant="secondary" href="/about" className="mt-6">
            Learn more
          </Button>
        </div>
      </div>
    </HomeSection>
  )
}
