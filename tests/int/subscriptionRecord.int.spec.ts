import { describe, expect, it } from 'vitest'

import { subscriptionColumns, subscriptionRecord } from '@/lib/subscriptionRecord'

const record = {
  userId: 4,
  planId: 'broker' as const,
  status: 'active' as const,
  amountCents: 12900,
  stripeCustomerId: 'cus_test123',
  stripeSubscriptionId: 'sub_test123',
  stripeCheckoutSessionId: 'cs_test123',
}

describe('subscription record', () => {
  it('stores status and Stripe ids and drops a card number', () => {
    expect(subscriptionColumns).not.toContain('cardNumber')
    expect(subscriptionRecord(record)).toEqual(record)
    expect(subscriptionRecord({ ...record, cardNumber: '4242424242424242' } as typeof record)).toBeNull()
    expect(subscriptionRecord({ ...record, stripeCustomerId: '4242424242424242' })).toBeNull()
    expect(subscriptionRecord({ ...record, planId: 'space-seeker' as 'broker' })).toBeNull()
  })
})
