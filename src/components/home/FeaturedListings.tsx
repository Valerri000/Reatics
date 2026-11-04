'use client'

import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { HomeSection } from '@/components/home/HomeSection'
import { ListingCard } from '@/components/listing/ListingCard'
import { emptyFeatured, featuredCardClass } from '@/lib/homeListings'
import { listingCardFields } from '@/lib/placeList'

type FeaturedCard = ReturnType<typeof listingCardFields>

export function FeaturedListings({ listings }: { listings: FeaturedCard[] }) {
  const auth = useAuth()

  return (
    <HomeSection id="featured" tone="charcoal">
      <h2 className="m-0 text-[28px] font-extrabold leading-9 text-white xl:text-title">
        Featured commercial properties
      </h2>
      {listings.length === 0 ? (
        <p className="m-0 mt-8 text-[16px] font-light leading-6 text-white md:text-body">{emptyFeatured}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing, index) => (
            <div key={listing.href} className={featuredCardClass(index)}>
              <ListingCard
                href={listing.href}
                imageUrl={listing.imageUrl}
                imageAlt={listing.imageAlt}
                kind={listing.kind}
                price={listing.price}
                street={listing.street}
                cityLine={listing.cityLine}
                propertyType={listing.propertyType}
                signedIn={Boolean(auth.user)}
                onSignIn={auth.openSignIn}
              />
            </div>
          ))}
        </div>
      )}
    </HomeSection>
  )
}
