import { describe, expect, it } from 'vitest'

import { includeInSitemap } from '@/lib/sitemapRecord'

describe('sitemap hide', () => {
  it('drops a canceled listing and keeps it when the subscription is active again', () => {
    const canceled = {
      collection: 'listings' as const,
      slug: 'brand-office',
      robots: 'index' as const,
      sitemap: true,
      availability: 'available' as const,
      kind: 'lease',
      subscriptionStatus: 'canceled',
    }
    expect(includeInSitemap(canceled)).toBe(false)
    expect(includeInSitemap({ ...canceled, subscriptionStatus: 'active' })).toBe(true)
    expect(includeInSitemap({ ...canceled, kind: 'coworking', verified: true })).toBe(true)
    expect(includeInSitemap({ ...canceled, kind: 'coworking', verified: false })).toBe(false)
  })
})
