import { describe, expect, it } from 'vitest'

import {
  listingMeta,
  listingOnMap,
  listingOnSitemap,
  listingRobots,
  publicListing,
  unavailableListing,
} from '@/lib/listingPage'
import { marketListings } from '@/lib/marketListings'

const active = {
  slug: 'indexed-office',
  title: 'Indexed office',
  kind: 'lease' as const,
  city: 'Glendale',
  availability: 'available',
  robots: 'index',
  sitemap: true,
}

const closed = {
  ...active,
  slug: 'closed-office',
  availability: 'unavailable',
  robots: 'index',
  sitemap: true,
  description: 'This text stays off the closed page.',
}

describe('unavailable listing', () => {
  it('stays on its URL, is noindex, and is left off the map and the sitemap', () => {
    expect(listingRobots(closed)).toBe('noindex')
    expect(listingOnMap(closed)).toBe(false)
    expect(listingOnSitemap(closed)).toBe(false)
    expect(listingOnSitemap(active)).toBe(true)
    expect(marketListings([active, closed], {})).toEqual([active])
    const page = publicListing(closed)
    expect(page.unavailable).toBe(true)
    expect(page.slug).toBe('closed-office')
    expect(unavailableListing).toBe('This listing is no longer available.')
    expect(listingMeta(closed).robots).toEqual({ index: false, follow: true })
  })
})
