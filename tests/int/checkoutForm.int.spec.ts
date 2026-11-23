import { describe, expect, it } from 'vitest'

import { checkoutForm, checkoutOrigin } from '@/lib/checkoutForm'

describe('checkout form', () => {
  it('opens Stripe Checkout for a paid plan and not for an add-on', () => {
    expect(checkoutOrigin({ NEXT_PUBLIC_SERVER_URL: 'https://18.118.84.127/' })).toBe('https://18.118.84.127')
    const built = checkoutForm({
      planId: 'owner',
      userId: 8,
      email: 'owner@example.com',
      origin: 'https://18.118.84.127',
    })
    expect(built.ok).toBe(true)
    if (!built.ok) return
    const decoded = decodeURIComponent(built.body)
    expect(built.body).toContain('mode=subscription')
    expect(decoded).toContain('[unit_amount]=12900')
    expect(decoded).toContain('[recurring][interval]=month')
    expect(decoded).toContain('metadata[plan_id]=owner')
    expect(built.body).toContain('client_reference_id=8')
    expect(decoded).toContain('/billing/return?result=success&session_id={CHECKOUT_SESSION_ID}')
    expect(decoded).toContain('/billing/return?result=cancel&session_id={CHECKOUT_SESSION_ID}')
    expect(built.body).not.toMatch(/card|cvc|pan/i)
    expect(checkoutForm({ planId: 'featured-listing', userId: 8, email: 'a@b.c', origin: 'http://localhost:3000' }).ok).toBe(
      false,
    )
    expect(checkoutForm({ planId: 'coworking', userId: 8, email: 'a@b.c', origin: 'http://localhost:3000' }).ok).toBe(
      false,
    )
  })
})
