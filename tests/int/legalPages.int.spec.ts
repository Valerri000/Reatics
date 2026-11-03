import { describe, expect, it } from 'vitest'

import { isLegalPageSlug, legalPageSeeds, publishedLegalPage } from '@/lib/legalPages'

describe('legal pages', () => {
  it('keeps Terms and Privacy unpublished and noindex until the copy is published', () => {
    expect(legalPageSeeds.map((page) => page.slug)).toEqual(['terms', 'privacy'])
    for (const page of legalPageSeeds) {
      expect(page.status).toBe('draft')
      expect(page.robots).toBe('noindex')
      expect(page.sitemap).toBe(false)
      expect(publishedLegalPage(page.slug, page)).toBe(false)
    }
    expect(isLegalPageSlug('about')).toBe(false)
    expect(publishedLegalPage('terms', { status: 'published' })).toBe(true)
  })
})
