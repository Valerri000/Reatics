'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useOptionalAuth } from '@/components/auth/AuthProvider'
import { ContactPanel } from '@/components/listing/ListingCard'
import { MapStage, type MapHandle } from '@/components/market/MapStage'
import { PhoneNumber } from '@/components/PhoneNumber'
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
import { cardIsActive, favoriteNeedsSignIn } from '@/lib/mapHover'
import { storedMapPins } from '@/lib/mapPins'
import { shareableMapPath } from '@/lib/mapShare'
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
  const [view, setView] = useState<'map' | 'list'>('map')
  const [satellite, setSatellite] = useState(false)
  const [handle, setHandle] = useState<MapHandle | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const auth = useOptionalAuth()
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

  useEffect(() => {
    const next = shareableMapPath(filters)
    const current = `${window.location.pathname}${window.location.search}`
    if (current !== next) window.history.replaceState(null, '', next)
  }, [filters])

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

  function applyPlace(event: React.FormEvent) {
    event.preventDefault()
    setFilters((current) => ({ ...current, place: query.trim() }))
  }

  const fieldClass =
    'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand'

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-sand">
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-sand">
        <MapStage
          token={token}
          points={pins}
          satellite={satellite}
          area={area}
          drawing={drawing}
          onPick={(point) => setArea((current) => addAreaPoint(current, point))}
          activeSlug={active}
          onActive={setActive}
          onOpen={(slug) => {
            const match = listings.find((item) => item.slug === slug || item.href.endsWith(`/${slug}`))
            if (match) window.location.assign(match.href)
          }}
          onHandle={setHandle}
        />
        <aside
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-4 top-4 z-20 max-h-[calc(100%-5.5rem)] w-auto flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:inset-x-auto sm:left-6 sm:top-6 sm:w-[420px] md:left-8 md:top-8`}
        >
          <div className="overflow-y-auto p-6">
            <h1 className="m-0 text-2xl font-black tracking-tight text-ink">Find Commercial Properties</h1>
            <p className="m-0 mt-1 text-sm font-medium text-slate">Offices, retail, industrial, and coworking spaces</p>
            <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-mist p-1">
              <button
                type="button"
                className={`rounded-xl px-3 py-2.5 text-sm font-bold ${view === 'map' ? 'bg-brand text-white shadow' : 'text-slate'}`}
                onClick={() => setView('map')}
              >
                Map
              </button>
              <button
                type="button"
                className={`rounded-xl px-3 py-2.5 text-sm font-bold ${view === 'list' ? 'bg-brand text-white shadow' : 'text-slate'}`}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
            <form onSubmit={applyPlace} className="mt-5">
              <label className="flex items-center gap-3 rounded-2xl border border-line bg-sand px-4 py-3">
                <span className="text-base font-black text-brand" aria-hidden>
                  ⌕
                </span>
                <input
                  value={query}
                  aria-label="City, state, county, or ZIP"
                  placeholder="City, state, county, or ZIP"
                  onChange={(event) => {
                    const value = event.target.value
                    setQuery(value)
                    setFilters((current) => ({ ...current, place: value.trim() }))
                  }}
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
                />
              </label>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Sale, lease, or coworking">
                  <select
                    aria-label="Sale, lease, or coworking"
                    value={filters.kind}
                    onChange={(event) => {
                      const value = event.target.value
                      const next = value === 'sale' || value === 'lease' || value === 'coworking' ? value : ''
                      setFilters((current) => chooseKind(current, next))
                    }}
                    className={fieldClass}
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
                    className={fieldClass}
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
                    className={fieldClass}
                  />
                </Field>
                <Field label="Maximum price">
                  <input
                    aria-label="Maximum price"
                    value={filters.priceMax}
                    onChange={(event) => setFilters((current) => ({ ...current, priceMax: event.target.value }))}
                    className={fieldClass}
                  />
                </Field>
                <Field label="Min. square footage">
                  <input
                    aria-label="Minimum square footage"
                    value={filters.squareFootageMin}
                    onChange={(event) => setFilters((current) => ({ ...current, squareFootageMin: event.target.value }))}
                    className={fieldClass}
                  />
                </Field>
                <Field label="Max. square footage">
                  <input
                    aria-label="Maximum square footage"
                    value={filters.squareFootageMax}
                    onChange={(event) => setFilters((current) => ({ ...current, squareFootageMax: event.target.value }))}
                    className={fieldClass}
                  />
                </Field>
              </div>
              <Field label="Keywords">
                <input
                  aria-label="Keywords"
                  value={filters.keywords}
                  placeholder="e.g. office, retail, warehouse"
                  onChange={(event) => setFilters((current) => ({ ...current, keywords: event.target.value }))}
                  className={`${fieldClass} mt-3`}
                />
              </Field>
              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3.5 text-sm font-black text-white hover:bg-brand-deep"
              >
                <span aria-hidden>⌕</span>
                Search Properties
              </button>
            </form>
            <button
              type="button"
              className="mt-3 w-full text-center text-sm font-bold text-brand"
              onClick={clearAll}
            >
              Clear All
            </button>
            <div className={`${view === 'list' ? 'mt-6 space-y-4 border-t border-line pt-5' : 'hidden'}`}>
              <p className="m-0 text-[10px] font-black uppercase tracking-widest text-gray">
                {shown.length === 0 ? emptyPlace : `${shown.length} listings`}
              </p>
              {shown.length === 0 ? <p className="m-0 text-base font-semibold text-slate">{emptyPlace}</p> : null}
              {shown.map((listing) => {
                const slug = listing.slug || listing.href
                const marked = cardIsActive(slug, active)
                return (
                  <article
                    key={listing.href}
                    className={`overflow-hidden rounded-3xl bg-white ${marked ? 'border-2 border-brand' : 'border border-line'}`}
                    onMouseEnter={() => setActive(slug)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <Link href={listing.href} className="block no-underline">
                      <img src={listing.imageUrl} alt={listing.imageAlt} className="h-44 w-full object-cover" />
                      <div className="p-5">
                        <p className="m-0 text-xl font-black text-ink">{formatListingPrice(listing.kind, listing.price)}</p>
                        <p className="m-0 mt-1 truncate text-sm font-bold text-slate">{listing.street || listing.cityLine}</p>
                        <p className="m-0 mt-4 text-[10px] font-black uppercase tracking-widest text-gray">
                          {listing.propertyType}
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between border-t border-line px-5 py-4">
                      {listing.kind === 'coworking' ? <PhoneNumber size="md" /> : <ContactPanel listingHref={listing.href} />}
                      <button
                        type="button"
                        aria-label="Save listing"
                        className="text-sm font-bold text-brand"
                        onClick={() => {
                          if (favoriteNeedsSignIn(auth?.user)) auth?.openSignIn()
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </aside>
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 md:right-6 md:top-6">
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
        <div className="absolute bottom-6 left-4 z-10 flex flex-col gap-3 md:bottom-8 md:left-8">
          <div className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-ink shadow">
            {shown.length === 0 ? emptyPlace : `${shown.length} listings`}
          </div>
          <button
            type="button"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-ink shadow md:px-6 md:py-4"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide Results' : 'Show Results'}
          </button>
        </div>
      </section>
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
      <span className="mb-1.5 block">{label}</span>
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
