import { describe, expect, it } from 'vitest'

import { applyCheckoutSession, statusFromStripe } from '@/lib/checkoutReturn'

describe('checkout return', () => {
  it('records a paid session once and does not charge again', () => {
    const paid = {
      id: 'cs_test123',
      status: 'complete',
      payment_status: 'paid',
      customer: 'cus_test123',
      subscription: 'sub_test123',
      client_reference_id: '8',
      metadata: { plan_id: 'broker' },
    }
    expect(statusFromStripe(paid)).toBe('active')
    const applied = applyCheckoutSession(paid, 'success')
    expect(applied.state).toBe('success')
    expect(applied.status).toBe('active')
    expect(applied.chargeAgain).toBe(false)
    expect(applied.userId).toBe(8)
    expect(applied.planId).toBe('broker')
    expect(applied).not.toHaveProperty('url')
    const canceled = applyCheckoutSession({ ...paid, status: 'open', payment_status: 'unpaid' }, 'cancel')
    expect(canceled.state).toBe('failure')
    expect(canceled.status).toBe('incomplete')
    expect(canceled.chargeAgain).toBe(false)
    expect(applyCheckoutSession({ customer: '4242424242424242' }, 'success').customerId).toBe('')
  })
})
