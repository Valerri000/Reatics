import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-9.md', 'utf8')

describe('day 9 note', () => {
  it('records the November 19 staging review', () => {
    expect(note).toContain('Thursday, November 19')
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('staging-owner@example.com')
    expect(note).toContain('staging-content@example.com')
    expect(note).toContain('staging-moderator@example.com')
    expect(note).toContain('staging-member@example.com')
    expect(note).toContain('from a card, from Glendale, and from the homepage search')
    expect(note).toContain('off the map and the sitemap')
    expect(note).toContain('still answers at its URL')
    expect(note).toContain('intentionally not built')
  })
})
