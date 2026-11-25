import { describe, expect, it } from 'vitest'

import { homeListingRecords } from '@/lib/homeListings'

describe('featured hide', () => {
  it('drops a canceled listing from the featured list', () => {
    const shown = homeListingRecords([
      { title: 'Open office', slug: 'open-office', robots: 'index', availability: 'available', kind: 'lease', subscriptionStatus: 'active' },
      { title: 'Canceled office', slug: 'canceled-office', robots: 'index', availability: 'available', kind: 'lease', subscriptionStatus: 'canceled' },
      { title: 'Past due office', slug: 'past-due-office', robots: 'index', availability: 'available', kind: 'lease', subscriptionStatus: 'past_due' },
      { title: 'Desk', slug: 'desk', robots: 'index', availability: 'available', kind: 'coworking', subscriptionStatus: 'canceled', verified: true },
    ])
    expect(shown.map((listing) => listing.slug)).toEqual(['open-office', 'past-due-office', 'desk'])
  })
})
