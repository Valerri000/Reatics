import { publicPath } from '@/lib/paths'

export const placeCardLimit = 6

export const emptyPlace = 'No listings yet.'

export const mapLabel = 'View on the map'

export type PlaceKind = 'city' | 'property-type'

export type PlaceListing = {
  slug: string
  title: string
  kind: 'sale' | 'lease' | 'coworking'
  price?: number | null
  street?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  propertyType?: string | null
  imageAlt?: string | null
  imageUrl?: string | null
}

export function listingsForCity<T extends { city?: string | null }>(listings: T[], city: string) {
  return listings.filter((listing) => sameName(listing.city, city)).slice(0, placeCardLimit)
}

export function listingsForType<T extends { propertyType?: string | null }>(listings: T[], type: string) {
  return listings.filter((listing) => sameName(listing.propertyType, type)).slice(0, placeCardLimit)
}

export function reservedMapPath(kind: PlaceKind, name: string) {
  const key = kind === 'city' ? 'city' : 'type'
  return `/map?${key}=${encodeURIComponent(name)}`
}

export function listingCardHref(slug: string) {
  return publicPath('listings', slug)
}

export function listingCityLine(listing: {
  city?: string | null
  state?: string | null
  postalCode?: string | null
}) {
  const place = [listing.city, listing.state].filter((part) => part && part.trim()).join(', ')
  return [place, listing.postalCode].filter((part) => part && part.trim()).join(' ')
}

export function listingCardFields(listing: PlaceListing) {
  return {
    href: listingCardHref(listing.slug),
    imageUrl: listing.imageUrl || '/direction-photo.svg',
    imageAlt: listing.imageAlt || listing.title,
    kind: listing.kind,
    price: listing.price ?? null,
    street: listing.street || '',
    cityLine: listingCityLine(listing),
    propertyType: listing.propertyType || '',
  }
}

export function servePlace(record: { status?: string | null } | null) {
  return record?.status === 'published'
}

function sameName(left?: string | null, right?: string | null) {
  return (left || '').trim().toLowerCase() === (right || '').trim().toLowerCase()
}
