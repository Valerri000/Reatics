import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MapSearch } from '@/components/market/MapSearch'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const office = {
  href: '/listings/office',
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
  imageUrl: '/home/property-2.jpg',
  imageAlt: 'Desks',
  kind: 'coworking' as const,
  price: 350,
  street: 'Desk row',
  cityLine: 'Glendale, CA 91203',
  propertyType: '1–2',
  latitude: 34.15,
  longitude: -118.26,
}

async function choose(container: HTMLElement, label: string, value: string) {
  const select = container.querySelector(`[aria-label="${label}"]`) as HTMLSelectElement
  const key = Object.keys(select).find((name) => name.startsWith('__reactProps'))
  const props = (select as unknown as Record<string, { onChange?: (event: { target: { value: string } }) => void }>)[
    key || ''
  ]
  await act(async () => {
    props.onChange?.({ target: { value } })
  })
}

describe('live map filters', () => {
  it('changes the type list and the results without replacing the map', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(MapSearch, { listings: [office, desks], points: [], token: '', place: '' }))
    })
    const map = container.querySelector('img.map-fallback')
    const type = container.querySelector('[aria-label="Property type"]') as HTMLSelectElement
    expect([...type.options].map((option) => option.value)).toEqual([''])
    await choose(container, 'Sale, lease, or coworking', 'sale')
    expect([...type.options].map((option) => option.textContent)).toContain('Shopping center')
    expect([...type.options].map((option) => option.textContent)).toContain('Industrial/flex')
    await choose(container, 'Sale, lease, or coworking', 'lease')
    const leaseOptions = [...type.options].map((option) => option.textContent)
    expect(leaseOptions).toContain('Flex')
    expect(leaseOptions).toContain('Industrial')
    expect(leaseOptions).not.toContain('Industrial/flex')
    await choose(container, 'Sale, lease, or coworking', 'coworking')
    const deskOptions = [...type.options].map((option) => option.textContent)
    expect(deskOptions).toContain('1–2')
    expect(deskOptions).toContain('25+')
    expect(deskOptions).not.toContain('Office')
    expect(container.querySelector('a[href="/listings/office"]')).toBeNull()
    expect(container.querySelector('a[href="/listings/desks"]')).toBeTruthy()
    expect(container.querySelector('img.map-fallback')).toBe(map)
    await act(async () => root.unmount())
    container.remove()
  })
})
