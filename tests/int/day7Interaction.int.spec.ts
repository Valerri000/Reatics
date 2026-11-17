import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapInteractionFor } from '@/lib/mapQuote'

describe('map interaction', () => {
  it('keeps the same interaction if the quote is refused', () => {
    expect(mapInteractionFor('pending')).toEqual(mapInteractionFor('refused'))
    expect(mapInteractionFor('refused')).toContain('stored coordinates')
    expect(mapInteractionFor('refused')).toContain('no geocoding call on every map move')
    const stage = readFileSync('src/components/market/MapStage.tsx', 'utf8')
    expect(stage).toContain("import('mapbox-gl')")
    expect(stage).not.toContain('google')
  })
})
