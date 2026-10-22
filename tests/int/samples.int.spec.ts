import { describe, expect, it } from 'vitest'

import { seoFields } from '@/lib/diagram'
import { sampleCity, sampleListing } from '@/lib/samples'

const seoOnRecord = [
  'pageTitle',
  'metaDescription',
  'robots',
  'canonicalUrl',
  'h1',
  'imageAlt',
  'socialTitle',
  'sitemap',
] as const

describe('staging samples', () => {
  it('fills the SEO fields on the sample listing and the sample city', () => {
    for (const field of seoOnRecord) {
      expect(seoFields).toContain(field === 'pageTitle' ? 'pageTitle' : field)
      expect(sampleListing).toHaveProperty(field)
      expect(sampleCity).toHaveProperty(field)
    }
    expect(sampleListing.slug).toBe('201-n-brand')
    expect(sampleListing.robots).toBe('noindex')
    expect(sampleCity.slug).toBe('glendale')
    expect(sampleCity.title).toBe('Glendale')
  })
})
