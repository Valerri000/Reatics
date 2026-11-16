import { describe, expect, it } from 'vitest'

import { homeListingRecords } from '@/lib/homeListings'

describe('indexed featured listings', () => {
  it('shows listings set to Index and leaves the rest out', () => {
    const shown = homeListingRecords([
      { title: 'Indexed office', slug: 'indexed-office', robots: 'index', availability: 'available' },
      { title: '201 N Brand', slug: '201-n-brand', robots: 'noindex', availability: 'available' },
      { title: 'Closed office', slug: 'closed-office', robots: 'index', availability: 'unavailable' },
    ])
    expect(shown.map((listing) => listing.slug)).toEqual(['indexed-office'])
  })
})
