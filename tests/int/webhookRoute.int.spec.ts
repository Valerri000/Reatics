import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('webhook route', () => {
  it('checks the signature and refuses a live mode event', () => {
    const source = readFileSync('src/app/api/stripe/webhook/route.ts', 'utf8')
    expect(source).toContain('verifyStripeSignature')
    expect(source).toContain('acceptsTestEvent')
    expect(source).toContain('applyWebhookStatus')
    expect(source).toContain('STRIPE_WEBHOOK_SECRET')
    expect(source.toLowerCase()).not.toContain('card')
  })
})
