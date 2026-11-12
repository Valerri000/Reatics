import { describe, expect, it } from 'vitest'

import { addAreaPoint, areaFeature, clearArea, pointInArea, type AreaPoint } from '@/lib/mapArea'
import { emptyMapFilters, filterMapListings } from '@/lib/mapFilters'

const box: AreaPoint[] = [
  { latitude: 34.1, longitude: -118.3 },
  { latitude: 34.2, longitude: -118.3 },
  { latitude: 34.2, longitude: -118.2 },
  { latitude: 34.1, longitude: -118.2 },
]

describe('drawn search area', () => {
  it('keeps stored points inside the area and clears the area', () => {
    const inside = { href: '/listings/inside', latitude: 34.1478, longitude: -118.2551 }
    const outside = { href: '/listings/outside', latitude: 37.77, longitude: -122.42 }
    expect(pointInArea(inside, box)).toBe(true)
    expect(pointInArea(outside, box)).toBe(false)
    expect(pointInArea(outside, [])).toBe(true)
    expect(filterMapListings([inside, outside], emptyMapFilters(), box)).toEqual([inside])
    expect(filterMapListings([inside, outside], emptyMapFilters(), clearArea())).toEqual([inside, outside])
    expect(addAreaPoint([], box[0])).toEqual([box[0]])
    expect(areaFeature(box).features[0]?.geometry.type).toBe('Polygon')
    expect(areaFeature([]).features).toEqual([])
  })
})
