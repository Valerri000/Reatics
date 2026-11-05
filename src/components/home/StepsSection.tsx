import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'
import { rentingSteps } from '@/lib/rentingSteps'

export function StepsSection() {
  return (
    <HomeSection id="steps" tone="charcoal">
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
          We can teach you
        </p>
        <h2 className="m-0 mt-4 text-center text-3xl font-bold text-white md:text-4xl">
          Steps to Renting an Office Space
        </h2>
        <p className="m-0 mx-auto mt-4 max-w-2xl text-center text-lg text-white/70">
          Our streamlined process makes finding and securing your next commercial location simple and
          transparent.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 xl:grid-cols-5">
          {rentingSteps.map((step) => (
            <article key={step.label} className="relative">
              <p className="pointer-events-none absolute -left-1 -top-10 m-0 select-none text-8xl font-black text-white/10">
                {step.label}
              </p>
              <div className="relative">
                <p className="m-0 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-base font-bold text-white">
                  {step.label}
                </p>
                <h3 className="m-0 mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="m-0 mt-3 text-sm leading-6 text-white/70">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  )
}
