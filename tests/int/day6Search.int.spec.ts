import { describe, expect, it } from 'vitest'

import { homepageSearchTarget, searchCallsMapbox, searchOpensMap } from '@/lib/searchTarget'
import { filtersFromQuery } from '@/lib/mapFilters'

describe('homepage map search', () => {
  it('keeps the place, the choice, and the type on the map', () => {
    const target = homepageSearchTarget({ place: 'Glendale', kind: 'lease', use: 'Office' })
    expect(target).toBe('/map?place=Glendale&kind=lease&use=Office')
    expect(searchOpensMap(target)).toBe(true)
    expect(searchCallsMapbox(target)).toBe(false)
    const filters = filtersFromQuery({ place: 'Glendale', kind: 'lease', use: 'Office' })
    expect(filters.place).toBe('Glendale')
    expect(filters.kind).toBe('lease')
    expect(filters.propertyType).toBe('Office')
    const desks = homepageSearchTarget({ place: 'Pasadena', kind: 'coworking', use: '1-2' })
    expect(desks.startsWith('/map?')).toBe(true)
    expect(filtersFromQuery({ place: 'Pasadena', kind: 'coworking', use: 'all' }).propertyType).toBe('')
  })
})
