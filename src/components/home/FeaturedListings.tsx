'use client'

import Link from 'next/link'
import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { HomeSection } from '@/components/home/HomeSection'
import { ListingCard } from '@/components/listing/ListingCard'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { emptyFeatured, featuredCardClass } from '@/lib/homeListings'
import { listingCardFields } from '@/lib/placeList'

type FeaturedCard = ReturnType<typeof listingCardFields>

export function FeaturedListings({ listings }: { listings: FeaturedCard[] }) {
  const auth = useAuth()

  return (
    <HomeSection id="featured">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="m-0 text-3xl font-bold text-ink">Featured commercial properties</h2>
            <p className="m-0 mt-2 text-slate">Hand-picked listings for top-tier office and retail space.</p>
          </div>
          <Link href="/featured" className="shrink-0 text-base font-semibold text-brand hover:underline">
            View all listings
          </Link>
        </div>
        {listings.length === 0 ? (
          <div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {propertyPhotos.map((photo) => (
                <div key={photo} className="h-60 overflow-hidden rounded-xl border border-line">
                  <img src={photo} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <p className="m-0 mt-8 text-base leading-7 text-ink">{emptyFeatured}</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing, index) => (
              <div key={listing.href} className={featuredCardClass(index)}>
                <ListingCard
                  href={listing.href}
                  imageUrl={designPhoto(listing.imageUrl, propertyPhotos, index)}
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
      </div>
    </HomeSection>
  )
}
