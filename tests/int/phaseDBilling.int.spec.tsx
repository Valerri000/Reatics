import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { BillingStates } from '@/components/billing/BillingStates'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('billing state screen', () => {
  it('shows active, past due, and canceled', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(BillingStates, { status: 'past_due' }))
    })
    expect(container.textContent).toContain('Active')
    expect(container.textContent).toContain('Past due')
    expect(container.textContent).toContain('Canceled')
    expect(container.textContent).toContain('Current')
    expect(container.querySelector('section')?.className).toContain('px-inset-phone')
    await act(async () => root.unmount())
    container.remove()
  })
})
