import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('subscriptions table', () => {
  it('stores status and Stripe ids and has no card column', () => {
    const migration = readFileSync('src/migrations/20261123_091500_subscriptions.ts', 'utf8')
    const index = readFileSync('src/migrations/index.ts', 'utf8')
    expect(migration).toContain('CREATE TABLE IF NOT EXISTS "subscriptions"')
    expect(migration).toContain('"plan_id"')
    expect(migration).toContain('"status"')
    expect(migration).toContain('"amount_cents"')
    expect(migration).toContain('"stripe_checkout_session_id"')
    expect(migration).toContain('"subscriptions_id"')
    expect(migration.toLowerCase()).not.toContain('card')
    expect(index).toContain('20261123_091500_subscriptions')
  })
})
