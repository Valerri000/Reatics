import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-8.md', 'utf8')

describe('day 8 note', () => {
  it('records the November 18 listing and map corrections', () => {
    expect(note).toContain('Wednesday, November 18')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('No listings yet.')
    expect(note).toContain('results stack')
    expect(note).toContain('wide table')
    expect(note).toContain('drawn area can be cleared')
    expect(note).toContain('do not make a new geocoding call')
    expect(note).toContain('28px')
    expect(note).toContain('40px')
    expect(note).toContain('21px')
  })
})
