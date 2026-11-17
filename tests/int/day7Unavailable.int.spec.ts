import { describe, expect, it } from 'vitest'

import { publishedReviewListing } from '@/lib/reviewListings'

describe('unavailable review listings', () => {
  it('stays noindex even when the slug is marked correct', () => {
    const closed = publishedReviewListing(
      { slug: '201-n-brand', availability: 'unavailable', robots: 'index', sitemap: true },
      ['201-n-brand'],
    )
    expect(closed).toMatchObject({ robots: 'noindex', sitemap: false })
  })
})
