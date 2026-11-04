import { describe, expect, it } from 'vitest'

import { homepageSearchTarget, searchCallsMapbox, searchOpensMap } from '@/lib/searchTarget'

describe('homepage search', () => {
  it('does not call Mapbox', () => {
    const target = homepageSearchTarget({ place: 'Glendale', kind: 'lease', use: 'Office' })
    expect(target).toBe('/featured?place=Glendale&kind=lease&use=Office')
    expect(target.startsWith('/map')).toBe(false)
    expect(searchCallsMapbox(target)).toBe(false)
    expect(searchCallsMapbox(homepageSearchTarget({ place: 'mapbox', kind: 'sale', use: 'all' }))).toBe(false)
    expect(searchOpensMap(target)).toBe(false)
    expect(searchOpensMap('/map?city=Glendale')).toBe(true)
  })
})
