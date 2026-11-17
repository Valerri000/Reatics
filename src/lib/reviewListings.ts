import { isReviewListing, reviewListingSlugs } from '@/lib/reviewSet'

export { reviewListingSlugs }

export type ReviewListing = {
  slug: string
  availability?: string | null
  robots?: string | null
  sitemap?: boolean | null
}

export function publishedReviewListing<T extends ReviewListing>(listing: T, marked: readonly string[]): T {
  if (!isReviewListing(listing.slug)) return listing
  const approved = marked.some((slug) => slug.trim() === listing.slug)
  if (!approved || listing.availability === 'unavailable') {
    return { ...listing, robots: 'noindex', sitemap: false }
  }
  return { ...listing, robots: 'index', sitemap: true }
}
