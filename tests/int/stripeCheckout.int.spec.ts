import { describe, expect, it } from 'vitest'

import { customerId, getCheckout, postCheckout, stripeId } from '@/lib/stripeCheckout'

const secret = 'sk_test_example'

describe('stripe checkout calls', () => {
  it('posts a session and reads it back without another post', async () => {
    const calls: { url: string; method: string }[] = []
    const fetchImpl = (async (url: string, init?: RequestInit) => {
      calls.push({ url: String(url), method: init?.method || 'GET' })
      if (init?.method === 'POST') {
        return new Response(JSON.stringify({ id: 'cs_test123', url: 'https://checkout.stripe.com/c/pay/cs_test123' }), {
          status: 200,
        })
      }
      return new Response(
        JSON.stringify({
          id: 'cs_test123',
          status: 'complete',
          payment_status: 'paid',
          customer: 'cus_test123',
          subscription: 'sub_test123',
        }),
        { status: 200 },
      )
    }) as typeof fetch
    const created = await postCheckout(secret, 'mode=subscription', fetchImpl)
    expect(created.ok).toBe(true)
    expect(created.url).toContain('https://checkout.stripe.com/')
    const loaded = await getCheckout(secret, 'cs_test123', fetchImpl)
    expect(loaded.ok).toBe(true)
    expect(customerId(loaded.session || {})).toBe('cus_test123')
    expect(calls.map((call) => call.method)).toEqual(['POST', 'GET'])
    expect(stripeId('4242424242424242', 'cus')).toBe('')
    const refused = await postCheckout('sk_live_example', 'mode=subscription', fetchImpl)
    expect(refused.ok).toBe(false)
    expect(calls).toHaveLength(2)
  })
})
