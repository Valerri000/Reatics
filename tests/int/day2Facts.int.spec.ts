import { describe, expect, it } from 'vitest'

import { listingFacts, transactionLabel } from '@/lib/listingPage'

describe('listing facts', () => {
  it('uses one transaction label and the facts row', () => {
    expect(transactionLabel('sale')).toBe('For Sale')
    expect(transactionLabel('lease')).toBe('For Lease')
    expect(transactionLabel('coworking')).toBe('Coworking')
    expect(
      listingFacts({
        kind: 'lease',
        squareFootage: 12500,
        propertyType: 'Office',
        county: 'Los Angeles',
      }),
    ).toEqual([
      { label: 'Square footage', value: '12,500' },
      { label: 'Property type', value: 'Office' },
      { label: 'County', value: 'Los Angeles' },
    ])
  })
})
