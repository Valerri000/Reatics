import { describe, expect, it } from 'vitest'

import { mapPanelClass } from '@/lib/mapPanel'

describe('map panel', () => {
  it('stays over the map', () => {
    expect(mapPanelClass).toContain('absolute')
    expect(mapPanelClass).toContain('z-20')
    expect(mapPanelClass).toContain('sm:w-[420px]')
  })
})
