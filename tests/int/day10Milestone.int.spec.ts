import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-milestone.md', 'utf8')

describe('phase B milestone', () => {
  it('records the Friday milestone list', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Homepage, About, Services, Contact, Scholarship, and Steps to Renting')
    expect(note).toContain('drafts, a publish date, an author, and preview')
    expect(note).toContain('Glendale')
    expect(note).toContain('Office')
    expect(note).toContain('301')
    expect(note).toContain('unpublished and noindex')
  })
})
