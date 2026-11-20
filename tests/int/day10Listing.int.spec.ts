import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { publishedListingCheck } from '@/lib/phaseCMilestone'

const page = readFileSync('src/app/(frontend)/listings/[slug]/page.tsx', 'utf8')

describe('published listing', () => {
  it('puts the SEO fields in the first response', () => {
    expect(page).toContain('generateMetadata')
    expect(page).toContain('return listingMeta(listing)')
    expect(
      publishedListingCheck({
        slug: '201-n-brand',
        kind: 'lease',
        title: '201 N Brand',
        pageTitle: '201 N Brand office for lease',
        metaDescription: 'Office space for lease in Glendale.',
        canonicalUrl: '/listings/201-n-brand',
        availability: 'available',
        robots: 'index',
        sitemap: true,
      }),
    ).toEqual({
      path: '/listings/201-n-brand',
      title: '201 N Brand office for lease',
      description: 'Office space for lease in Glendale.',
      canonical: '/listings/201-n-brand',
      robots: 'index',
      onMap: true,
      onSitemap: true,
    })
  })
})
