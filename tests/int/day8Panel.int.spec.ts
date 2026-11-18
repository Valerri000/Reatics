import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const search = readFileSync('src/components/market/MapSearch.tsx', 'utf8')

describe('filter panel', () => {
  it('stays over the map while the results stack', () => {
    expect(search).toContain('mapPanelClass')
    expect(search).toContain('resultStackClass')
    expect(search).not.toContain('useRouter')
    expect(search).not.toContain('router.push')
  })
})
