'use client'

import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { HomeSection } from '@/components/home/HomeSection'
import { ListingCard } from '@/components/listing/ListingCard'
import { directionListings } from '@/lib/directionListings'

function cardClass(index: number) {
  if (index >= 4) return 'hidden xl:block'
  if (index === 3) return 'hidden md:block'
  return ''
}

export function FeaturedListings() {
  const auth = useAuth()

  return (
    <HomeSection id="featured" tone="charcoal">
      <h2 className="m-0 text-[28px] font-extrabold leading-9 text-white xl:text-title">
        Featured commercial properties
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {directionListings.map((listing, index) => (
          <div key={`${listing.kind}-${listing.street}`} className={cardClass(index)}>
            <ListingCard
              href={listing.href}
              imageUrl={listing.imageUrl}
              imageAlt={listing.imageAlt}
              kind={listing.kind}
              price={listing.price}
              rate={listing.rate}
              street={listing.street}
              cityLine={listing.cityLine}
              propertyType={listing.propertyType}
              signedIn={Boolean(auth.user)}
              onSignIn={auth.openSignIn}
            />
          </div>
        ))}
      </div>
    </HomeSection>
  )
}
