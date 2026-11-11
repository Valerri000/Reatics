import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const card = {
  href: '/listings/201-n-brand',
  imageUrl: '/home/property-1.jpg',
  imageAlt: '201 N Brand',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  cityLine: 'Glendale, CA 91203',
  propertyType: 'Office',
}

async function mount(listings = [card]) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(
      createElement(MapSearch, {
        listings,
        points: [{ slug: '201-n-brand', latitude: 34.1478, longitude: -118.2551 }],
        token: '',
        place: 'Glendale',
      }),
    )
  })
  return { container, root }
}

describe('map results', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('lists the listing card beside the map', async () => {
    const { container, root } = await mount()
    expect(container.textContent).toContain('201 N Brand Blvd')
    expect(container.textContent).toContain('Office')
    expect(container.querySelector('a[href="/listings/201-n-brand"]')).toBeTruthy()
    expect(container.querySelector('img.map-fallback')).toBeTruthy()
    expect(container.querySelector('[aria-label="Zoom in"]')).toBeTruthy()
    expect(container.querySelector('[aria-label="Satellite"]')).toBeTruthy()
    expect(container.querySelector('[aria-label="Zoom to my location"]')).toBeTruthy()
    await act(async () => root.unmount())
  })
})
