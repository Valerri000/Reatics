import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { ListingView } from '@/components/listing/ListingView'
import { ReportForm } from '@/components/listing/ReportForm'
import { listingMeta, publicListing } from '@/lib/listingPage'
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
  return listingMeta(listing)
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const record = await loadListing(slug)
  if (!record) notFound()
  const photo = record.photo
  const listing = publicListing({
    ...record,
    imageUrl: photo && typeof photo === 'object' && photo.url ? photo.url : null,
  })
  return (
    <ListingView
      listing={listing}
      report={listing.unavailable || record.id == null ? null : <ReportForm listingId={record.id} />}
    />
  )
}
