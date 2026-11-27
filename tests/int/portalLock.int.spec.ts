import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('portal lock', () => {
  it('locks the return, the empty receipts, the error, and the refund confirmation', () => {
    const note = readFileSync('docs/phase-d-day-4-portal.md', 'utf8')
    const portal = readFileSync('src/components/billing/PortalReturn.tsx', 'utf8')
    const refund = readFileSync('src/components/billing/RefundNotice.tsx', 'utf8')
    expect(note).toContain('You are back from the customer portal.')
    expect(note).toContain('No receipts yet.')
    expect(note).toContain('The receipt list did not load.')
    expect(note).toContain('Refund recorded in Stripe.')
    expect(note).toContain('two columns')
    expect(note).toContain('one column')
    expect(note).toContain('Comped')
    expect(portal).toContain('portalLayout.phone')
    expect(refund).toContain('refundCopy.recorded')
  })
})
