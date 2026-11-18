import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const stage = readFileSync('src/components/market/MapStage.tsx', 'utf8')

describe('pan and zoom', () => {
  it('reads stored pins and does not geocode', () => {
    expect(stage).toContain("created.on('moveend'")
    expect(stage).toContain("created.on('zoomend'")
    expect(stage).toContain("geocodesOnMove('pan')")
    expect(stage).toContain("geocodesOnMove('zoom')")
    expect(stage).toContain('pinsAfterMove')
    expect(stage.split('new mapbox.Map').length - 1).toBe(1)
    expect(stage).not.toContain('geocoding')
    expect(stage).not.toContain('api.mapbox.com')
  })
})
