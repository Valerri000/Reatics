import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('empty search', () => {
  it('shows the empty state when the place has no listings', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(MapSearch, {
          listings: [
            {
              href: '/listings/201-n-brand',
              imageUrl: '/home/property-1.jpg',
              imageAlt: '201 N Brand',
              kind: 'lease',
              price: 4500,
              street: '201 N Brand Blvd',
              city: 'Glendale',
              cityLine: 'Glendale, CA 91203',
              propertyType: 'Office',
            },
          ],
          points: [],
          token: '',
          place: 'Nowhereville',
        }),
      )
    })
    expect(container.textContent).toContain('No listings yet.')
    expect(container.querySelector('a[href="/listings/201-n-brand"]')).toBeNull()
    await act(async () => root.unmount())
    container.remove()
  })
})
