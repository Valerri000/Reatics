import { describe, expect, it } from 'vitest'

import { estimateFirst, frameCorrections } from '@/lib/phaseBCorrections'

describe('frame corrections', () => {
  it('keeps the corrections in priority order', () => {
    expect(frameCorrections.map((item) => item.priority)).toEqual([1, 2, 3, 4])
    expect(frameCorrections.map((item) => item.id)).toEqual([
      'public-pages',
      'legal-pages',
      'missing-page',
      'homepage',
    ])
  })

  it('marks work outside these pages for an estimate', () => {
    expect(estimateFirst).toEqual(['live-map', 'listing-page', 'broker-directory'])
  })
})
