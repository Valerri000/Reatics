import { listingUnavailable } from '@/lib/listingPage'
import type { ListingVisibilityInput } from '@/lib/listingVisibility'

export function brokerPageListings<T extends ListingVisibilityInput & { slug?: string | null }>(listings: T[]) {
  return listings.filter((listing) => Boolean(listing.slug?.trim()) && !listingUnavailable(listing))
}
