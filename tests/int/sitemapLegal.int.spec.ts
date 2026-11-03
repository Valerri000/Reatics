import { describe, expect, it } from 'vitest'

import { legalPageSeeds } from '@/lib/legalPages'
import { sitemapPath } from '@/lib/sitemapRecord'

describe('sitemap legal pages', () => {
  it('keeps unpublished Terms and Privacy off the sitemap', () => {
    for (const page of legalPageSeeds) {
      expect(
        sitemapPath({
          collection: 'pages',
          slug: page.slug,
          status: page.status,
          robots: page.robots,
          sitemap: page.sitemap,
        }),
      ).toBeNull()
    }
  })

  it('lists Terms after the record is published, set to index, and checked', () => {
    expect(
      sitemapPath({
        collection: 'pages',
        slug: 'terms',
        status: 'published',
        robots: 'index',
        sitemap: true,
      }),
    ).toBe('/terms')
  })
})
