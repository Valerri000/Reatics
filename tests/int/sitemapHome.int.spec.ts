import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('homepage sitemap', () => {
  it('keeps the homepage record off /home', () => {
    expect(
      includeInSitemap({
        collection: 'pages',
        slug: 'home',
        status: 'published',
        robots: 'index',
        sitemap: true,
      }),
    ).toBe(false)
  })
})
