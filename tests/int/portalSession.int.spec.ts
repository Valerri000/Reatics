import { describe, expect, it } from 'vitest'

import { portalSession } from '@/lib/portalSession'

describe('portal session', () => {
  it('opens the customer portal and returns to the account', () => {
    const built = portalSession({ customerId: 'cus_test123', origin: 'https://18.118.84.127/' })
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.body).toContain('customer=cus_test123')
    expect(decodeURIComponent(built.body)).toContain('/billing/portal?result=return')
    expect(built.body).not.toMatch(/card|cvc|pan/i)
    expect(portalSession({ customerId: '4242424242424242', origin: 'https://18.118.84.127' }).ok).toBe(false)
  })
})
