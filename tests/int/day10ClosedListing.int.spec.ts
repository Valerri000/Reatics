import { describe, expect, it } from 'vitest'

import { publishedListingCheck } from '@/lib/phaseCMilestone'

describe('unavailable listing', () => {
  it('stays on its URL, noindex, and off the map and the sitemap', () => {
    expect(
      publishedListingCheck({
        slug: '450-n-brand',
        kind: 'lease',
        title: '450 N Brand',
        metaDescription: 'This listing is no longer available.',
        availability: 'unavailable',
        robots: 'index',
        sitemap: true,
      }),
    ).toEqual({
      path: '/listings/450-n-brand',
      title: '450 N Brand',
      description: 'This listing is no longer available.',
      canonical: '/listings/450-n-brand',
      robots: 'noindex',
      onMap: false,
      onSitemap: false,
    })
  })
})
