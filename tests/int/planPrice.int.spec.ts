import { describe, expect, it } from 'vitest'

import { planById } from '@/lib/plans'
import { priceLabel } from '@/lib/planPrice'

describe('plan prices', () => {
  it('labels the paid plans at $129 a month and the others free', () => {
    expect(priceLabel(planById('broker')!)).toBe('$129/month')
    expect(priceLabel(planById('owner')!)).toBe('$129/month')
    expect(priceLabel(planById('space-seeker')!)).toBe('Free')
    expect(priceLabel(planById('coworking')!)).toBe('Free')
  })
})
