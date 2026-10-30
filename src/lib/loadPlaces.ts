import { cache } from 'react'
import { getPayload } from 'payload'

import type { PlaceListing } from '@/lib/placeList'
import config from '@/payload.config'
import type { City, Listing, PropertyType } from '@/payload-types'

export const loadPublishedCity = cache(async (slug: string): Promise<City | null> => {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'cities',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
  })
  return found.docs[0] ?? null
})

export const loadPublishedPropertyType = cache(async (slug: string): Promise<PropertyType | null> => {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'property-types',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
  })
  return found.docs[0] ?? null
})

export const loadPlaceListings = cache(async (): Promise<PlaceListing[]> => {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'listings',
    depth: 1,
    limit: 50,
    overrideAccess: true,
    sort: 'title',
  })
  return found.docs.map(toPlaceListing)
})

function toPlaceListing(listing: Listing): PlaceListing {
  const photo = listing.photo
  const imageUrl = photo && typeof photo === 'object' && photo.url ? photo.url : null
  return {
    slug: listing.slug,
    title: listing.title,
    kind: listing.kind,
    price: listing.price,
    street: listing.street,
    city: listing.city,
    state: listing.state,
    postalCode: listing.postalCode,
    propertyType: listing.propertyType,
    imageAlt: listing.imageAlt,
    imageUrl,
  }
}
