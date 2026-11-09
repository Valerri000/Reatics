import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-1.md', 'utf8')

describe('phase C day 1', () => {
  it('records the host, the fields, and the noindex sample', () => {
    expect(note).toContain('Monday, November 9, 2026')
    expect(note).toContain('https://18.118.84.127/admin')
    expect(note).toContain('square footage')
    expect(note).toContain('does not geocode on every pan')
    expect(note).toContain('201 N Brand stays noindex')
    expect(note).toContain('company name')
  })
})
