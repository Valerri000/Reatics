'use client'

import React from 'react'

import { useOptionalAuth } from '@/components/auth/AuthProvider'
import { ListingCard } from '@/components/listing/ListingCard'
import { saveHeart } from '@/lib/saveHeart'
import type { ListingKind } from '@/lib/listingPrice'

export function SavedListingCard({
  href,
  imageUrl,
  imageAlt,
  kind,
  price,
  street,
  cityLine,
  propertyType,
  tone,
}: {
  href: string
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  price: number | null
  street: string
  cityLine: string
  propertyType: string
  tone?: 'red'
}) {
  const auth = useOptionalAuth()
  return (
    <ListingCard
      href={href}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      kind={kind}
      price={price}
      street={street}
      cityLine={cityLine}
      propertyType={propertyType}
      tone={tone}
      signedIn={Boolean(auth?.user)}
      onSignIn={() => auth?.openSignIn()}
      onFavorite={() => {
        void saveHeart(href)
      }}
    />
  )
}
