import { describe, expect, it } from 'vitest'

import { canCheckout, monthlyAmountCents, planById, plans } from '@/lib/plans'

describe('paid plans', () => {
  it('offers Broker and Owner with listings at the monthly price', () => {
    expect(monthlyAmountCents).toBe(12900)
    expect(plans.filter((plan) => plan.paid).map((plan) => plan.id)).toEqual(['broker', 'owner'])
    expect(planById('broker')).toMatchObject({ name: 'Broker', cents: 12900, interval: 'month', checkout: true })
    expect(planById('owner')).toMatchObject({
      name: 'Owner with listings',
      cents: 12900,
      interval: 'month',
      checkout: true,
    })
    expect(canCheckout('broker')).toBe(true)
    expect(canCheckout('owner')).toBe(true)
    expect(canCheckout('broker-owner')).toBe(false)
  })
})
