import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'
import { emptyPlace } from '@/lib/placeList'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('map empty state', () => {
  it('says there are no listings', async () => {
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
    expect(container.textContent).toContain(emptyPlace)
    await act(async () => root.unmount())
    container.remove()
  })
})
