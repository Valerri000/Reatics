import { describe, expect, it } from 'vitest'

import { storedMapPins } from '@/lib/mapPins'

describe('stored map pins', () => {
  it('reads coordinates saved on the listing and skips an address without them', () => {
    const pins = storedMapPins([
      { slug: '201-n-brand', latitude: 34.1478, longitude: -118.2551 },
      { slug: 'no-point' },
    ])
    expect(pins).toEqual([{ slug: '201-n-brand', latitude: 34.1478, longitude: -118.2551 }])
  })
})
