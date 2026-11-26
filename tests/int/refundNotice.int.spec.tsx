import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { RefundNotice } from '@/components/billing/RefundNotice'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('refund notice', () => {
  it('shows the confirmation and the error', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(RefundNotice, { state: 'recorded' }))
    })
    expect(container.textContent).toContain('Refund recorded in Stripe.')
    await act(async () => {
      root.render(createElement(RefundNotice, { state: 'error' }))
    })
    expect(container.textContent).toContain('The refund was not recorded.')
    await act(async () => root.unmount())
    container.remove()
  })
})
