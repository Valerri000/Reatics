import { describe, expect, it } from 'vitest'

import { unavailableListingReview } from '@/lib/unavailableReview'

describe('unavailable listing on the map', () => {
  it('stays off the map', () => {
    expect(
      unavailableListingReview({
        slug: '201-n-brand',
        availability: 'unavailable',
        robots: 'index',
        sitemap: true,
      }).onMap,
    ).toBe(false)
    expect(
      unavailableListingReview({
        slug: '201-n-brand',
        availability: 'available',
        robots: 'index',
        sitemap: true,
      }).onMap,
    ).toBe(true)
  })
})
