import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-10-walk.md', 'utf8')

describe('day 10 walkthrough', () => {
  it('walks the listing page and the map', () => {
    expect(note).toContain('Friday, November 20')
    expect(note).toContain('Desktop')
    expect(note).toContain('Tablet')
    expect(note).toContain('Phone')
    expect(note).toContain('/map')
    expect(note).toContain('No listings yet.')
    expect(note).toContain('28px')
    expect(note).toContain('40px')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('noindex')
    expect(note).toContain('docs/phase-c-day-7-mapbox.md')
  })
})
