import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const stage = readFileSync('src/components/market/MapStage.tsx', 'utf8')

describe('pin highlight', () => {
  it('changes the pin radius on the existing map', () => {
    expect(stage.split('new mapbox.Map').length - 1).toBe(1)
    expect(stage).toContain('setPaintProperty')
    expect(stage).toContain('activePinRadius')
    expect(stage).toContain('onActive')
    expect(stage).toContain('onOpen')
  })
})
