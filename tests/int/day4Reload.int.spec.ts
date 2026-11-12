import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const stage = readFileSync('src/components/market/MapStage.tsx', 'utf8')
const search = readFileSync('src/components/market/MapSearch.tsx', 'utf8')

describe('map stays mounted', () => {
  it('updates the source data instead of creating another map', () => {
    expect(stage.split('new mapbox.Map').length - 1).toBe(1)
    expect(stage).toContain("getSource('listings')?.setData")
    expect(stage).toContain('paintArea')
    expect(stage).not.toContain('useRouter')
    expect(search).not.toContain('useRouter')
    expect(search).not.toContain('router.push')
    expect(search).toContain('filterMapListings')
  })
})
