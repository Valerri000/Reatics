import { describe, expect, it } from 'vitest'

import { planById } from '@/lib/plans'

describe('free plans', () => {
  it('leaves space seeker and coworking off checkout', () => {
    expect(planById('space-seeker')).toMatchObject({ name: 'Space seeker', cents: 0, paid: false, checkout: false })
    expect(planById('coworking')).toMatchObject({
      name: 'Coworking provider',
      cents: 0,
      paid: false,
      checkout: false,
    })
  })
})
