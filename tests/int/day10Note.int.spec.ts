import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-day-10.md', 'utf8')

describe('day 10 note', () => {
  it('records the freeze and the notes for the review', () => {
    expect(note).toContain('Friday, November 6, 2026')
    expect(note).toContain('not pushed')
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('docs/phase-b-milestone.md')
    expect(note).toContain('docs/phase-b-click-list.md')
    expect(note).toContain('docs/phase-b-walkthrough.md')
    expect(note).toContain('docs/phase-b-review-note.md')
    expect(note).toContain('unpublished and noindex')
  })
})
