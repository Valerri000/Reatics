import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { verifyStripeSignature } from '@/lib/stripeSignature'

const secret = 'whsec_testsecret'
const now = 1_763_000_000_000

function header(payload: string, key = secret) {
  const timestamp = Math.floor(now / 1000)
  const signature = createHmac('sha256', key).update(`${timestamp}.${payload}`).digest('hex')
  return `t=${timestamp},v1=${signature}`
}

describe('stripe signature', () => {
  it('accepts a signed test payload and rejects a changed body', () => {
    const payload = JSON.stringify({ id: 'evt_test123', type: 'customer.subscription.updated', livemode: false })
    const signed = verifyStripeSignature(payload, header(payload), secret, now)
    expect(signed.ok).toBe(true)
    expect(signed.event?.id).toBe('evt_test123')
    expect(verifyStripeSignature(payload, header(payload, 'whsec_other'), secret, now).ok).toBe(false)
    expect(verifyStripeSignature(`${payload} `, header(payload), secret, now).ok).toBe(false)
    expect(verifyStripeSignature(payload, header(payload), secret, now + 10 * 60 * 1000).ok).toBe(false)
    expect(verifyStripeSignature(payload, header(payload), 'sk_test_example', now).ok).toBe(false)
  })
})
