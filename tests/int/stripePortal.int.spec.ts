import { describe, expect, it } from 'vitest'

import { postPortal } from '@/lib/stripePortal'

describe('stripe portal call', () => {
  it('posts a portal session in test mode only', async () => {
    const calls: string[] = []
    const fetchImpl = (async (url: string, init?: RequestInit) => {
      calls.push(`${init?.method} ${url}`)
      return new Response(JSON.stringify({ url: 'https://billing.stripe.com/p/session/test_123' }), { status: 200 })
    }) as typeof fetch
    const opened = await postPortal('sk_test_example', 'customer=cus_test123', fetchImpl)
    expect(opened.ok).toBe(true)
    expect(opened.url).toContain('https://billing.stripe.com/')
    const refused = await postPortal('sk_live_example', 'customer=cus_test123', fetchImpl)
    expect(refused.ok).toBe(false)
    expect(calls).toEqual(['POST https://api.stripe.com/v1/billing_portal/sessions'])
  })
})
