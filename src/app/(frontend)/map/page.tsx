import React from 'react'
import type { Metadata } from 'next'

import { MapSearch } from '@/components/market/MapSearch'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { loadPlaceListings } from '@/lib/loadPlaces'
import { filtersFromQuery } from '@/lib/mapFilters'
import { storedMapPins } from '@/lib/mapPins'
import { mapRobots, mapTitle, mapToken } from '@/lib/mapStage'
import { marketListings, readQuery } from '@/lib/marketListings'
import { listingCardFields } from '@/lib/placeList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: mapTitle,
  robots: mapRobots,
}

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = readQuery(await searchParams)
  const records = marketListings(await loadPlaceListings(), {})
  const listings = records.map((listing, index) => {
    const card = listingCardFields(listing)
    return {
      ...card,
      imageUrl: designPhoto(card.imageUrl, propertyPhotos, index),
      slug: listing.slug,
      squareFootage: listing.squareFootage ?? null,
      keywords: listing.keywords ?? null,
      title: listing.title,
      county: listing.county ?? null,
      city: listing.city ?? null,
      state: listing.state ?? null,
      postalCode: listing.postalCode ?? null,
      latitude: listing.latitude ?? null,
      longitude: listing.longitude ?? null,
    }
  })

  return (
    <MapSearch
      listings={listings}
      points={storedMapPins(records)}
      token={mapToken(process.env)}
      place={query.place || query.city || ''}
      kind={query.kind}
      initial={filtersFromQuery(query)}
    />
  )
}
