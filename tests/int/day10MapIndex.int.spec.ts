import { describe, expect, it } from 'vitest'

import { mapScreen } from '@/lib/phaseCMilestone'
import { publicPath } from '@/lib/paths'

describe('map index', () => {
  it('keeps the map noindex and the city page public', () => {
    expect(mapScreen().index).toBe(false)
    expect(mapScreen().follow).toBe(false)
    expect(publicPath('cities', 'glendale')).toBe('/glendale')
  })
})
