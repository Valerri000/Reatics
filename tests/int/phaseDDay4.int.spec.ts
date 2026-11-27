import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phaseDDay4Check } from '@/lib/phaseDDay4'

const note = readFileSync('docs/phase-d-day-4.md', 'utf8')

describe('phase D day 4', () => {
  it('matches the portal, coupon, refund, comped, and webhook rules', () => {
    expect(phaseDDay4Check()).toEqual({
      portal: 'Update the card, cancel, or download a receipt.',
      emptyReceipts: 'No receipts yet.',
      couponIsStripe: true,
      ownerRefund: true,
      managerRefund: false,
      moderatorRefund: false,
      compedSkipsCharge: true,
      compedLabel: 'Comped',
      compedVisible: true,
      liveRefused: true,
    })
    expect(note).toContain('customer portal')
    expect(note).toContain('Stripe coupon')
    expect(note).toContain('owner admin')
    expect(note).toContain('comped')
    expect(note).toContain('webhooks')
    expect(note).toContain('Test mode')
  })
})
