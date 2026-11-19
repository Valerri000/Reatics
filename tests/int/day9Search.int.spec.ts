import { describe, expect, it } from 'vitest'

import { openFromHomepageSearch } from '@/lib/reviewClicks'
import type { PlaceListing } from '@/lib/placeList'

const listings = [
  {
    slug: '201-n-brand',
    title: '201 N Brand',
    kind: 'lease',
    city: 'Glendale',
    state: 'CA',
    street: '201 N Brand Blvd',
    propertyType: 'Office',
    availability: 'available',
  },
  {
    slug: '700-s-flower',
    title: '700 S Flower',
    kind: 'sale',
    city: 'Los Angeles',
    state: 'CA',
    street: '700 S Flower St',
    propertyType: 'Retail',
    availability: 'available',
  },
] as PlaceListing[]

describe('open a listing from the homepage search', () => {
  it('opens the map and then the matching card', () => {
    const opened = openFromHomepageSearch(listings, { place: 'Glendale', kind: 'lease', use: 'Office' }, '201-n-brand')
    expect(opened.opensMap).toBe(true)
    expect(opened.map.startsWith('/map?')).toBe(true)
    expect(opened.map).toContain('place=Glendale')
    expect(opened.map).toContain('kind=lease')
    expect(opened.listing).toBe('/listings/201-n-brand')
    expect(openFromHomepageSearch(listings, { place: 'Glendale', kind: 'lease', use: 'Office' }, '700-s-flower').listing).toBeNull()
  })
})
