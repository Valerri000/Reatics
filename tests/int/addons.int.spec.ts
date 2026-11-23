import { describe, expect, it } from 'vitest'

import { addonById, addons } from '@/lib/addons'

describe('inactive add-ons', () => {
  it('reserves the five future products as inactive', () => {
    expect(addons.map((addon) => addon.id)).toEqual([
      'featured-listing',
      'search-ad',
      'email-campaign',
      'credit-check-fee',
      'e-signature-fee',
    ])
    expect(addons.every((addon) => addon.active === false && addon.publicPurchase === false)).toBe(true)
    expect(addonById('featured-listing')?.name).toBe('Featured listing')
    expect(addonById('missing')).toBeNull()
  })
})
