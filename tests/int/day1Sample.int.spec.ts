import { describe, expect, it } from 'vitest'

import { sampleListing } from '@/lib/samples'

describe('sample listing', () => {
  it('stays noindex and keeps its stored point', () => {
    expect(sampleListing.slug).toBe('201-n-brand')
    expect(sampleListing.robots).toBe('noindex')
    expect(sampleListing.sitemap).toBe(false)
    expect(sampleListing.squareFootage).toBe(12500)
    expect(sampleListing.county).toBe('Los Angeles')
    expect(sampleListing.latitude).toBe(34.1478)
    expect(sampleListing.longitude).toBe(-118.2551)
  })
})
