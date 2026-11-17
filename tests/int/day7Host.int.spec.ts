import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('November 17 host note', () => {
  it('keeps this revision local until the host build', () => {
    const note = readFileSync('docs/phase-c-day-7.md', 'utf8')
    expect(note).toContain('local repository')
    expect(note).toContain('AWS host serves it after that build')
  })
})
