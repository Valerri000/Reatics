import { describe, expect, it } from 'vitest'

import { stripeCouponId } from '@/lib/stripeCoupon'

describe('stripe coupon', () => {
  it('keeps a Stripe coupon id and rejects a local percent', () => {
    expect(stripeCouponId('SAVE10')).toBe('SAVE10')
    expect(stripeCouponId(' spring_10 ')).toBe('spring_10')
    expect(stripeCouponId('10%')).toBe('')
    expect(stripeCouponId('')).toBe('')
    expect(stripeCouponId('half off')).toBe('')
  })
})
