import { describe, expect, it } from 'vitest'

import { refundForm } from '@/lib/refundForm'

describe('refund form', () => {
  it('sends a Stripe charge and an amount, and rejects a long number', () => {
    const built = refundForm({ chargeId: 'ch_test123', amountCents: 12900 })
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.body).toContain('charge=ch_test123')
    expect(built.body).toContain('amount=12900')
    expect(built.body).not.toMatch(/cvc|pan/i)
    const intent = refundForm({ chargeId: 'pi_test123', amountCents: 500 })
    expect(intent.ok).toBe(true)
    if (!intent.ok) return
    expect(intent.body).toContain('payment_intent=pi_test123')
    expect(refundForm({ chargeId: '4242424242424242', amountCents: 12900 }).ok).toBe(false)
    expect(refundForm({ chargeId: 'ch_test123', amountCents: 0 }).ok).toBe(false)
  })
})
