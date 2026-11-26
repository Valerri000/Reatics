import { describe, expect, it } from 'vitest'

import { postRefund } from '@/lib/stripeRefund'

describe('stripe refund call', () => {
  it('posts a refund in test mode and keeps the refund id', async () => {
    const fetchImpl = (async () => {
      return new Response(JSON.stringify({ id: 're_test123' }), { status: 200 })
    }) as typeof fetch
    const posted = await postRefund('sk_test_example', 'charge=ch_test123&amount=12900', fetchImpl)
    expect(posted).toEqual({ ok: true, id: 're_test123' })
    const refused = await postRefund('sk_live_example', 'charge=ch_test123&amount=12900', fetchImpl)
    expect(refused.ok).toBe(false)
  })
})
