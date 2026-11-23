import { describe, expect, it } from 'vitest'

import { publicPurchaseAllowed } from '@/lib/addonPurchase'

describe('add-on purchase', () => {
  it('keeps add-ons off public checkout', () => {
    expect(publicPurchaseAllowed('featured-listing')).toBe(false)
    expect(publicPurchaseAllowed('search-ad')).toBe(false)
    expect(publicPurchaseAllowed('email-campaign')).toBe(false)
    expect(publicPurchaseAllowed('credit-check-fee')).toBe(false)
    expect(publicPurchaseAllowed('e-signature-fee')).toBe(false)
    expect(publicPurchaseAllowed('broker')).toBe(true)
    expect(publicPurchaseAllowed('space-seeker')).toBe(false)
  })
})
