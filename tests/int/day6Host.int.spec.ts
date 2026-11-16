import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('November 16 host note', () => {
  it('keeps this revision local until the host build', () => {
    const note = readFileSync('docs/phase-c-day-6.md', 'utf8')
    expect(note).toContain('local repository')
    expect(note).toContain('AWS host serves it after that build')
  })
})
