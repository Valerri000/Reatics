import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'
import { resultStackClass } from '@/lib/resultStack'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('phone results', () => {
  it('stacks the result cards', async () => {
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
              cityLine: 'Glendale, CA 91203',
              propertyType: 'Office',
            },
          ],
          points: [],
          token: '',
          place: 'Glendale',
        }),
      )
    })
    const stack = container.querySelector('.results-stack')
    expect(stack?.className).toContain('flex-col')
    for (const name of resultStackClass.split(' ')) expect(stack?.className).toContain(name)
    expect(container.querySelector('table')).toBeNull()
    await act(async () => root.unmount())
    container.remove()
  })
})
