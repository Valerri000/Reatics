import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorites security note', () => {
  it('records who can save a listing', () => {
    const note = readFileSync('docs/security.md', 'utf8')
    expect(note).toContain('A signed-in member can save a listing into a folder.')
    expect(note).toContain('A signed-out visitor is asked to sign in.')
    expect(note).toContain('A printable favorites report is estimated and is not generated.')
  })
})
