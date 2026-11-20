import { describe, expect, it } from 'vitest'

import { homepageOpensMap } from '@/lib/phaseCMilestone'

describe('homepage search', () => {
  it('opens the map and does not call Mapbox', () => {
    const opened = homepageOpensMap({ place: 'Glendale', kind: 'lease', use: 'Office' })
    expect(opened.opensMap).toBe(true)
    expect(opened.callsMapbox).toBe(false)
    expect(opened.target.startsWith('/map?')).toBe(true)
    expect(opened.target).toContain('place=Glendale')
  })
})
