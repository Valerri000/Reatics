import { describe, expect, it } from 'vitest'

import { openFromGlendale } from '@/lib/reviewClicks'
import type { PlaceListing } from '@/lib/placeList'

const listings = [
  { slug: '201-n-brand', title: '201 N Brand', kind: 'lease', city: 'Glendale', propertyType: 'Office' },
  { slug: '1000-e-walnut', title: '1000 E Walnut', kind: 'coworking', city: 'Pasadena', propertyType: '1-2' },
] as PlaceListing[]

describe('open a listing from Glendale', () => {
  it('opens the Glendale card and the filtered map', () => {
    expect(openFromGlendale(listings, '201-n-brand')).toEqual({
      page: '/glendale',
      map: '/map?city=Glendale',
      listing: '/listings/201-n-brand',
    })
    expect(openFromGlendale(listings, '1000-e-walnut').listing).toBeNull()
  })
})
