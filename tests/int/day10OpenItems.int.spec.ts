import { describe, expect, it } from 'vitest'

import { phaseCOpenItems } from '@/lib/phaseCOpen'

describe('phase C open items', () => {
  it('lists the quote, samples, GitHub, legal copy, and email', () => {
    expect(phaseCOpenItems.map((item) => item.id)).toEqual([
      'mapbox-quote',
      'sample-listings',
      'github',
      'terms',
      'privacy',
      'contact-email',
    ])
    expect(phaseCOpenItems.find((item) => item.id === 'terms')?.label).toContain('unpublished and noindex')
    expect(phaseCOpenItems.find((item) => item.id === 'privacy')?.label).toContain('unpublished and noindex')
    expect(phaseCOpenItems.find((item) => item.id === 'contact-email')?.label).toContain('not connected')
  })
})
