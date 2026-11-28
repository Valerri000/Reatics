import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('phase D day 5 note', () => {
  it('matches the day 5 note to the favorites rules', () => {
    const note = readFileSync('docs/phase-d-day-5.md', 'utf8')
    expect(note).toContain('heart on the card')
    expect(note).toContain('sign-in window')
    expect(note).toContain('new folder appears at the top')
    expect(note).toContain('no longer a title-only page')
    expect(note).toContain('estimated before it is added')
    expect(note).toContain('$129')
    expect(note).toContain('does not start a charge')
  })
})
