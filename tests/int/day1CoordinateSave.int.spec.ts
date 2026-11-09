import { describe, expect, it } from 'vitest'

import { pointSavedWithListing, readStoredPoint } from '@/lib/listingCoordinates'

describe('listing coordinates', () => {
  it('stores a known address when the listing is saved', () => {
    const saved = pointSavedWithListing({ street: '201 N Brand Blvd', city: 'Glendale' })
    expect(saved.latitude).toBe(34.1478)
    expect(saved.longitude).toBe(-118.2551)
  })

  it('keeps coordinates the editor already entered', () => {
    const saved = pointSavedWithListing({
      street: '201 N Brand Blvd',
      city: 'Glendale',
      latitude: 1,
      longitude: 2,
    })
    expect(saved.latitude).toBe(1)
    expect(saved.longitude).toBe(2)
  })

  it('reads only stored coordinates when the map moves', () => {
    expect(readStoredPoint({ street: '201 N Brand Blvd', city: 'Glendale' })).toBeNull()
    expect(readStoredPoint({ latitude: 34.1478, longitude: -118.2551 })).toEqual({
      latitude: 34.1478,
      longitude: -118.2551,
    })
  })
})
