import { describe, expect, it } from 'vitest'

import { acceptsTestEvent, webhookAccountStatus } from '@/lib/webhookStatus'

describe('webhook status', () => {
  it('maps subscription events and refuses live mode', () => {
    expect(acceptsTestEvent({ livemode: false })).toBe(true)
    expect(acceptsTestEvent({ livemode: true })).toBe(false)
    expect(
      webhookAccountStatus({
        type: 'customer.subscription.updated',
        data: { object: { status: 'past_due', customer: 'cus_test123' } },
      }),
    ).toEqual({ customerId: 'cus_test123', status: 'past_due' })
    expect(
      webhookAccountStatus({
        type: 'customer.subscription.deleted',
        data: { object: { status: 'canceled', customer: 'cus_test123' } },
      }),
    ).toEqual({ customerId: 'cus_test123', status: 'canceled' })
    expect(
      webhookAccountStatus({
        type: 'invoice.payment_failed',
        data: { object: { customer: 'cus_test123' } },
      }),
    ).toEqual({ customerId: 'cus_test123', status: 'past_due' })
    expect(
      webhookAccountStatus({
        type: 'customer.subscription.updated',
        data: { object: { status: 'active', customer: '4242424242424242' } },
      }),
    ).toBeNull()
  })
})
