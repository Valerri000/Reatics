import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { ListingView } from '@/components/listing/ListingView'
import { publicListing } from '@/lib/listingPage'
import { formatListingPrice } from '@/lib/listingPrice'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function textFor(listing: ReturnType<typeof publicListing>) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(createElement(ListingView, { listing }))
  })
  const text = container.textContent || ''
  await act(async () => root.unmount())
  container.remove()
  return text
}

const source = {
  title: '201 N Brand',
  slug: '201-n-brand',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  city: 'Glendale',
  state: 'CA',
  postalCode: '91203',
  description: 'Office space at 201 N Brand Blvd in Glendale.',
  h1: '201 N Brand',
  brokerName: 'Reatics',
  brokerCompany: 'Reatics',
  brokerPhone: '1-888-518-9168',
  brokerEmail: 'info@reatics.com',
  availabilities: [{ status: 'Available', floor: '2', suite: '200', squareFeet: 12500, use: 'Office', term: 'Lease' }],
}

const office = publicListing(source)

describe('listing page', () => {
  it('shows one transaction label, the broker block, and the coworking number', async () => {
    const broker = await textFor(office)
    expect(broker.match(/For Lease/g)).toHaveLength(1)
    expect(broker).not.toContain('For Sale')
    expect(broker).toContain('201 N Brand')
    expect(broker).toContain(formatListingPrice('lease', 4500))
    expect(broker).toContain('Office space at 201 N Brand Blvd in Glendale.')
    expect(broker).toContain('info@reatics.com')
    expect(broker).toContain('Availabilities')
    expect(broker).toContain('Suite')

    const coworking = await textFor(
      publicListing({
        ...source,
        kind: 'coworking',
        brokerName: 'Hidden Provider',
        brokerEmail: 'hidden@provider.test',
        brokerPhone: '555-0100',
      }),
    )
    expect(coworking).toContain('1-888-518-9168')
    expect(coworking).toContain('Coworking')
    expect(coworking).not.toContain('hidden@provider.test')
    expect(coworking).not.toContain('Hidden Provider')
    expect(coworking).not.toContain('555-0100')
  })

  it('keeps an unavailable listing on the same heading', async () => {
    const text = await textFor(publicListing({ ...source, availability: 'unavailable' }))
    expect(text).toContain('This listing is no longer available.')
    expect(text).toContain('201 N Brand')
    expect(text).not.toContain('Office space at 201 N Brand Blvd in Glendale.')
  })
})
