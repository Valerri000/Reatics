import { describe, expect, it } from 'vitest'

import { canonicalUrl, metadataFor, robotsIndex } from '@/lib/pageMeta'

const about = {
  title: 'About Us',
  slug: 'about',
  pageTitle: 'About Reatics',
  metaDescription: 'A commercial real estate listing platform.',
  robots: 'index',
  canonicalUrl: '/about',
}

describe('public page SEO', () => {
  it('reads the browser title and the meta description from the page', () => {
    const meta = metadataFor(about)
    expect(meta.title).toBe('About Reatics')
    expect(meta.description).toBe('A commercial real estate listing platform.')
    expect(metadataFor({ title: 'Services' }).title).toBe('Services')
  })

  it('reads the canonical URL and the index setting', () => {
    expect(canonicalUrl(about)).toBe('/about')
    expect(canonicalUrl({ slug: 'services' })).toBe('/services')
    expect(metadataFor(about).alternates).toEqual({ canonical: '/about' })
    expect(robotsIndex(about)).toBe(true)
    expect(metadataFor(about).robots).toEqual({ index: true, follow: true })
    expect(metadataFor({ ...about, robots: 'noindex' }).robots).toEqual({ index: false, follow: true })
  })
})
