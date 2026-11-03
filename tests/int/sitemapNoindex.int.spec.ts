import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('sitemap noindex', () => {
  it('keeps a noindex record off the sitemap', () => {
    expect(
      includeInSitemap({
        collection: 'pages',
        slug: 'about',
        status: 'published',
        robots: 'noindex',
        sitemap: true,
      }),
    ).toBe(false)
  })
})
