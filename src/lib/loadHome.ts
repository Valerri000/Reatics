import { getPayload } from 'payload'

import { cityAreaLinks } from '@/lib/homeAreas'
import { homeListingRecords } from '@/lib/homeListings'
import { homepageCopy, homepageSlug } from '@/lib/homePageCopy'
import { homePostCards } from '@/lib/homePosts'
import { listingCardFields, type PlaceListing } from '@/lib/placeList'
import config from '@/payload.config'
import type { Listing } from '@/payload-types'

export async function loadHome() {
  const payload = await getPayload({ config })
  const [page, cities, posts, listings] = await Promise.all([
    payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: homepageSlug } },
    }),
    payload.find({
      collection: 'cities',
      depth: 0,
      limit: 100,
      overrideAccess: true,
      sort: 'title',
      where: { status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 20,
      overrideAccess: true,
      sort: '-publishedOn',
      where: { status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'listings',
      depth: 1,
      limit: 50,
      overrideAccess: true,
      sort: 'title',
      where: { robots: { equals: 'index' } },
    }),
  ])

  return {
    copy: homepageCopy(page.docs[0] ?? null),
    cities: cityAreaLinks(cities.docs),
    posts: homePostCards(posts.docs),
    listings: homeListingRecords(listings.docs).map((listing) => listingCardFields(toPlaceListing(listing))),
  }
}

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
