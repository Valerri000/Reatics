import { describe, expect, it } from 'vitest'

import { mapQuoteStatus, mapVendor } from '@/lib/mapQuote'

describe('pending Mapbox quote', () => {
  it('keeps Mapbox until the commercial quote arrives', () => {
    expect(mapQuoteStatus).toBe('pending')
    expect(mapVendor('pending')).toBe('Mapbox')
    expect(mapVendor('accepted')).toBe('Mapbox')
  })
})
