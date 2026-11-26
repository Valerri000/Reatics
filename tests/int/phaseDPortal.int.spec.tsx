import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { PortalReturn } from '@/components/billing/PortalReturn'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('portal return', () => {
  it('shows the return and the empty receipt list', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(PortalReturn, { state: 'return' }))
    })
    expect(container.textContent).toContain('You are back from the customer portal.')
    expect(container.textContent).toContain('No receipts yet.')
    await act(async () => {
      root.render(createElement(PortalReturn, { state: 'error' }))
    })
    expect(container.textContent).toContain('The customer portal did not open.')
    expect(container.textContent).toContain('The receipt list did not load.')
    await act(async () => root.unmount())
    container.remove()
  })
})
