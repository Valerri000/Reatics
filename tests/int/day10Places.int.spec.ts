import { describe, expect, it } from 'vitest'

import { mapScreen } from '@/lib/phaseCMilestone'

describe('shared place maps', () => {
  it('opens Glendale and Office on a filtered map', () => {
    const screen = mapScreen()
    expect(screen.glendale).toBe('/map?city=Glendale')
    expect(screen.office).toBe('/map?type=Office')
  })
})
