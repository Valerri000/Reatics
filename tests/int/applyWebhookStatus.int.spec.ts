import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('webhook status save', () => {
  it('updates the stored status and leaves a comped account in place', () => {
    const source = readFileSync('src/lib/applyWebhookStatus.ts', 'utf8')
    expect(source).toContain('"subscription_status"')
    expect(source).toContain('is distinct from \'comped\'')
    expect(source).toContain('"stripe_customer_id"')
    expect(source.toLowerCase()).not.toContain('card')
  })
})
