import { coworkingPhone, listingBroker, listingMeta, listingOnMap, listingOnSitemap, listingRobots, type ListingSource } from '@/lib/listingPage'
import { launchFilters, typesForKind } from '@/lib/mapFilters'
import { geocodesOnMove } from '@/lib/mapMove'
import { launchMapCharges, mapQuoteStatus } from '@/lib/mapQuote'
import { cityMapPath, typeMapPath } from '@/lib/mapShare'
import { mapCluster, mapRobots, mapStyles } from '@/lib/mapStage'
import { homepageSearchTarget, searchCallsMapbox, searchOpensMap } from '@/lib/searchTarget'

export function publishedListingCheck(listing: ListingSource) {
  const slug = listing.slug?.trim() || ''
  const meta = listingMeta(listing)
  return {
    path: slug ? `/listings/${slug}` : '',
    title: String(meta.title || ''),
    description: meta.description || '',
    canonical: meta.alternates?.canonical || '',
    robots: listingRobots(listing),
    onMap: listingOnMap(listing),
    onSitemap: listingOnSitemap(listing),
  }
}

export function launchFilterLists() {
  return {
    filters: launchFilters,
    sale: typesForKind('sale'),
    lease: typesForKind('lease'),
    coworking: typesForKind('coworking'),
  }
}

export function mapScreen() {
  return {
    index: mapRobots.index,
    follow: mapRobots.follow,
    cluster: mapCluster.cluster,
    satellite: mapStyles.satellite.includes('satellite'),
    glendale: cityMapPath('Glendale'),
    office: typeMapPath('Office'),
  }
}

export function coworkingShowsOfficePhone(listing: ListingSource) {
  if (listing.kind !== 'coworking') return ''
  if (listingBroker(listing)) return ''
  return coworkingPhone
}

export function homepageOpensMap(fields: { place: string; kind: string; use: string }) {
  const target = homepageSearchTarget(fields)
  return {
    target,
    opensMap: searchOpensMap(target),
    callsMapbox: searchCallsMapbox(target),
  }
}

export function moveSkipsGeocode() {
  return geocodesOnMove('pan') === false && geocodesOnMove('zoom') === false
}

export function mapboxNoteReady() {
  return mapQuoteStatus === 'pending' && launchMapCharges.early === '$0 to $50' && launchMapCharges.busy === '$150 to $400'
}
