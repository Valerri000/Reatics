import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { ListingView } from '@/components/listing/ListingView'
import { publicListing } from '@/lib/listingPage'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('listing facts on a phone', () => {
  it('stacks the facts instead of a wide table', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(ListingView, {
          listing: publicListing({
            title: '201 N Brand',
            slug: '201-n-brand',
            kind: 'lease',
            price: 4500,
            street: '201 N Brand Blvd',
            city: 'Glendale',
            state: 'CA',
            squareFootage: 12500,
            propertyType: 'Office',
            county: 'Los Angeles',
            availabilities: [{ status: 'Available', floor: '2', suite: '200', squareFeet: 12500, use: 'Office' }],
          }),
        }),
      )
    })
    const facts = container.querySelector('dl')
    expect(facts?.className).toContain('facts-stack')
    expect(facts?.className).toContain('grid-cols-1')
    expect(facts?.className).toContain('p-4')
    expect(facts?.className).not.toContain('sm:grid-cols-3')
    expect(container.querySelector('table')).toBeNull()
    const row = container.querySelector('h2')?.parentElement?.querySelector('.facts-stack')
    expect(row?.className).toContain('grid-cols-1')
    await act(async () => root.unmount())
    container.remove()
  })
})
