import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { ResultGrid } from '@/components/market/ResultGrid'
import { cityHeroPhoto } from '@/lib/pageImages'
import { emptyPlace, mapLabel, type PlaceListing } from '@/lib/placeList'
import type { RichTextBody } from '@/payload-types'

export function PlacePage({
  h1,
  content,
  listings,
  mapHref,
}: {
  h1: string
  content?: RichTextBody | null
  listings: PlaceListing[]
  mapHref: string
}) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="m-0 text-6xl font-black tracking-tight text-ink md:text-7xl">{h1}</h1>
            <div className="mt-6 max-w-xl text-lg text-slate">
              <FormattedBody value={content} />
            </div>
            <a href={mapHref} className="mt-8 inline-flex rounded-3xl bg-brand px-8 py-4 text-sm font-black no-underline">
              <span className="text-white">{mapLabel}</span>
            </a>
          </div>
          <img src={cityHeroPhoto} alt="" className="h-[420px] w-full rounded-[2rem] object-cover" />
        </div>
      </section>
      <section className="bg-sand px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h2 className="m-0 text-4xl font-black tracking-tight text-ink">Latest opportunities</h2>
          {listings.length === 0 ? (
            <p className="m-0 mt-8 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyPlace}</p>
          ) : (
            <ResultGrid listings={listings} />
          )}
        </div>
      </section>
    </div>
  )
}
