import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('portal security note', () => {
  it('records the portal, the coupon, the refund, and the webhook', () => {
    const note = readFileSync('docs/security.md', 'utf8')
    expect(note).toContain('There is no card number field.')
    expect(note).toContain('customer portal is hosted by Stripe')
    expect(note).toContain('not a second discount')
    expect(note).toContain('content manager and a moderator cannot')
    expect(note).toContain('labeled comped')
    expect(note).toContain('live mode event is refused.')
  })
})
