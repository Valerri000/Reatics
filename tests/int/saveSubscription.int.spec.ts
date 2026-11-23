import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('subscription save', () => {
  it('upserts status by the Checkout session and does not write a card', () => {
    const source = readFileSync('src/lib/saveSubscription.ts', 'utf8')
    expect(source).toContain('on conflict ("stripe_checkout_session_id")')
    expect(source).toContain('"status"')
    expect(source.toLowerCase()).not.toContain('card')
  })
})
