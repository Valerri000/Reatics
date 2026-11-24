import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('account validation note', () => {
  it('records who can mark a DRE and a coworking account', () => {
    const note = readFileSync('docs/security.md', 'utf8')
    expect(note).toContain('DRE is validated')
    expect(note).toContain('content manager cannot')
    expect(note).toContain('There is no card number field.')
  })
})
