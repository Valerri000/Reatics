import { filterMapListings, filtersFromQuery } from '@/lib/mapFilters'
import { cityMapPath } from '@/lib/mapShare'
import { marketListings } from '@/lib/marketListings'
import { listingCardHref, listingsForCity, type PlaceListing } from '@/lib/placeList'
import { homepageSearchTarget, searchOpensMap } from '@/lib/searchTarget'

export function openFromCard(slug: string) {
  return listingCardHref(slug)
}

export function openFromGlendale(listings: PlaceListing[], slug: string) {
  const match = listingsForCity(listings, 'Glendale').find((listing) => listing.slug === slug)
  return {
    page: '/glendale',
    map: cityMapPath('Glendale'),
    listing: match ? listingCardHref(match.slug) : null,
  }
}

export function openFromHomepageSearch(
  listings: PlaceListing[],
  fields: { place: string; kind: string; use: string },
  slug: string,
) {
  const map = homepageSearchTarget(fields)
  const query = Object.fromEntries(new URL(map, 'https://18.118.84.127').searchParams)
  const shown = filterMapListings(marketListings(listings, query), filtersFromQuery(query))
  const match = shown.find((listing) => listing.slug === slug)
  return {
    map,
    opensMap: searchOpensMap(map),
    listing: match ? listingCardHref(match.slug) : null,
  }
}
