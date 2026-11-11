'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { MapStage, type MapHandle } from '@/components/market/MapStage'
import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'
import { locationCenter } from '@/lib/mapStage'
import type { MapPinInput } from '@/lib/mapPins'
import { emptyPlace } from '@/lib/placeList'

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
  points,
  token,
  place,
  kind,
}: {
  listings: MapCard[]
  points: MapPinInput[]
  token: string
  place: string
  kind?: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState(place)
  const [open, setOpen] = useState(true)
  const [satellite, setSatellite] = useState(false)
  const [handle, setHandle] = useState<MapHandle | null>(null)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('place', query.trim())
    if (kind) params.set('kind', kind)
    router.push(params.size ? `/map?${params.toString()}` : '/map')
  }

  function locate() {
    const geo = navigator.geolocation
    if (!geo) return
    geo.getCurrentPosition((position) => {
      const center = locationCenter(position)
      handle?.flyTo(center.latitude, center.longitude)
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-white">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside
          className={`${open ? 'flex' : 'hidden'} w-full shrink-0 flex-col border-line bg-white lg:w-[450px] lg:border-r`}
        >
          <div className="border-b border-line p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="m-0 text-xl font-black text-ink">Map</h1>
              <button
                type="button"
                className="text-xs font-black uppercase tracking-widest text-brand"
                onClick={() => router.push('/map')}
              >
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
            {listings.length === 0 ? emptyPlace : `${listings.length} listings`}
          </p>
          <div className="flex-1 space-y-4 overflow-y-auto bg-sand/40 p-6">
            {listings.length === 0 ? <p className="m-0 text-base font-semibold text-slate">{emptyPlace}</p> : null}
            {listings.map((listing) => (
              <Link
                key={listing.href}
                href={listing.href}
                className="block overflow-hidden rounded-3xl border border-line bg-white no-underline"
              >
                <img src={listing.imageUrl} alt={listing.imageAlt} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="m-0 text-xl font-black text-ink">{formatListingPrice(listing.kind, listing.price)}</p>
                  <p className="m-0 mt-1 truncate text-sm font-bold text-slate">{listing.street || listing.cityLine}</p>
                  <p className="m-0 mt-4 text-[10px] font-black uppercase tracking-widest text-gray">
                    {listing.propertyType}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <section className="relative min-h-[70vh] flex-1 overflow-hidden bg-sand lg:min-h-0">
          <MapStage token={token} points={points} satellite={satellite} onHandle={setHandle} />
          <div className="absolute right-4 top-4 flex flex-col gap-2 md:right-6 md:top-6">
            <MapButton label="Zoom in" onClick={() => handle?.zoomIn()}>
              +
            </MapButton>
            <MapButton label="Zoom out" onClick={() => handle?.zoomOut()}>
              −
            </MapButton>
            <MapButton label={satellite ? 'Streets' : 'Satellite'} onClick={() => setSatellite((value) => !value)}>
              {satellite ? 'Map' : 'Sat'}
            </MapButton>
            <MapButton label="Zoom to my location" onClick={locate}>
              ⌖
            </MapButton>
          </div>
          <button
            type="button"
            className="absolute bottom-6 left-4 rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink shadow md:bottom-8 md:left-8 md:px-6 md:py-4"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide Results' : 'Show Results'}
          </button>
        </section>
      </div>
    </div>
  )
}

function MapButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="h-12 w-12 rounded-2xl bg-white text-lg font-bold text-ink shadow"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
