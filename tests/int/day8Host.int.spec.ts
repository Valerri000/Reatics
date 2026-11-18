import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-8.md', 'utf8')

describe('day 8 host', () => {
  it('keeps this revision local until the host build', () => {
    expect(note).toContain('local repository')
    expect(note).toContain('The AWS host serves it after that build.')
  })
})
