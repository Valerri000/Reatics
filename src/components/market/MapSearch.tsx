'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { MapStage, type MapHandle } from '@/components/market/MapStage'
import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'
import { addAreaPoint, type AreaPoint } from '@/lib/mapArea'
import {
  chooseKind,
  emptyMapFilters,
  filterMapListings,
  typesForKind,
  type MapFilters,
  type MapListing,
} from '@/lib/mapFilters'
import { storedMapPins } from '@/lib/mapPins'
import { locationCenter } from '@/lib/mapStage'
import { emptyPlace } from '@/lib/placeList'

type MapCard = MapListing & {
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
  initial,
}: {
  listings: MapCard[]
  points: { slug: string; latitude: number; longitude: number }[]
  token: string
  place: string
  kind?: string
  initial?: MapFilters
}) {
  const [query, setQuery] = useState(initial?.place || place)
  const [filters, setFilters] = useState<MapFilters>(() => initial || startingFilters(place, kind))
  const [area, setArea] = useState<AreaPoint[]>([])
  const [drawing, setDrawing] = useState(false)
  const [open, setOpen] = useState(true)
  const [satellite, setSatellite] = useState(false)
  const [handle, setHandle] = useState<MapHandle | null>(null)
  const shown = filterMapListings(listings, filters, area)
  const derived = storedMapPins(
    shown.flatMap((listing) =>
      listing.latitude == null || listing.longitude == null
        ? []
        : [{ slug: listing.slug || listing.href, latitude: listing.latitude, longitude: listing.longitude }],
    ),
  )
  const pins = listings.some((listing) => listing.latitude != null && listing.longitude != null) ? derived : points
  const typeOptions = typesForKind(filters.kind)

  function locate() {
    const geo = navigator.geolocation
    if (!geo) return
    geo.getCurrentPosition((position) => {
      const center = locationCenter(position)
      handle?.flyTo(center.latitude, center.longitude)
    })
  }

  function clearAll() {
    setQuery('')
    setFilters(emptyMapFilters())
    setArea([])
    setDrawing(false)
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
              <button type="button" className="text-xs font-black uppercase tracking-widest text-brand" onClick={clearAll}>
                Clear All
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setFilters((current) => ({ ...current, place: query.trim() }))
              }}
              className="flex items-center rounded-2xl border border-line bg-sand px-4 py-2"
            >
              <input
                value={query}
                aria-label="City, state, county, or ZIP"
                placeholder="City, state, county, or ZIP"
                onChange={(event) => {
                  const value = event.target.value
                  setQuery(value)
                  setFilters((current) => ({ ...current, place: value.trim() }))
                }}
                className="w-full bg-transparent py-1 font-bold text-ink outline-none"
              />
              <button type="submit" className="text-sm font-bold text-brand">
                Search
              </button>
            </form>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Field label="Sale, lease, or coworking">
                <select
                  aria-label="Sale, lease, or coworking"
                  value={filters.kind}
                  onChange={(event) => {
                    const value = event.target.value
                    const next = value === 'sale' || value === 'lease' || value === 'coworking' ? value : ''
                    setFilters((current) => chooseKind(current, next))
                  }}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                >
                  <option value="">Any</option>
                  <option value="sale">For sale</option>
                  <option value="lease">For lease</option>
                  <option value="coworking">Coworking</option>
                </select>
              </Field>
              <Field label="Property type">
                <select
                  aria-label="Property type"
                  value={typeOptions.includes(filters.propertyType) ? filters.propertyType : ''}
                  onChange={(event) => setFilters((current) => ({ ...current, propertyType: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                >
                  <option value="">Any</option>
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Minimum price">
                <input
                  aria-label="Minimum price"
                  value={filters.priceMin}
                  onChange={(event) => setFilters((current) => ({ ...current, priceMin: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                />
              </Field>
              <Field label="Maximum price">
                <input
                  aria-label="Maximum price"
                  value={filters.priceMax}
                  onChange={(event) => setFilters((current) => ({ ...current, priceMax: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                />
              </Field>
              <Field label="Minimum square footage">
                <input
                  aria-label="Minimum square footage"
                  value={filters.squareFootageMin}
                  onChange={(event) => setFilters((current) => ({ ...current, squareFootageMin: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                />
              </Field>
              <Field label="Maximum square footage">
                <input
                  aria-label="Maximum square footage"
                  value={filters.squareFootageMax}
                  onChange={(event) => setFilters((current) => ({ ...current, squareFootageMax: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                />
              </Field>
              <Field label="Keywords">
                <input
                  aria-label="Keywords"
                  value={filters.keywords}
                  onChange={(event) => setFilters((current) => ({ ...current, keywords: event.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-ink"
                />
              </Field>
            </div>
          </div>
          <p className="m-0 border-b border-line px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray">
            {shown.length === 0 ? emptyPlace : `${shown.length} listings`}
          </p>
          <div className="flex-1 space-y-4 overflow-y-auto bg-sand/40 p-6">
            {shown.length === 0 ? <p className="m-0 text-base font-semibold text-slate">{emptyPlace}</p> : null}
            {shown.map((listing) => (
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
          <MapStage
            token={token}
            points={pins}
            satellite={satellite}
            area={area}
            drawing={drawing}
            onPick={(point) => setArea((current) => addAreaPoint(current, point))}
            onHandle={setHandle}
          />
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
            <MapButton label={drawing ? 'Stop drawing' : 'Draw area'} onClick={() => setDrawing((value) => !value)}>
              ⌷
            </MapButton>
            <MapButton
              label="Clear area"
              onClick={() => {
                setArea([])
                setDrawing(false)
              }}
            >
              ×
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

function startingFilters(place: string, kind?: string): MapFilters {
  const filters = emptyMapFilters()
  filters.place = place
  if (kind === 'sale' || kind === 'lease' || kind === 'coworking') filters.kind = kind
  return filters
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-slate">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
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
