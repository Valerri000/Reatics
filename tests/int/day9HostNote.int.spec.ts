import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-9.md', 'utf8')

describe('day 9 host', () => {
  it('keeps this revision local until the host build', () => {
    expect(note).toContain('local repository')
    expect(note).toContain('The AWS host serves it after that build.')
  })
})
