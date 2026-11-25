import { describe, expect, it } from 'vitest'

import { brokerPageListings } from '@/lib/brokerListings'

describe('broker page listings', () => {
  it('drops a canceled listing and keeps the same slug when the subscription returns', () => {
    const hidden = brokerPageListings([
      { slug: 'open-office', kind: 'lease', availability: 'available', subscriptionStatus: 'active' },
      { slug: 'canceled-office', kind: 'lease', availability: 'available', subscriptionStatus: 'canceled' },
      { slug: 'desk', kind: 'coworking', availability: 'available', subscriptionStatus: 'canceled', verified: true },
    ])
    expect(hidden.map((listing) => listing.slug)).toEqual(['open-office', 'desk'])
    const restored = brokerPageListings([
      { slug: 'canceled-office', kind: 'lease', availability: 'available', subscriptionStatus: 'active' },
    ])
    expect(restored.map((listing) => listing.slug)).toEqual(['canceled-office'])
  })
})
