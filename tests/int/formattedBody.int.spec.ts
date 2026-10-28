import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { FormattedBody } from '@/components/content/FormattedBody'
import { blocksBody } from '@/lib/bodyBlocks'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('formatted body', () => {
  it('renders an H2 and a paragraph', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(FormattedBody, {
          value: blocksBody([
            { kind: 'h2', text: 'Who it is for' },
            { kind: 'paragraph', text: 'Brokers list spaces.' },
          ]),
        }),
      )
    })
    expect(container.querySelector('h1')).toBeNull()
    expect(container.querySelector('h2')?.textContent).toBe('Who it is for')
    expect(container.querySelector('p')?.textContent).toBe('Brokers list spaces.')
    act(() => root.unmount())
    container.remove()
  })
})
