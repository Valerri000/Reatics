import Link from 'next/link'
import React from 'react'

import { ListingCard } from '@/components/listing/ListingCard'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { emptyFeatured } from '@/lib/homeListings'
import { listingCardFields, type PlaceListing } from '@/lib/placeList'

export function ResultGrid({ listings }: { listings: PlaceListing[] }) {
  if (listings.length === 0) {
    return <p className="m-0 mt-10 text-base text-ink">{emptyFeatured}</p>
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing, index) => {
        const card = listingCardFields(listing)
        return (
          <ListingCard
            key={listing.slug}
            href={card.href}
            imageUrl={designPhoto(card.imageUrl, propertyPhotos, index)}
            imageAlt={card.imageAlt}
            kind={card.kind}
            price={card.price}
            street={card.street || listing.title}
            cityLine={card.cityLine}
            propertyType={card.propertyType}
          />
        )
      })}
    </div>
  )
}

export function MarketLink({
  href,
  image,
  name,
}: {
  href: string
  image: string
  name: string
}) {
  return (
    <Link href={href} className="group relative block h-64 overflow-hidden rounded-[2rem] no-underline">
      <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
      <span className="absolute bottom-6 left-6 text-2xl font-black text-white">{name}</span>
    </Link>
  )
}
