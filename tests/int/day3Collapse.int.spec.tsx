import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('map only', () => {
  it('hides the results panel', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(MapSearch, {
          listings: [],
          points: [],
          token: '',
          place: '',
        }),
      )
    })
    const hide = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Hide Results')
    expect(hide).toBeTruthy()
    await act(async () => {
      hide?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('aside')?.className).toContain('hidden')
    expect(container.textContent).toContain('Show Results')
    await act(async () => root.unmount())
    container.remove()
  })
})
