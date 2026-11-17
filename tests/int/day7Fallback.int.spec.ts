import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapVendor } from '@/lib/mapQuote'

describe('Google Maps fallback', () => {
  it('names Google Maps when the quote is refused', () => {
    expect(mapVendor('refused')).toBe('Google Maps')
    const note = readFileSync('docs/phase-c-day-7-mapbox.md', 'utf8')
    expect(note).toContain('If the quote is refused, the fallback is Google Maps.')
  })
})
