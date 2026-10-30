import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { PlaceCards } from '@/components/place/PlaceCards'
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
    <article className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{h1}</h1>
      <div className="mt-6">
        <FormattedBody value={content} />
      </div>
      <p className="m-0 mt-8">
        <a href={mapHref} className="text-base font-bold text-brand">
          {mapLabel}
        </a>
      </p>
      {listings.length === 0 ? (
        <p className="m-0 mt-8 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyPlace}</p>
      ) : (
        <PlaceCards listings={listings} />
      )}
    </article>
  )
}
