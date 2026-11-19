import { describe, expect, it } from 'vitest'

import { unavailableListingReview } from '@/lib/unavailableReview'

describe('unavailable listing URL', () => {
  it('still answers at the listing URL', () => {
    const review = unavailableListingReview({
      slug: '201-n-brand',
      availability: 'unavailable',
      robots: 'noindex',
      sitemap: false,
    })
    expect(review.answers).toBe(true)
    expect(review.url).toBe('/listings/201-n-brand')
    expect(review.onMap).toBe(false)
    expect(review.onSitemap).toBe(false)
  })
})
