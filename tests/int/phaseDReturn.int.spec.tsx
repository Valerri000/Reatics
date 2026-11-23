import { createRoot, type Root } from 'react-dom/client'
import { readFileSync } from 'node:fs'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { CheckoutReturn } from '@/components/billing/CheckoutReturn'
import { readCheckoutReturn } from '@/lib/readCheckoutReturn'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('checkout return page', () => {
  it('shows success or failure and does not start checkout', async () => {
    const page = readFileSync('src/app/(frontend)/billing/return/page.tsx', 'utf8')
    expect(page).not.toContain('startPlanCheckout')
    expect(page).not.toContain('checkout/sessions')
    const calls: string[] = []
    const result = await readCheckoutReturn(
      { result: 'success', sessionId: 'cs_test123' },
      {
        secret: 'sk_test_example',
        save: async () => ({ stored: true }),
        fetchImpl: (async (url: string, init?: RequestInit) => {
          calls.push(init?.method || 'GET')
          expect(String(url)).toBe('https://api.stripe.com/v1/checkout/sessions/cs_test123')
          return new Response(
            JSON.stringify({
              id: 'cs_test123',
              status: 'complete',
              payment_status: 'paid',
              customer: 'cus_test123',
              subscription: 'sub_test123',
              client_reference_id: '8',
              metadata: { plan_id: 'broker' },
            }),
            { status: 200 },
          )
        }) as typeof fetch,
      },
    )
    expect(result).toEqual({ state: 'success', stored: true, chargeAgain: false })
    expect(calls).toEqual(['GET'])
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(CheckoutReturn, { state: 'failure' }))
    })
    expect(container.textContent).toBe('Payment was not completed. No second charge was made.')
    expect(container.querySelector('button')).toBeNull()
    await act(async () => {
      root.render(createElement(CheckoutReturn, { state: 'success' }))
    })
    expect(container.textContent).toBe('Payment recorded. No second charge was made.')
    await act(async () => root.unmount())
    container.remove()
  })
})
