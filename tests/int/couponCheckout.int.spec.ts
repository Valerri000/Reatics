import { describe, expect, it } from 'vitest'

import { checkoutForm } from '@/lib/checkoutForm'

describe('coupon checkout', () => {
  it('applies a Stripe coupon and does not add a second discount', () => {
    const withCoupon = checkoutForm({
      planId: 'broker',
      userId: 8,
      email: 'broker@example.com',
      origin: 'https://18.118.84.127',
      coupon: 'SAVE10',
    })
    expect(withCoupon.ok).toBe(true)
    if (!withCoupon.ok) return
    expect(decodeURIComponent(withCoupon.body)).toContain('discounts[0][coupon]=SAVE10')
    expect(withCoupon.body).not.toContain('amount_off')
    expect(withCoupon.body).not.toContain('percent_off')
    const plain = checkoutForm({
      planId: 'broker',
      userId: 8,
      email: 'broker@example.com',
      origin: 'https://18.118.84.127',
      coupon: '10%',
    })
    expect(plain.ok).toBe(true)
    if (!plain.ok) return
    expect(plain.body).not.toContain('discounts')
  })
})
