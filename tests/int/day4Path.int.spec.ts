import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { filtersFromQuery } from '@/lib/mapFilters'

const page = readFileSync('src/app/(frontend)/map/page.tsx', 'utf8')

describe('map filter route', () => {
  it('seeds the filters once and keeps the full result set on the page', () => {
    expect(page).toContain('filtersFromQuery')
    expect(page).toContain('marketListings(await loadPlaceListings(), {})')
    expect(page).not.toContain('marketListings(await loadPlaceListings(), query)')
    expect(filtersFromQuery({ place: 'Glendale', kind: 'sale', use: 'land' })).toMatchObject({
      place: 'Glendale',
      kind: 'sale',
      propertyType: 'Land',
    })
  })
})
