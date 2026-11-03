import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('sitemap include', () => {
  it('lists a published record that is set to index and checked for the sitemap', () => {
    expect(
      includeInSitemap({
        collection: 'pages',
        slug: 'about',
        status: 'published',
        robots: 'index',
        sitemap: true,
      }),
    ).toBe(true)
  })
})
