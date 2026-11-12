import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('draw area controls', () => {
  it('starts drawing and clears the area', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(MapSearch, { listings: [], points: [], token: '', place: '' }))
    })
    const draw = container.querySelector('[aria-label="Draw area"]') as HTMLButtonElement
    expect(draw).toBeTruthy()
    await act(async () => {
      draw.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('[aria-label="Stop drawing"]')).toBeTruthy()
    const clear = container.querySelector('[aria-label="Clear area"]') as HTMLButtonElement
    await act(async () => {
      clear.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('[aria-label="Draw area"]')).toBeTruthy()
    expect(container.querySelector('[aria-label="Stop drawing"]')).toBeNull()
    await act(async () => root.unmount())
    container.remove()
  })
})
