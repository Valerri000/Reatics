import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { AuthProvider } from '@/components/auth/AuthProvider'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { emptyFeatured } from '@/lib/homeListings'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('featured empty state', () => {
  it('says there are no listings when none are set to Index', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(AuthProvider, {
          user: null,
          children: createElement(FeaturedListings, { listings: [] }),
        }),
      )
    })
    expect(container.textContent).toContain(emptyFeatured)
    expect(container.textContent).not.toContain('123 Market St')
    expect(container.querySelector('#featured a[href="/listings/indexed-office"]')).toBeNull()
    await act(async () => root.unmount())
    container.remove()
  })
})
