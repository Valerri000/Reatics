import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-open.md', 'utf8')

describe('open items note', () => {
  it('names the five items still open', () => {
    expect(note).toContain('Terms copy has not been supplied')
    expect(note).toContain('Privacy copy has not been supplied')
    expect(note).toContain('content manager name')
    expect(note).toContain('GitHub transfer')
    expect(note).toContain('Contact email sending is not connected')
    expect(note).toContain('unpublished and noindex')
  })
})
