import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { addons } from '@/lib/addons'
import { phaseDDay1Check } from '@/lib/phaseDDay1'
import { syncInactiveAddons } from '@/lib/syncInactiveAddons'

const note = readFileSync('docs/phase-d-day-1.md', 'utf8')

describe('phase D day 1', () => {
  it('matches the plans, the inactive products, and the return rule', async () => {
    expect(phaseDDay1Check()).toEqual({
      home: 'https://18.118.84.127',
      admin: 'https://18.118.84.127/admin',
      passwordKept: true,
      paid: ['broker:12900', 'owner:12900'],
      free: ['space-seeker', 'coworking'],
      addonsInactive: true,
      chargeOnReturn: false,
    })
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('/plans')
    expect(note).toContain('/billing/return')
    expect(note).toContain('does not store a card number')
    const calls: string[] = []
    const synced = await syncInactiveAddons('sk_test_example', (async (url: string, init?: RequestInit) => {
      calls.push(`${init?.method} ${url} ${init?.body}`)
      return new Response(JSON.stringify({ id: 'prod_test' }), { status: 200 })
    }) as typeof fetch)
    expect(synced).toEqual({ ok: true, created: addons.length })
    expect(calls.every((call) => call.startsWith('POST https://api.stripe.com/v1/products'))).toBe(true)
    expect(calls.every((call) => call.includes('active=false'))).toBe(true)
    expect(calls.some((call) => call.includes('checkout/sessions'))).toBe(false)
    const refused = await syncInactiveAddons('sk_live_example', (async () => {
      throw new Error('live')
    }) as typeof fetch)
    expect(refused).toEqual({ ok: false, created: 0 })
  })
})
