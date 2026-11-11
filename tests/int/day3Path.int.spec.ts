import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-3.md', 'utf8')

describe('phase C day 3', () => {
  it('names the split map', () => {
    expect(note).toContain('Wednesday, November 11, 2026')
    expect(note).toContain('/map')
    expect(note).toContain('noindex')
    expect(note).toContain('clustered pins')
    expect(note).toContain('single pins')
    expect(note).toContain('stored coordinates')
    expect(note).toContain('not on the AWS host yet')
    expect(note).toContain('not in the repository')
  })
})
