import { listingOnMap, listingOnSitemap } from '@/lib/listingPage'
import { listingCardHref } from '@/lib/placeList'
import { includeInSitemap } from '@/lib/sitemapRecord'

export function unavailableListingReview(listing: {
  slug: string
  availability?: string | null
  robots?: string | null
  sitemap?: boolean | null
}) {
  const record = {
    collection: 'listings' as const,
    slug: listing.slug,
    availability: listing.availability,
    robots: listing.robots,
    sitemap: listing.sitemap,
  }
  return {
    onMap: listingOnMap(listing),
    onSitemap: listingOnSitemap(listing) && includeInSitemap(record) === true,
    url: listing.slug.trim() ? listingCardHref(listing.slug) : '',
    answers: Boolean(listing.slug.trim()),
  }
}
