import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapScreen } from '@/lib/phaseCMilestone'

const search = readFileSync('src/components/market/MapSearch.tsx', 'utf8')

describe('map screen', () => {
  it('keeps the split view, zoom, satellite, clustering, and draw area', () => {
    const screen = mapScreen()
    expect(screen.index).toBe(false)
    expect(screen.cluster).toBe(true)
    expect(screen.satellite).toBe(true)
    expect(search).toContain('Hide Results')
    expect(search).toContain('Zoom in')
    expect(search).toContain('Satellite')
    expect(search).toContain('Draw area')
    expect(search).toContain('Clear area')
    expect(search).toContain('onMouseEnter')
  })
})
