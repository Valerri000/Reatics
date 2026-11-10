import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-2.md', 'utf8')

describe('phase C day 2', () => {
  it('publishes the listing page from the listing record', () => {
    expect(note).toContain('Tuesday, November 10, 2026')
    expect(note).toContain('/listings/{slug}')
    expect(note).toContain('title')
    expect(note).toContain('H1')
    expect(note).toContain('price')
    expect(note).toContain('address')
    expect(note).toContain('description')
  })
})
