import { describe, expect, it } from 'vitest'

import { marketListings } from '@/lib/marketListings'

const lease = {
  slug: 'open-office',
  title: 'Open office',
  kind: 'lease' as const,
  city: 'Glendale',
  availability: 'available',
  robots: 'index',
  sitemap: true,
}

describe('search hide', () => {
  it('drops a canceled listing and keeps past due and coworking', () => {
    const shown = marketListings(
      [
        lease,
        { ...lease, slug: 'canceled-office', subscriptionStatus: 'canceled' },
        { ...lease, slug: 'past-due-office', subscriptionStatus: 'past_due' },
        { ...lease, slug: 'comped-office', subscriptionStatus: 'comped' },
        { ...lease, slug: 'desk', kind: 'coworking', subscriptionStatus: 'canceled', verified: true },
      ],
      {},
    )
    expect(shown.map((listing) => listing.slug)).toEqual(['open-office', 'past-due-office', 'comped-office', 'desk'])
  })
})
