import Link from 'next/link'
import React from 'react'

import { ResultGrid } from '@/components/market/ResultGrid'
import type { PlaceListing } from '@/lib/placeList'

const filters = [
  { label: 'All Assets', kind: '' },
  { label: 'For Lease', kind: 'lease' },
  { label: 'For Sale', kind: 'sale' },
  { label: 'Coworking', kind: 'coworking' },
]

export function FeaturedMarket({
  listings,
  activeKind,
  place,
}: {
  listings: PlaceListing[]
  activeKind?: string
  place?: string
}) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone pb-10 pt-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Premium Showcase
          </p>
          <h1 className="m-0 mt-6 max-w-4xl text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">
            Featured Properties
          </h1>
          <p className="m-0 mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate">
            A curated selection of commercial listings for sale, lease, and coworking.
          </p>
        </div>
      </section>
      <section className="px-inset-phone pb-8 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 rounded-[2rem] border border-line bg-white p-2 shadow-sm">
          {filters.map((filter) => {
            const params = new URLSearchParams()
            if (place) params.set('place', place)
            if (filter.kind) params.set('kind', filter.kind)
            const href = params.size ? `/featured?${params.toString()}` : '/featured'
            const active = (activeKind || '') === filter.kind
            return (
              <Link
                key={filter.label}
                href={href}
                className={`rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest no-underline ${
                  active ? 'bg-ink' : ''
                }`}
              >
                <span className={active ? 'text-white' : 'text-slate'}>{filter.label}</span>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <ResultGrid listings={listings} />
          <div className="mt-16 rounded-[2rem] bg-ink px-8 py-12 text-white md:px-12">
            <h2 className="m-0 text-4xl font-black tracking-tight">Explore the full marketplace.</h2>
            <p className="m-0 mt-4 max-w-xl text-lg text-white/70">
              Open the map view for the same search. The map picture is a guide, and the list is the live records.
            </p>
            <Link
              href={mapHref(place, activeKind)}
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black no-underline"
            >
              <span className="text-ink">Launch Map Search</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function mapHref(place?: string, kind?: string) {
  const params = new URLSearchParams()
  if (place) params.set('place', place)
  if (kind) params.set('kind', kind)
  const query = params.toString()
  return query ? `/map?${query}` : '/map'
}
