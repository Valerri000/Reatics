import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-10.md', 'utf8')

describe('day 10 note', () => {
  it('records the November 20 freeze', () => {
    expect(note).toContain('Friday, November 20')
    expect(note).toContain('not pushed')
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('Mapbox quote')
    expect(note).toContain('sample listings')
    expect(note).toContain('GitHub')
    expect(note).toContain('Terms and Privacy')
    expect(note).toContain('contact email sending')
    expect(note).toContain('Phase D starts after this review is accepted')
  })
})
