import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'

const steps = [
  {
    label: 'Step 1',
    title: 'Create a budget',
    text: 'Know what you can afford before the search.',
  },
  { label: 'Step 2', title: 'Pick a general location', text: '' },
  { label: 'Step 3', title: 'Pick 3 specific properties', text: '' },
  { label: 'Step 4', title: 'Submit an LOI', text: '' },
  { label: 'Step 5', title: 'Review the lease', text: '' },
]

export function StepsSection() {
  return (
    <HomeSection id="steps">
      <p className="m-0 text-base font-semibold text-brand">We can teach you</p>
      <h2 className="m-0 mt-4 text-[28px] font-extrabold leading-9 text-ink xl:text-title">
        Learn about renting an office.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">
        {steps.map((step) => (
          <article key={step.label} className="bg-mist">
            <div className="aspect-[3/2] bg-sand" />
            <div className="p-4">
              <p className="m-0 text-base text-gray">{step.label}</p>
              <h3 className="m-0 mt-2 text-[22px] font-bold leading-8 text-ink">{step.title}</h3>
              {step.text ? (
                <p className="m-0 mt-2 text-[16px] font-light leading-6 text-slate">{step.text}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </HomeSection>
  )
}
