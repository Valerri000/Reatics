import { describe, expect, it } from 'vitest'

import { publishedReviewListing } from '@/lib/reviewListings'

describe('marked review listings', () => {
  it('indexes only the listing marked correct', () => {
    const marked = publishedReviewListing(
      { slug: '201-n-brand', availability: 'available', robots: 'noindex', sitemap: false },
      ['201-n-brand'],
    )
    const waiting = publishedReviewListing(
      { slug: '450-n-brand', availability: 'available', robots: 'noindex', sitemap: false },
      ['201-n-brand'],
    )
    expect(marked).toMatchObject({ robots: 'index', sitemap: true })
    expect(waiting).toMatchObject({ robots: 'noindex', sitemap: false })
  })
})
