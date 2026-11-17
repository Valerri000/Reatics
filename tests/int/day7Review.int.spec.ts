import { describe, expect, it } from 'vitest'

import { publishedReviewListing, reviewListingSlugs } from '@/lib/reviewListings'

describe('unmarked review listings', () => {
  it('keeps the review set noindex when none are marked correct', () => {
    const published = reviewListingSlugs.map((slug) =>
      publishedReviewListing({ slug, availability: 'available', robots: 'noindex', sitemap: false }, []),
    )
    expect(published.every((listing) => listing.robots === 'noindex' && listing.sitemap === false)).toBe(true)
    expect(published).toHaveLength(6)
  })
})
