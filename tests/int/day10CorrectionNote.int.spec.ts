import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-10-corrections.md', 'utf8')

describe('day 10 corrections', () => {
  it('records that no Vee change was added', () => {
    expect(note).toContain('Friday, November 20')
    expect(note).toContain('No change from Vee was recorded')
    expect(note).toContain('listing page and the map')
    expect(note).toContain('estimated before it is added')
    expect(note).toContain('Phase D starts after this review is accepted')
  })
})
