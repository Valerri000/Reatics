import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { ReceiptList } from '@/components/billing/ReceiptList'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('receipt list', () => {
  it('shows the empty list and the error', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(ReceiptList, { state: 'empty', receipts: [] }))
    })
    expect(container.textContent).toContain('No receipts yet.')
    await act(async () => {
      root.render(createElement(ReceiptList, { state: 'error', receipts: [] }))
    })
    expect(container.textContent).toContain('The receipt list did not load.')
    await act(async () => root.unmount())
    container.remove()
  })
})
