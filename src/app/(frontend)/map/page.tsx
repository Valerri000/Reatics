import React from 'react'
import type { Metadata } from 'next'

import { MapSearch } from '@/components/market/MapSearch'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { loadPlaceListings } from '@/lib/loadPlaces'
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
  const records = marketListings(await loadPlaceListings(), query)
  const listings = records.map((listing, index) => {
    const card = listingCardFields(listing)
    return {
      ...card,
      imageUrl: designPhoto(card.imageUrl, propertyPhotos, index),
    }
  })

  return (
    <MapSearch
      listings={listings}
      points={storedMapPins(records)}
      token={mapToken(process.env)}
      place={query.place || query.city || ''}
      kind={query.kind}
    />
  )
}
