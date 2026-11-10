import { describe, expect, it } from 'vitest'

import { formatListingPrice } from '@/lib/listingPrice'
import { listingAddress, listingDescription, listingH1, listingMeta, listingPriceText } from '@/lib/listingPage'

const office = {
  title: '201 N Brand',
  slug: '201-n-brand',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  city: 'Glendale',
  state: 'CA',
  postalCode: '91203',
  description: 'Office space at 201 N Brand Blvd in Glendale.',
  h1: '201 N Brand',
  pageTitle: 'Office for lease at 201 N Brand',
  metaDescription: 'A sample office listing in Glendale for the staging review.',
  robots: 'index',
  canonicalUrl: '/listings/201-n-brand',
}

describe('listing response', () => {
  it('includes the title, H1, price, address, and description', () => {
    expect(listingH1(office)).toBe('201 N Brand')
    expect(listingPriceText(office)).toBe(formatListingPrice('lease', 4500))
    expect(listingAddress(office)).toBe('201 N Brand Blvd, Glendale, CA 91203')
    expect(listingDescription(office)).toBe('Office space at 201 N Brand Blvd in Glendale.')
    expect(listingMeta(office)).toMatchObject({
      title: 'Office for lease at 201 N Brand',
      description: 'A sample office listing in Glendale for the staging review.',
      alternates: { canonical: '/listings/201-n-brand' },
      robots: { index: true, follow: true },
    })
  })
})
