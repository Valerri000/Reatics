import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const office = {
  href: '/listings/office',
  slug: 'office',
  imageUrl: '/home/property-1.jpg',
  imageAlt: 'Office',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  cityLine: 'Glendale, CA 91203',
  propertyType: 'Office',
  latitude: 34.1478,
  longitude: -118.2551,
}

const desks = {
  href: '/listings/desks',
  slug: 'desks',
  imageUrl: '/home/property-2.jpg',
  imageAlt: 'Desks',
  kind: 'coworking' as const,
  price: 350,
  street: 'Desk row',
  cityLine: 'Glendale, CA 91203',
  propertyType: '1-2',
  latitude: 34.15,
  longitude: -118.26,
}

describe('map card pair', () => {
  it('highlights the card, shows the coworking phone, and keeps the listing link', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(MapSearch, { listings: [office, desks], points: [], token: '', place: '' }))
    })
    const card = container.querySelector('a[href="/listings/office"]')?.closest('article') as HTMLElement
    const key = Object.keys(card).find((name) => name.startsWith('__reactProps'))
    const props = (card as unknown as Record<string, { onMouseEnter?: () => void }>)[key || '']
    await act(async () => {
      props.onMouseEnter?.()
    })
    expect(card.className).toContain('border-brand')
    expect(container.querySelector('a[href="/listings/office"]')?.getAttribute('href')).toBe('/listings/office')
    const coworking = container.querySelector('a[href="/listings/desks"]')?.closest('article') as HTMLElement
    expect(coworking.querySelector('a[href="tel:18885189168"]')?.textContent).toBe('1-888-518-9168')
    expect(coworking.textContent).not.toContain('Contact')
    expect(container.querySelector('[aria-label="Save listing"]')).toBeTruthy()
    await act(async () => root.unmount())
    container.remove()
  })
})
