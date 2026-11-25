import { describe, expect, it } from 'vitest'

import { listingLeftPublic } from '@/lib/listingVisibility'

describe('listing visibility', () => {
  it('hides a canceled listing and keeps past due, comped, active, and coworking', () => {
    expect(listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'canceled' })).toBe(true)
    expect(listingLeftPublic({ kind: 'sale', availability: 'available', subscriptionStatus: 'past_due' })).toBe(false)
    expect(listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'comped' })).toBe(false)
    expect(listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'active' })).toBe(false)
    expect(
      listingLeftPublic({
        kind: 'coworking',
        availability: 'available',
        subscriptionStatus: 'canceled',
        verified: true,
        published: true,
      }),
    ).toBe(false)
    expect(listingLeftPublic({ kind: 'coworking', availability: 'available', verified: false, published: true })).toBe(
      true,
    )
    expect(listingLeftPublic({ kind: 'coworking', availability: 'available', verified: true, published: false })).toBe(
      true,
    )
    expect(listingLeftPublic({ kind: 'coworking', availability: 'unavailable', verified: true })).toBe(true)
  })
})
