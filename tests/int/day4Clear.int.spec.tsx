import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const glendale = {
  href: '/listings/glendale',
  imageUrl: '/home/property-1.jpg',
  imageAlt: 'Glendale',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  cityLine: 'Glendale, CA 91203',
  propertyType: 'Office',
}

const pasadena = {
  href: '/listings/pasadena',
  imageUrl: '/home/property-2.jpg',
  imageAlt: 'Pasadena',
  kind: 'sale' as const,
  price: 900000,
  street: '100 Colorado',
  cityLine: 'Pasadena, CA 91101',
  propertyType: 'Retail',
}

describe('clear all', () => {
  it('restores every listing without a new map', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(MapSearch, {
          listings: [glendale, pasadena],
          points: [],
          token: '',
          place: 'Glendale',
        }),
      )
    })
    const map = container.querySelector('img.map-fallback')
    expect(container.querySelector('a[href="/listings/glendale"]')).toBeTruthy()
    expect(container.querySelector('a[href="/listings/pasadena"]')).toBeNull()
    const clear = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Clear All')
    await act(async () => {
      clear?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(container.querySelector('a[href="/listings/glendale"]')).toBeTruthy()
    expect(container.querySelector('a[href="/listings/pasadena"]')).toBeTruthy()
    expect(container.querySelector('img.map-fallback')).toBe(map)
    await act(async () => root.unmount())
    container.remove()
  })
})
