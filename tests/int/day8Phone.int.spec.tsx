import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { ListingView } from '@/components/listing/ListingView'
import { publicListing } from '@/lib/listingPage'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('listing phone treatment', () => {
  it('shows the 21px coworking number and hides the provider', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(
        createElement(ListingView, {
          listing: publicListing({
            title: '1000 E Walnut',
            slug: '1000-e-walnut',
            kind: 'coworking',
            price: 450,
            street: '1000 E Walnut St',
            city: 'Pasadena',
            state: 'CA',
            brokerName: 'Hidden Provider',
            brokerPhone: '555-0100',
            brokerEmail: 'hidden@provider.test',
          }),
        }),
      )
    })
    const phone = container.querySelector('a[href="tel:18885189168"]')
    expect(phone?.textContent).toBe('1-888-518-9168')
    expect(phone?.className).toContain('text-[21px]')
    expect(phone?.className).toContain('font-bold')
    expect(container.textContent).not.toContain('Hidden Provider')
    expect(container.textContent).not.toContain('555-0100')
    expect(container.textContent).not.toContain('hidden@provider.test')
    const heading = container.querySelector('h1')
    expect(heading?.className).toContain('text-[28px]')
    expect(heading?.className).toContain('xl:text-[40px]')
    await act(async () => root.unmount())
    container.remove()
  })
})
