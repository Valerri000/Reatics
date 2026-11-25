import { describe, expect, it } from 'vitest'

import { listingMeta, listingOnMap, listingOnSitemap, listingRobots, publicListing, unavailableListing } from '@/lib/listingPage'

const open = {
  slug: 'brand-office',
  title: 'Brand office',
  kind: 'lease' as const,
  city: 'Glendale',
  availability: 'available',
  robots: 'index',
  sitemap: true,
  subscriptionStatus: 'active',
}

describe('canceled listing page', () => {
  it('keeps the URL, says the listing is no longer available, and is noindex', () => {
    const canceled = { ...open, subscriptionStatus: 'canceled' }
    const restored = { ...canceled, subscriptionStatus: 'active' }
    const page = publicListing(canceled)
    expect(page.slug).toBe('brand-office')
    expect(page.unavailable).toBe(true)
    expect(unavailableListing).toBe('This listing is no longer available.')
    expect(listingRobots(canceled)).toBe('noindex')
    expect(listingMeta(canceled).robots).toEqual({ index: false, follow: true })
    expect(listingOnMap(canceled)).toBe(false)
    expect(listingOnSitemap(canceled)).toBe(false)
    expect(publicListing(restored).unavailable).toBe(false)
    expect(publicListing(restored).slug).toBe('brand-office')
    expect(listingOnMap(restored)).toBe(true)
    expect(listingOnSitemap(restored)).toBe(true)
  })
})
