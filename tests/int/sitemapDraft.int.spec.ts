import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('sitemap draft', () => {
  it('keeps a draft off the sitemap', () => {
    expect(
      includeInSitemap({
        collection: 'posts',
        slug: 'office-tour-notes',
        status: 'draft',
        robots: 'index',
        sitemap: true,
      }),
    ).toBe(false)
  })
})
