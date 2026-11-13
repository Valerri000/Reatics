import { describe, expect, it } from 'vitest'

import { filtersFromQuery } from '@/lib/mapFilters'
import { cityMapPath, shareableMapPath, typeMapPath } from '@/lib/mapShare'

describe('shared filtered map', () => {
  it('opens Glendale and Office from a shareable map URL', () => {
    expect(cityMapPath('Glendale')).toBe('/map?city=Glendale')
    expect(typeMapPath('Office')).toBe('/map?type=Office')
    const glendale = filtersFromQuery({ city: 'Glendale' })
    const office = filtersFromQuery({ type: 'Office' })
    expect(glendale.place).toBe('Glendale')
    expect(office.propertyType).toBe('Office')
    expect(shareableMapPath(glendale)).toBe('/map?city=Glendale')
    expect(shareableMapPath(office)).toBe('/map?type=Office')
    const shared = filtersFromQuery({ city: 'Glendale', type: 'Office', priceMax: '5000' })
    expect(shareableMapPath(shared)).toContain('city=Glendale')
    expect(shareableMapPath(shared)).toContain('type=Office')
    expect(filtersFromQuery({ priceMax: '5000', keywords: 'glendale' })).toMatchObject({
      priceMax: '5000',
      keywords: 'glendale',
    })
  })
})
