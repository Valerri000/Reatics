'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'
import { mapPhoto } from '@/lib/pageImages'

type MapCard = {
  href: string
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  price: number | null
  street: string
  cityLine: string
  propertyType: string
}

export function MapSearch({
  listings,
  place,
  kind,
}: {
  listings: MapCard[]
  place: string
  kind?: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState(place)
  const [open, setOpen] = useState(true)
  const [zoom, setZoom] = useState(1)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('place', query.trim())
    if (kind) params.set('kind', kind)
    router.push(params.size ? `/map?${params.toString()}` : '/map')
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-white">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className={`${open ? 'flex' : 'hidden'} w-full shrink-0 flex-col border-line bg-white lg:w-[450px] lg:border-r`}>
          <div className="border-b border-line p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="m-0 text-xl font-black text-ink">Market Results</h1>
              <button type="button" className="text-xs font-black uppercase tracking-widest text-brand" onClick={() => router.push('/map')}>
                Clear All
              </button>
            </div>
            <form onSubmit={submit} className="flex items-center rounded-2xl border border-line bg-sand px-4 py-2">
              <input
                value={query}
                aria-label="City, state, county, or ZIP"
                placeholder="City, state, or ZIP"
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent py-1 font-bold text-ink outline-none"
              />
              <button type="submit" className="text-sm font-bold text-brand">
                Search
              </button>
            </form>
          </div>
          <p className="m-0 border-b border-line px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray">
            {listings.length === 0 ? 'No listings yet.' : `${listings.length} listings`}
          </p>
          <div className="flex-1 space-y-4 overflow-y-auto bg-sand/40 p-6">
            {listings.map((listing) => (
              <a key={listing.href} href={listing.href} className="block overflow-hidden rounded-3xl border border-line bg-white no-underline">
                <img src={listing.imageUrl} alt={listing.imageAlt} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="m-0 text-xl font-black text-ink">{formatListingPrice(listing.kind, listing.price)}</p>
                  <p className="m-0 mt-1 truncate text-sm font-bold text-slate">{listing.street || listing.cityLine}</p>
                  <p className="m-0 mt-4 text-[10px] font-black uppercase tracking-widest text-gray">{listing.propertyType}</p>
                </div>
              </a>
            ))}
          </div>
        </aside>
        <section className="relative min-h-[420px] flex-1 overflow-hidden bg-sand">
          <img
            src={mapPhoto}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            style={{ transform: `scale(${zoom})` }}
          />
          <div className="absolute inset-0 bg-brand/10" />
          <div className="absolute right-6 top-6 flex flex-col gap-2">
            <button type="button" className="h-12 w-12 rounded-2xl bg-white text-lg font-bold shadow" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))}>
              +
            </button>
            <button type="button" className="h-12 w-12 rounded-2xl bg-white text-lg font-bold shadow" onClick={() => setZoom((value) => Math.max(1, value - 0.15))}>
              -
            </button>
          </div>
          <button
            type="button"
            className="absolute bottom-8 left-8 rounded-2xl bg-white px-6 py-4 text-sm font-black text-ink shadow"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide Results' : 'Show Results'}
          </button>
        </section>
      </div>
    </div>
  )
}
