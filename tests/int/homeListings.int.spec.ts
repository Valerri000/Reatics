import { describe, expect, it } from 'vitest'

import { emptyFeatured, featuredCardClass, homeListingRecords } from '@/lib/homeListings'

describe('homepage featured listings', () => {
  it('keeps indexed listings and leaves the rest out', () => {
    const shown = homeListingRecords([
      { title: '201 N Brand', slug: '201-n-brand', robots: 'noindex' },
      { title: 'Indexed office', slug: 'indexed-office', robots: 'index' },
      { title: ' ', slug: 'blank', robots: 'index' },
    ])
    expect(shown.map((listing) => listing.slug)).toEqual(['indexed-office'])
    expect(homeListingRecords([])).toEqual([])
    expect(emptyFeatured).toBe('No listings yet.')
  })

  it('hides the later cards on a narrow screen', () => {
    expect(featuredCardClass(0)).toBe('')
    expect(featuredCardClass(3)).toContain('md:block')
    expect(featuredCardClass(4)).toContain('xl:block')
  })
})
