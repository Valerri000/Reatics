import { describe, expect, it } from 'vitest'

import { geocodesOnMove, pinsAfterMove } from '@/lib/mapMove'

describe('map move', () => {
  it('keeps the stored pins and skips a geocoding call', () => {
    const pins = [{ slug: '201-n-brand', latitude: 34.1478, longitude: -118.2551 }]
    expect(geocodesOnMove('pan')).toBe(false)
    expect(geocodesOnMove('zoom')).toBe(false)
    expect(pinsAfterMove(pins)).toBe(pins)
  })
})
