import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('clear a drawn area', () => {
  it('removes the stored points', async () => {
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
          initialArea: [
            { latitude: 34.1, longitude: -118.2 },
            { latitude: 34.2, longitude: -118.1 },
            { latitude: 34.15, longitude: -118.15 },
          ],
        }),
      )
    })
    const clear = container.querySelector('[aria-label="Clear area"]') as HTMLButtonElement
    expect(clear.dataset.drawnPoints).toBe('3')
    await act(async () => {
      clear.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(clear.dataset.drawnPoints).toBe('0')
    expect(container.querySelector('[aria-label="Draw area"]')).toBeTruthy()
    await act(async () => root.unmount())
    container.remove()
  })
})
