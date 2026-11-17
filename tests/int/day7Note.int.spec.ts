import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-7.md', 'utf8')

describe('November 17 review', () => {
  it('records the review set, the save rule, and the map quote', () => {
    expect(note).toContain('Tuesday, November 17')
    expect(note).toContain('noindex')
    expect(note).toContain('moderator')
    expect(note).toContain('content manager')
    expect(note).toContain('Mapbox')
    expect(note).toContain('$0 to $50')
    expect(note).toContain('$150 to $400')
    expect(note).toContain('Google Maps')
    expect(note).toContain('local repository')
    expect(note).toContain('AWS host serves it after that build')
  })
})
