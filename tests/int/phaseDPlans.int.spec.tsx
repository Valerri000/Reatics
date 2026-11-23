import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { PlanChoice } from '@/components/billing/PlanChoice'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function render(props: Parameters<typeof PlanChoice>[0]) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(createElement(PlanChoice, props))
  })
  return {
    container,
    unmount: async () => {
      await act(async () => root.unmount())
      container.remove()
    },
  }
}

describe('plan choice', () => {
  it('shows prices and sign-in when signed out', async () => {
    const { container, unmount } = await render({
      user: null,
      state: 'signed-out',
      onSignIn: () => {},
      onPay: async () => ({ ok: false, message: 'Checkout did not start. No charge was made.' }),
    })
    expect(container.textContent).toContain('Sign in to choose a plan.')
    expect(container.textContent).toContain('Broker')
    expect(container.textContent).toContain('Owner with listings')
    expect(container.textContent).toContain('$129/month')
    expect(container.textContent).toContain('Space seeker')
    expect(container.textContent).toContain('Free')
    expect(container.textContent).not.toContain('Continue to checkout')
    expect(container.textContent).not.toContain('Featured listing')
    await unmount()
  })

  it('starts checkout only after a signed-in click', async () => {
    let picked = ''
    const { container, unmount } = await render({
      user: { id: 8, email: 'broker@example.com', role: 'broker' },
      state: 'signed-in',
      onSignIn: () => {},
      onPay: async (planId) => {
        picked = planId
        return { ok: false, message: 'Checkout did not start. No charge was made.' }
      },
    })
    expect(container.textContent).toContain('Choose a plan.')
    const button = [...container.querySelectorAll('button')].find((item) => item.textContent === 'Continue to checkout')
    await act(async () => {
      button?.click()
    })
    expect(picked).toBe('broker')
    expect(container.textContent).toContain('Checkout did not start. No charge was made.')
    await unmount()
  })

  it('shows the error state without a featured-listing purchase', async () => {
    const { container, unmount } = await render({
      user: { id: 8, email: 'broker@example.com', role: 'broker' },
      state: 'error',
      onSignIn: () => {},
      onPay: async () => ({ ok: false, message: 'Checkout did not start. No charge was made.' }),
    })
    expect(container.textContent).toContain('Checkout did not start. No charge was made.')
    expect(container.textContent).not.toContain('Featured listing')
    expect(container.textContent).not.toContain('Search ad')
    await unmount()
  })
})
