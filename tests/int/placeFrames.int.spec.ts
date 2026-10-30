import { describe, expect, it } from 'vitest'

import { emptyPlace, mapLabel } from '@/lib/placeList'
import { placeEmptyStates, placeFrames, placeMapLabels, placeWidths } from '@/lib/placeFrames'

describe('place frames', () => {
  it('locks the city and the property-type page at desktop and phone', () => {
    expect(placeWidths.map((item) => item.width)).toEqual([1920, 320])
    expect(placeFrames.map((frame) => frame.id)).toEqual(['city', 'property-type'])
    expect(placeEmptyStates()).toEqual([emptyPlace, emptyPlace])
    expect(placeMapLabels()).toEqual([mapLabel, mapLabel])
  })
})
