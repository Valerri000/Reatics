import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-1.md', 'utf8')

describe('phase C review host', () => {
  it('names the staging home, the admin, and the test accounts', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('https://18.118.84.127/admin')
    expect(note).toContain('owner')
    expect(note).toContain('content manager')
    expect(note).toContain('moderator')
    expect(note).toContain('space seeker')
  })
})
