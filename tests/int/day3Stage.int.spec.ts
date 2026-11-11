import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapCluster, mapRobots, mapStyle, mapStyles, mapTitle, mapToken, locationCenter, nextZoom } from '@/lib/mapStage'

describe('map stage', () => {
  it('switches streets and satellite and reads the host token', () => {
    expect(mapStyle(false)).toBe(mapStyles.streets)
    expect(mapStyle(true)).toBe(mapStyles.satellite)
    expect(mapCluster.cluster).toBe(true)
    expect(mapCluster.clusterMaxZoom).toBeLessThan(12)
    expect(mapToken({})).toBe('')
    expect(mapToken({ MAPBOX_TOKEN: 'pk.test' })).toBe('pk.test')
    expect(readFileSync('.env.example', 'utf8')).toContain('MAPBOX_TOKEN=')
    expect(readFileSync('.env.example', 'utf8').split('MAPBOX_TOKEN=')[1]?.split('\n')[0]?.trim() ?? '').toBe('')
    expect(mapTitle).toBe('Map')
    expect(mapRobots).toEqual({ index: false, follow: false })
    expect(locationCenter({ coords: { latitude: 34.1, longitude: -118.2 } })).toEqual({
      latitude: 34.1,
      longitude: -118.2,
    })
    expect(nextZoom(11, 'in')).toBe(12)
    expect(nextZoom(1, 'out')).toBe(1)
  })
})
