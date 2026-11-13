import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const search = readFileSync('src/components/market/MapSearch.tsx', 'utf8')
const page = readFileSync('src/app/(frontend)/[...slug]/page.tsx', 'utf8')

describe('day 5 map route', () => {
  it('shares the filter URL without building a new map', () => {
    expect(search).toContain('shareableMapPath')
    expect(search).toContain('history.replaceState')
    expect(search).not.toContain('router.push')
    expect(page).toContain("reservedMapPath('city', city.title)")
    expect(page).toContain("reservedMapPath('property-type', type.title)")
  })
})
