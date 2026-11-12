import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { filterMapListings, launchFilters, recordOnlyFields, emptyMapFilters } from '@/lib/mapFilters'

const collection = readFileSync('src/collections/Listings.ts', 'utf8')

describe('record fields', () => {
  it('keeps lot size, cap rate, year built, units, and listing ID off the filters', () => {
    expect(recordOnlyFields).toEqual(['lotSize', 'capRate', 'yearBuilt', 'units', 'listingCode'])
    for (const field of recordOnlyFields) {
      expect(launchFilters).not.toContain(field)
      expect(collection).toContain(`name: '${field}'`)
    }
    expect(collection).toContain("label: 'Listing ID'")
    const left = { href: '/listings/a', kind: 'lease', price: 10 }
    const right = { href: '/listings/b', kind: 'lease', price: 10 }
    expect(filterMapListings([left, right], emptyMapFilters())).toHaveLength(2)
  })
})
