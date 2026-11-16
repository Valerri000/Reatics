import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-6.md', 'utf8')

describe('November 16 search handoff', () => {
  it('records the map search, the indexed row, and the sitemap', () => {
    expect(note).toContain('Monday, November 16')
    expect(note).toContain('/map')
    expect(note).toContain('/featured')
    expect(note).toContain('No listings yet.')
    expect(note).toContain('/sitemap.xml')
    expect(note).toContain('/map route')
    expect(note).toContain('301')
    expect(note).toContain('local repository')
    expect(note).toContain('AWS host')
  })
})
