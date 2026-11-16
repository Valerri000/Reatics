import { describe, expect, it } from 'vitest'

import { publicSitemapPaths, sitemapPath } from '@/lib/sitemapRecord'

const ready = {
  status: 'published' as const,
  robots: 'index' as const,
  sitemap: true,
}

describe('listing sitemap', () => {
  it('includes an indexable listing and leaves out the map', () => {
    expect(
      sitemapPath({ collection: 'listings', slug: 'indexed-office', ...ready, availability: 'available' }),
    ).toBe('/listings/indexed-office')
    expect(
      sitemapPath({ collection: 'listings', slug: 'closed-office', ...ready, availability: 'unavailable' }),
    ).toBeNull()
    expect(
      sitemapPath({ collection: 'listings', slug: 'quiet-office', ...ready, robots: 'noindex', availability: 'available' }),
    ).toBeNull()
    expect(publicSitemapPaths(['/about', '/listings/indexed-office', '/map', '/map'])).toEqual([
      '/about',
      '/listings/indexed-office',
    ])
  })
})
