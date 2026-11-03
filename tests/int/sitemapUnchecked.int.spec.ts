import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('sitemap checkbox', () => {
  it('leaves out a record whose sitemap box is unchecked', () => {
    expect(
      includeInSitemap({
        collection: 'cities',
        slug: 'glendale',
        status: 'published',
        robots: 'index',
        sitemap: false,
      }),
    ).toBe(false)
  })
})
