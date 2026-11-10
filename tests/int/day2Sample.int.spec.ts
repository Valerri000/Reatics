import { describe, expect, it } from 'vitest'

import { sampleListing } from '@/lib/samples'

describe('sample listing page', () => {
  it('keeps 201 N Brand noindex and fills the page fields', () => {
    expect(sampleListing.slug).toBe('201-n-brand')
    expect(sampleListing.robots).toBe('noindex')
    expect(sampleListing.sitemap).toBe(false)
    expect(sampleListing.availability).toBe('available')
    expect(sampleListing.description).toContain('201 N Brand Blvd')
    expect(sampleListing.brokerEmail).toBe('info@reatics.com')
    expect(sampleListing.availabilities[0]?.suite).toBe('200')
  })
})
