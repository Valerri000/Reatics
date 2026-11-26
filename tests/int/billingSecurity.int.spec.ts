import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('billing security note', () => {
  it('records the status stored on the account and the unsent grace notice', () => {
    const note = readFileSync('docs/security.md', 'utf8')
    expect(note).toContain('active, past due, canceled, or comped')
    expect(note).toContain('content manager cannot')
    expect(note).toContain('grace notice')
    expect(note).toContain('not sent')
    expect(note).toContain('There is no card number field.')
  })
})
