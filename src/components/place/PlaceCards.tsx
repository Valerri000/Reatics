'use client'

import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { ListingCard } from '@/components/listing/ListingCard'
import { listingCardFields, type PlaceListing } from '@/lib/placeList'

export function PlaceCards({ listings }: { listings: PlaceListing[] }) {
  const auth = useAuth()
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => {
        const card = listingCardFields(listing)
        return (
          <ListingCard
            key={listing.slug}
            href={card.href}
            imageUrl={card.imageUrl}
            imageAlt={card.imageAlt}
            kind={card.kind}
            price={card.price}
            street={card.street}
            cityLine={card.cityLine}
            propertyType={card.propertyType}
            signedIn={Boolean(auth.user)}
            onSignIn={auth.openSignIn}
          />
        )
      })}
    </div>
  )
}
