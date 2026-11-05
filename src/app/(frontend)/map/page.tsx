import React from 'react'

import { MapSearch } from '@/components/market/MapSearch'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { loadPlaceListings } from '@/lib/loadPlaces'
import { marketListings, readQuery } from '@/lib/marketListings'
import { listingCardFields } from '@/lib/placeList'

export const dynamic = 'force-dynamic'

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = readQuery(await searchParams)
  const listings = marketListings(await loadPlaceListings(), query).map((listing, index) => {
    const card = listingCardFields(listing)
    return {
      ...card,
      imageUrl: designPhoto(card.imageUrl, propertyPhotos, index),
    }
  })

  return <MapSearch listings={listings} place={query.place || query.city || ''} kind={query.kind} />
}
