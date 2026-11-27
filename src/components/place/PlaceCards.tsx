import React from 'react'

import { SavedListingCard } from '@/components/listing/SavedListingCard'
import { listingCardFields, type PlaceListing } from '@/lib/placeList'

export function PlaceCards({ listings }: { listings: PlaceListing[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => {
        const card = listingCardFields(listing)
        return (
          <SavedListingCard
            key={listing.slug}
            href={card.href}
            imageUrl={card.imageUrl}
            imageAlt={card.imageAlt}
            kind={card.kind}
            price={card.price}
            street={card.street}
            cityLine={card.cityLine}
            propertyType={card.propertyType}
          />
        )
      })}
    </div>
  )
}
