import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('sitemap loader', () => {
  it('reads listings and drops the map route', () => {
    const source = readFileSync('src/lib/loadSitemap.ts', 'utf8')
    expect(source).toContain("collection: 'listings'")
    expect(source).toContain('availability: doc.availability')
    expect(source).toContain('publicSitemapPaths')
    expect(source).not.toContain("'/map'")
  })
})
