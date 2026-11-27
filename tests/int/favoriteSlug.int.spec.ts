import { describe, expect, it } from 'vitest'

import { listingSlugFromHref } from '@/lib/favoriteSlug'

describe('favorite slug', () => {
  it('reads the listing from the card link', () => {
    expect(listingSlugFromHref('/listings/201-n-brand')).toBe('201-n-brand')
    expect(listingSlugFromHref('/listings/201-n-brand?saved=1')).toBe('201-n-brand')
    expect(listingSlugFromHref('/map')).toBe('')
    expect(listingSlugFromHref('/listings/Office')).toBe('')
  })
})
