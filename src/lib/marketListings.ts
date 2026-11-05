import type { PlaceListing } from '@/lib/placeList'

export type MarketQuery = {
  place?: string
  kind?: string
  use?: string
  city?: string
  type?: string
}

export function readQuery(source: Record<string, string | string[] | undefined>): MarketQuery {
  return {
    place: first(source.place),
    kind: first(source.kind),
    use: first(source.use),
    city: first(source.city),
    type: first(source.type),
  }
}

export function marketListings(listings: PlaceListing[], query: MarketQuery) {
  return listings.filter((listing) => matches(listing, query))
}

function matches(listing: PlaceListing, query: MarketQuery) {
  if (query.kind === 'commercial' && listing.kind === 'coworking') return false
  if (query.kind && query.kind !== 'all' && query.kind !== 'commercial' && listing.kind !== query.kind) {
    return false
  }
  if (query.use && query.use !== 'all' && !/^\d/.test(query.use)) {
    const type = (listing.propertyType || '').toLowerCase()
    if (!type.includes(query.use.toLowerCase())) return false
  }
  const city = query.city || query.place
  if (city && !haystack(listing).includes(city.toLowerCase())) return false
  if (query.type && !(listing.propertyType || '').toLowerCase().includes(query.type.toLowerCase())) return false
  return true
}

function haystack(listing: PlaceListing) {
  return [listing.city, listing.state, listing.postalCode, listing.street, listing.title]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function first(value: string | string[] | undefined) {
  const text = Array.isArray(value) ? value[0] : value
  const clean = text?.trim()
  return clean || undefined
}
