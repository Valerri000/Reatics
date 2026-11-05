import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { ListingView } from '@/components/listing/ListingView'
import { loadListing } from '@/lib/loadPlaces'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const listing = await loadListing(slug)
  if (!listing) return {}
  return {
    title: listing.pageTitle || listing.title,
    description: listing.metaDescription || undefined,
  }
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const record = await loadListing(slug)
  if (!record) notFound()
  const photo = record.photo
  return (
    <ListingView
      listing={{
        slug: record.slug,
        title: record.title,
        kind: record.kind,
        price: record.price,
        street: record.street,
        city: record.city,
        state: record.state,
        postalCode: record.postalCode,
        propertyType: record.propertyType,
        imageAlt: record.imageAlt,
        imageUrl: photo && typeof photo === 'object' && photo.url ? photo.url : null,
      }}
    />
  )
}
