import { describe, expect, it } from 'vitest'

import { unavailableListingReview } from '@/lib/unavailableReview'

describe('unavailable listing on the sitemap', () => {
  it('stays off the sitemap', () => {
    expect(
      unavailableListingReview({
        slug: '201-n-brand',
        availability: 'unavailable',
        robots: 'index',
        sitemap: true,
      }).onSitemap,
    ).toBe(false)
    expect(
      unavailableListingReview({
        slug: '201-n-brand',
        availability: 'available',
        robots: 'index',
        sitemap: true,
      }).onSitemap,
    ).toBe(true)
  })
})
