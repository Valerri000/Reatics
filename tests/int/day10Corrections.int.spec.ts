import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-corrections.md', 'utf8')

describe('Friday corrections', () => {
  it('keeps the correction list empty until the review', () => {
    expect(note).toContain('No corrections have been recorded from the review yet')
    expect(note).toContain('estimated before it is added')
  })
})
