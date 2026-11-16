import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('search handoff', () => {
  it('sends the homepage form to the map and keeps the map mounted', () => {
    const search = readFileSync('src/components/home/HeroSearch.tsx', 'utf8')
    const map = readFileSync('src/app/(frontend)/map/page.tsx', 'utf8')
    const target = readFileSync('src/lib/searchTarget.ts', 'utf8')
    expect(search).toContain('homepageSearchTarget')
    expect(search).not.toContain("'/featured'")
    expect(target).toContain('return `/map?')
    expect(target).not.toContain('/featured')
    expect(map).toContain('filtersFromQuery')
    expect(map).toContain('readQuery')
    expect(map).not.toContain('router.push')
  })
})
