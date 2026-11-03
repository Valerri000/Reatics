import { describe, expect, it } from 'vitest'

import { sitemapCollections, sitemapPath } from '@/lib/sitemapRecord'

const ready = {
  status: 'published' as const,
  robots: 'index' as const,
  sitemap: true,
}

describe('sitemap paths', () => {
  it('builds the public path for a page, a post, a term, a city, and a property type', () => {
    expect(sitemapPath({ collection: 'pages', slug: 'about', ...ready })).toBe('/about')
    expect(sitemapPath({ collection: 'posts', slug: 'how-to-read-a-listing', ...ready })).toBe(
      '/blog/how-to-read-a-listing',
    )
    expect(sitemapPath({ collection: 'glossary', slug: 'cap-rate', ...ready })).toBe('/glossary/cap-rate')
    expect(sitemapPath({ collection: 'cities', slug: 'glendale', ...ready })).toBe('/glendale')
    expect(sitemapPath({ collection: 'property-types', slug: 'office', ...ready })).toBe('/office')
    expect(sitemapCollections).not.toContain('listings')
  })
})
