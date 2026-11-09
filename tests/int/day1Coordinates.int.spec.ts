import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'

describe('stored listing coordinates', () => {
  it('keeps latitude and longitude on the listing record', () => {
    const latitude = Listings.fields.find((item) => 'name' in item && item.name === 'latitude')
    const longitude = Listings.fields.find((item) => 'name' in item && item.name === 'longitude')
    expect(latitude).toMatchObject({ type: 'number' })
    expect(longitude).toMatchObject({ type: 'number' })
  })
})
