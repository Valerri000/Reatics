import Link from 'next/link'
import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { stepPhotos } from '@/lib/pageImages'
import { rentingSteps } from '@/lib/rentingSteps'
import type { RichTextBody } from '@/lib/richTextBody'

export function StepsPage({
  h1,
  content,
  showBody = false,
}: {
  h1: string
  content?: RichTextBody | null
  showBody?: boolean
}) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 text-center md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-4xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            We can teach you
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">{h1}</h1>
          {showBody ? (
            <div className="mx-auto mt-8 max-w-3xl text-left">
              <FormattedBody value={content} />
            </div>
          ) : (
            <p className="m-0 mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate">
              Our streamlined process makes finding and securing your next commercial location simple and transparent.
            </p>
          )}
        </div>
      </section>
      <section className="relative px-inset-phone pb-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="relative mx-auto max-w-5xl">
          <div className="timeline-line absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 lg:block" />
          <div className="space-y-16">
            {rentingSteps.map((step, index) => {
              const reverse = index % 2 === 1
              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-8 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={`order-2 w-full lg:order-none lg:w-1/2 ${reverse ? '' : 'lg:text-right'}`}>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.4em] text-brand">
                      Phase {step.label.padStart(2, '0')}
                    </p>
                    <h2 className="m-0 mt-3 text-4xl font-black tracking-tight text-ink">{step.title}</h2>
                    <p className="m-0 mt-4 text-lg font-medium leading-relaxed text-slate">{step.text}</p>
                  </div>
                  <div className="relative z-10 order-1 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-ink text-2xl font-black text-white lg:order-none">
                    {step.label.padStart(2, '0')}
                  </div>
                  <div className="order-3 w-full overflow-hidden rounded-[2rem] border-4 border-white lg:order-none lg:w-1/2">
                    <img src={stepPhotos[index]} alt="" className="h-64 w-full object-cover" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-ink px-8 py-16 text-center text-white">
          <h2 className="m-0 text-4xl font-black tracking-tight md:text-5xl">Ready to look?</h2>
          <p className="m-0 mx-auto mt-6 max-w-xl text-lg text-white/70">
            Search published listings, or send a message to the office.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">
            <Link href="/featured" className="rounded-full bg-brand px-10 py-4 text-sm font-black uppercase tracking-widest no-underline">
              <span className="text-white">Search listings</span>
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-10 py-4 text-sm font-black uppercase tracking-widest no-underline">
              <span className="text-white">Contact</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
